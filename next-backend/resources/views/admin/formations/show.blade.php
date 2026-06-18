@extends('layouts.master')
@section('title', $formation->name)

@section('breadcrumb')
    <x-breadcrumb :items="[
        ['label' => 'Formations', 'url' => route('admin.formations.index')],
        ['label' => $formation->name]
    ]" />
@endsection

@section('content')
<div class="space-y-6">
    {{-- Hero --}}
    <div class="relative bg-gradient-to-r from-blue-800 to-blue-500 rounded-2xl overflow-hidden shadow-lg p-6">
        @if($formation->picture)
            <img src="{{ asset('storage/' . $formation->picture) }}"
                 class="absolute inset-0 w-full h-full object-cover opacity-20" alt="">
        @endif
        <div class="relative flex flex-col sm:flex-row sm:items-start justify-between gap-4">
            <div>
                <h1 class="text-2xl font-bold text-white mb-1">{{ $formation->name }}</h1>
                <p class="text-blue-100 text-sm">
                    Enseignant : {{ $formation->teachers?->name }} {{ $formation->teachers?->surname ?? '—' }}
                </p>
            </div>
            <div class="flex gap-2 flex-shrink-0">
                <a href="{{ route('admin.formations.edit', $formation->id) }}"
                   class="flex items-center gap-1.5 bg-white/20 hover:bg-white/30 text-white text-sm font-semibold
                          px-3 py-2 rounded-xl transition-colors">
                    <i class="fas fa-edit text-xs"></i> Modifier
                </a>
                <form method="POST" action="{{ route('admin.formations.destroy', $formation->id) }}"
                      onsubmit="return confirm('Supprimer cette formation ?')">
                    @csrf @method('DELETE')
                    <button class="flex items-center gap-1.5 bg-red-500/80 hover:bg-red-600 text-white text-sm font-semibold
                                   px-3 py-2 rounded-xl transition-colors">
                        <i class="fas fa-trash text-xs"></i>
                    </button>
                </form>
            </div>
        </div>
        <div class="relative flex flex-wrap gap-4 mt-4 text-sm text-blue-100">
            <span><i class="fas fa-users mr-1"></i>{{ $formation->students->count() }} apprenants</span>
            <span><i class="fas fa-layer-group mr-1"></i>{{ $formation->modules->count() }} modules</span>
            <span><i class="fas fa-question-circle mr-1"></i>{{ $formation->quizzes->count() }} quiz</span>
            <span><i class="fas fa-money-bill-wave mr-1"></i>{{ number_format($formation->price, 0, ',', ' ') }} FCFA</span>
        </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {{-- Modules --}}
        <div class="lg:col-span-2 bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div class="px-5 py-4 border-b border-gray-100">
                <h2 class="font-semibold text-gray-800">Programme</h2>
            </div>
            @forelse($formation->modules as $mod)
            <div class="px-5 py-4 border-b border-gray-50 last:border-b-0">
                <div class="flex items-start gap-3">
                    <div class="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center flex-shrink-0">
                        <i class="fas fa-layer-group text-blue-600 text-xs"></i>
                    </div>
                    <div>
                        <p class="font-semibold text-sm text-gray-800">{{ $mod->title }}</p>
                        <p class="text-xs text-gray-500 mt-0.5">{{ $mod->lessons->count() }} leçon(s)</p>
                    </div>
                </div>
            </div>
            @empty
            <p class="px-5 py-4 text-sm text-gray-400">Aucun module.</p>
            @endforelse
        </div>

        {{-- Sidebar --}}
        <div class="space-y-4">
            {{-- Apprenants top 5 --}}
            <div class="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                <div class="px-5 py-3.5 border-b border-gray-100 flex items-center justify-between">
                    <h3 class="font-semibold text-gray-800 text-sm">Apprenants</h3>
                    <span class="text-xs bg-blue-100 text-blue-700 font-bold px-2 py-0.5 rounded-full">
                        {{ $formation->students->count() }}
                    </span>
                </div>
                @if($formation->students->isEmpty())
                    <p class="px-5 py-4 text-xs text-gray-400">Aucun apprenant.</p>
                @else
                    <div class="divide-y divide-gray-50">
                        @foreach($formation->students->take(5) as $s)
                        <div class="flex items-center gap-3 px-5 py-3">
                            <div class="w-7 h-7 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                                <span class="text-blue-600 font-bold text-xs">{{ strtoupper(substr($s->name, 0, 1)) }}</span>
                            </div>
                            <p class="text-sm text-gray-700 truncate">{{ $s->name }} {{ $s->surname }}</p>
                        </div>
                        @endforeach
                    </div>
                @endif
            </div>

            {{-- Équipements --}}
            @if($formation->equipments->count() > 0)
            <div class="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
                <h3 class="font-semibold text-gray-800 text-sm mb-3">Équipements</h3>
                @foreach($formation->equipments as $eq)
                <div class="flex justify-between text-sm py-1.5 border-b border-gray-50 last:border-0">
                    <span class="text-gray-700">{{ $eq->name }}</span>
                    <span class="font-semibold text-blue-700">{{ number_format($eq->price, 0, ',', ' ') }}</span>
                </div>
                @endforeach
            </div>
            @endif
        </div>
    </div>
</div>
@endsection
