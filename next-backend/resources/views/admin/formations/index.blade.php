@extends('layouts.master')
@section('title', 'Gestion des Formations')

@section('breadcrumb')
    <x-breadcrumb :items="[
        ['label' => 'Dashboard', 'url' => route('admin.dashboard')],
        ['label' => 'Formations']
    ]" />
@endsection

@section('content')
<div class="space-y-5" x-data="{ search: '' }">
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
            <h1 class="text-xl font-bold text-gray-800">Gestion des Formations</h1>
            <p class="text-sm text-gray-500">{{ $formations->count() }} formation(s)</p>
        </div>
        <a href="{{ route('admin.formations.create') }}"
           class="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold
                  px-4 py-2.5 rounded-xl transition-colors shadow-sm self-start">
            <i class="fas fa-plus text-xs"></i> Nouvelle formation
        </a>
    </div>

    {{-- Recherche --}}
    <div class="relative max-w-sm">
        <i class="fas fa-search absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-sm pointer-events-none"></i>
        <input x-model="search" type="text" placeholder="Rechercher…"
               class="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 text-sm
                      focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition-all">
    </div>

    @if($formations->isEmpty())
        <div class="bg-white rounded-2xl border border-dashed border-gray-200 p-16 text-center">
            <i class="fas fa-book-open text-5xl text-gray-200 mb-4"></i>
            <p class="text-gray-500 font-medium">Aucune formation créée.</p>
            <a href="{{ route('admin.formations.create') }}"
               class="inline-flex items-center gap-2 mt-4 bg-blue-600 text-white text-sm font-semibold
                      px-5 py-2.5 rounded-xl hover:bg-blue-700 transition-colors">
                Créer la première formation
            </a>
        </div>
    @else
        <div class="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div class="overflow-x-auto">
                <table class="w-full text-sm">
                    <thead>
                        <tr class="bg-gray-50 border-b border-gray-100">
                            <th class="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase">Formation</th>
                            <th class="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase hidden md:table-cell">Enseignant</th>
                            <th class="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase hidden sm:table-cell">Apprenants</th>
                            <th class="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase hidden lg:table-cell">Prix</th>
                            <th class="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase">Actions</th>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-gray-50">
                        @foreach($formations as $f)
                        <tr x-show="!search || '{{ strtolower($f->name) }}'.includes(search.toLowerCase())"
                            class="hover:bg-gray-50 transition-colors">
                            <td class="px-5 py-4">
                                <div class="flex items-center gap-3">
                                    <div class="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center flex-shrink-0 overflow-hidden">
                                        @if($f->picture)
                                            <img src="{{ asset('storage/' . $f->picture) }}" class="w-full h-full object-cover">
                                        @else
                                            <i class="fas fa-book-open text-blue-500 text-sm"></i>
                                        @endif
                                    </div>
                                    <div>
                                        <p class="font-semibold text-gray-800 text-sm">{{ $f->name }}</p>
                                        <p class="text-xs text-gray-400">{{ $f->created_at->locale('fr')->isoFormat('D MMM YYYY') }}</p>
                                    </div>
                                </div>
                            </td>
                            <td class="px-5 py-4 hidden md:table-cell text-sm text-gray-600">
                                {{ $f->teachers?->name }} {{ $f->teachers?->surname ?? '—' }}
                            </td>
                            <td class="px-5 py-4 hidden sm:table-cell">
                                <span class="text-xs bg-blue-100 text-blue-700 font-bold px-2 py-0.5 rounded-full">
                                    {{ $f->students_count }}
                                </span>
                            </td>
                            <td class="px-5 py-4 hidden lg:table-cell text-sm font-semibold text-gray-800">
                                {{ number_format($f->price, 0, ',', ' ') }} FCFA
                            </td>
                            <td class="px-5 py-4">
                                <div class="flex items-center gap-2">
                                    <a href="{{ route('admin.formations.show', $f->id) }}"
                                       class="text-xs text-blue-600 hover:text-blue-800 font-semibold px-2.5 py-1.5 rounded-lg hover:bg-blue-50 transition-colors">
                                        <i class="fas fa-eye"></i>
                                    </a>
                                    <a href="{{ route('admin.formations.edit', $f->id) }}"
                                       class="text-xs text-green-600 hover:text-green-800 font-semibold px-2.5 py-1.5 rounded-lg hover:bg-green-50 transition-colors">
                                        <i class="fas fa-edit"></i>
                                    </a>
                                    <form method="POST" action="{{ route('admin.formations.destroy', $f->id) }}"
                                          onsubmit="return confirm('Supprimer cette formation ?')">
                                        @csrf @method('DELETE')
                                        <button class="text-xs text-red-500 hover:text-red-700 px-2.5 py-1.5 rounded-lg hover:bg-red-50 transition-colors">
                                            <i class="fas fa-trash"></i>
                                        </button>
                                    </form>
                                </div>
                            </td>
                        </tr>
                        @endforeach
                    </tbody>
                </table>
            </div>
        </div>
    @endif
</div>
@endsection
