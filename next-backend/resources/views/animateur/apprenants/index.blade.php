@extends('layouts.master')
@section('title', 'Mes Apprenants')

@section('breadcrumb')
    <x-breadcrumb :items="[
        ['label' => 'Dashboard', 'url' => route('animateur.dashboard')],
        ['label' => 'Apprenants']
    ]" />
@endsection

@section('content')
<div class="space-y-5" x-data="{ search: '' }">
    <div>
        <h1 class="text-xl font-bold text-gray-800">Mes Apprenants</h1>
        <p class="text-sm text-gray-500">{{ $apprenants->count() }} apprenant(s) au total</p>
    </div>

    {{-- Recherche --}}
    <div class="relative max-w-sm">
        <i class="fas fa-search absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-sm pointer-events-none"></i>
        <input x-model="search" type="text" placeholder="Rechercher un apprenant…"
               class="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 text-sm
                      focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition-all">
    </div>

    @if($apprenants->isEmpty())
        <div class="bg-white rounded-2xl border border-dashed border-gray-200 p-16 text-center">
            <i class="fas fa-users text-5xl text-gray-200 mb-4"></i>
            <p class="text-gray-500 font-medium">Aucun apprenant assigné à vos formations.</p>
        </div>
    @else
        <div class="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div class="overflow-x-auto">
                <table class="w-full text-sm">
                    <thead>
                        <tr class="bg-gray-50 border-b border-gray-100">
                            <th class="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase">Apprenant</th>
                            <th class="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase hidden sm:table-cell">Formation(s)</th>
                            <th class="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase">Progression moy.</th>
                            <th class="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase">Actions</th>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-gray-50">
                        @foreach($apprenants as $apprenant)
                        <tr x-show="!search || '{{ strtolower($apprenant->name . ' ' . $apprenant->surname) }}'.includes(search.toLowerCase())"
                            class="hover:bg-gray-50 transition-colors">
                            <td class="px-5 py-4">
                                <div class="flex items-center gap-3">
                                    <div class="w-9 h-9 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 overflow-hidden">
                                        @if($apprenant->picture)
                                            <img src="{{ asset('storage/' . $apprenant->picture) }}" class="w-full h-full object-cover">
                                        @else
                                            <span class="text-blue-600 font-bold text-xs">{{ strtoupper(substr($apprenant->name, 0, 1)) }}</span>
                                        @endif
                                    </div>
                                    <div>
                                        <p class="font-semibold text-gray-800">{{ $apprenant->name }} {{ $apprenant->surname }}</p>
                                        <p class="text-xs text-gray-400">{{ $apprenant->email }}</p>
                                    </div>
                                </div>
                            </td>
                            <td class="px-5 py-4 hidden sm:table-cell">
                                <span class="text-xs text-gray-600">
                                    {{ $apprenant->studentFormations->count() }} formation(s)
                                </span>
                            </td>
                            <td class="px-5 py-4">
                                @php
                                    $avgProg = $apprenant->studentFormations->avg('progression') ?? 0;
                                @endphp
                                <div class="flex items-center gap-2">
                                    <div class="w-20 bg-gray-100 rounded-full h-1.5">
                                        <div class="h-full rounded-full {{ $avgProg >= 100 ? 'bg-green-500' : 'bg-blue-500' }}"
                                             style="width: {{ min($avgProg, 100) }}%"></div>
                                    </div>
                                    <span class="text-xs font-semibold text-gray-600">{{ round($avgProg) }}%</span>
                                </div>
                            </td>
                            <td class="px-5 py-4">
                                <a href="{{ route('animateur.apprenants.show', $apprenant->id) }}"
                                   class="text-xs text-blue-600 hover:text-blue-800 font-semibold">
                                    Voir le détail →
                                </a>
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
