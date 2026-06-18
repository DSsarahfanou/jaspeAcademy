@extends('layouts.master')
@section('title', 'Mes Formations')

@section('breadcrumb')
    <x-breadcrumb :items="[
        ['label' => 'Dashboard', 'url' => route('apprenant.dashboard')],
        ['label' => 'Mes Formations']
    ]" />
@endsection

@section('content')
<div class="space-y-5" x-data="{ tab: 'encours' }">

    {{-- Header --}}
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
            <h1 class="text-xl font-bold text-gray-800">Mes Formations</h1>
            <p class="text-sm text-gray-500 mt-0.5">
                {{ $enCours->count() }} en cours · {{ $terminees->count() }} terminée(s)
            </p>
        </div>
        <a href="{{ route('apprenant.catalogue.index') }}"
           class="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold
                  px-4 py-2.5 rounded-xl transition-colors shadow-sm self-start">
            <i class="fas fa-plus text-xs"></i> Découvrir d'autres formations
        </a>
    </div>

    {{-- Tabs --}}
    <div class="flex gap-1 bg-gray-100 p-1 rounded-xl w-fit">
        <button @click="tab = 'encours'"
                :class="tab === 'encours' ? 'bg-white shadow text-blue-700' : 'text-gray-500 hover:text-gray-700'"
                class="px-4 py-2 rounded-lg text-sm font-semibold transition-all">
            En cours
            <span class="ml-1.5 bg-blue-100 text-blue-700 text-xs font-bold px-1.5 py-0.5 rounded-full">{{ $enCours->count() }}</span>
        </button>
        <button @click="tab = 'terminees'"
                :class="tab === 'terminees' ? 'bg-white shadow text-green-700' : 'text-gray-500 hover:text-gray-700'"
                class="px-4 py-2 rounded-lg text-sm font-semibold transition-all">
            Terminées
            <span class="ml-1.5 bg-green-100 text-green-700 text-xs font-bold px-1.5 py-0.5 rounded-full">{{ $terminees->count() }}</span>
        </button>
    </div>

    {{-- En cours --}}
    <div x-show="tab === 'encours'"
         x-transition:enter="transition ease-out duration-200"
         x-transition:enter-start="opacity-0 translate-y-2"
         x-transition:enter-end="opacity-100 translate-y-0">
        @if($enCours->isEmpty())
            <div class="bg-white rounded-2xl border border-dashed border-blue-200 p-12 text-center">
                <i class="fas fa-book text-4xl text-blue-200 mb-3"></i>
                <p class="text-gray-500 font-medium">Aucune formation en cours</p>
                <a href="{{ route('apprenant.catalogue.index') }}"
                   class="inline-flex items-center gap-2 mt-3 bg-blue-600 text-white text-sm font-semibold px-4 py-2 rounded-xl hover:bg-blue-700 transition-colors">
                    Explorer le catalogue
                </a>
            </div>
        @else
            <div class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                @foreach($enCours as $fs)
                    <a href="{{ route('apprenant.formations.show', $fs->formation->id) }}"
                       class="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden group">
                        <div class="relative h-40 bg-gradient-to-br from-blue-500 to-blue-700 overflow-hidden">
                            @if($fs->formation->picture)
                                <img src="{{ asset('storage/' . $fs->formation->picture) }}"
                                     class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" alt="">
                            @else
                                <div class="absolute inset-0 flex items-center justify-center">
                                    <i class="fas fa-book-open text-white/40 text-4xl"></i>
                                </div>
                            @endif
                            <div class="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/50 to-transparent p-3">
                                <div class="flex items-center gap-2">
                                    <div class="flex-1 bg-white/30 rounded-full h-1.5">
                                        <div class="h-full bg-white rounded-full" style="width: {{ min($fs->progression ?? 0, 100) }}%"></div>
                                    </div>
                                    <span class="text-white text-xs font-bold">{{ $fs->progression ?? 0 }}%</span>
                                </div>
                            </div>
                        </div>
                        <div class="p-4">
                            <h3 class="font-semibold text-gray-800 text-sm mb-1 line-clamp-2 group-hover:text-blue-600 transition-colors">
                                {{ $fs->formation->name }}
                            </h3>
                            @if($fs->formation->teachers)
                                <p class="text-xs text-gray-500 flex items-center gap-1.5">
                                    <i class="fas fa-chalkboard-teacher text-blue-400"></i>
                                    {{ $fs->formation->teachers->name }} {{ $fs->formation->teachers->surname }}
                                </p>
                            @endif
                            <div class="flex items-center gap-3 mt-3 text-xs text-gray-400">
                                <span><i class="fas fa-layer-group mr-1 text-blue-400"></i>{{ $fs->formation->modules->count() }} modules</span>
                                <span class="bg-blue-100 text-blue-700 font-semibold px-2 py-0.5 rounded-full">En cours</span>
                            </div>
                        </div>
                    </a>
                @endforeach
            </div>
        @endif
    </div>

    {{-- Terminées --}}
    <div x-show="tab === 'terminees'"
         x-cloak
         x-transition:enter="transition ease-out duration-200"
         x-transition:enter-start="opacity-0 translate-y-2"
         x-transition:enter-end="opacity-100 translate-y-0">
        @if($terminees->isEmpty())
            <div class="bg-white rounded-2xl border border-dashed border-green-200 p-12 text-center">
                <i class="fas fa-check-circle text-4xl text-green-200 mb-3"></i>
                <p class="text-gray-500 font-medium">Aucune formation terminée pour l'instant</p>
            </div>
        @else
            <div class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                @foreach($terminees as $fs)
                    <a href="{{ route('apprenant.formations.show', $fs->formation->id) }}"
                       class="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden group">
                        <div class="relative h-40 bg-gradient-to-br from-green-500 to-green-700 overflow-hidden">
                            @if($fs->formation->picture)
                                <img src="{{ asset('storage/' . $fs->formation->picture) }}"
                                     class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 opacity-90" alt="">
                            @else
                                <div class="absolute inset-0 flex items-center justify-center">
                                    <i class="fas fa-check-circle text-white/40 text-4xl"></i>
                                </div>
                            @endif
                            <div class="absolute top-3 right-3">
                                <span class="bg-green-500 text-white text-xs font-bold px-2.5 py-1 rounded-full flex items-center gap-1 shadow">
                                    <i class="fas fa-check text-[9px]"></i> Terminée
                                </span>
                            </div>
                        </div>
                        <div class="p-4">
                            <h3 class="font-semibold text-gray-800 text-sm mb-1 line-clamp-2 group-hover:text-green-600 transition-colors">
                                {{ $fs->formation->name }}
                            </h3>
                            <div class="flex items-center gap-3 mt-3 text-xs">
                                @if($fs->score)
                                    <span class="flex items-center gap-1 text-gray-500">
                                        <i class="fas fa-star text-yellow-400"></i> Score : {{ $fs->score }}%
                                    </span>
                                @endif
                                @if($fs->attestation)
                                    <a href="{{ asset('storage/' . $fs->attestation) }}" target="_blank"
                                       class="flex items-center gap-1 text-blue-600 font-semibold hover:text-blue-800">
                                        <i class="fas fa-download text-[10px]"></i> Attestation
                                    </a>
                                @endif
                            </div>
                        </div>
                    </a>
                @endforeach
            </div>
        @endif
    </div>
</div>
@endsection
