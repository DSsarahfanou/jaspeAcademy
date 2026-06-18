@extends('layouts.master')
@section('title', 'Catalogue des formations')

@section('breadcrumb')
    <x-breadcrumb :items="[
        ['label' => 'Dashboard', 'url' => route('apprenant.dashboard')],
        ['label' => 'Catalogue']
    ]" />
@endsection

@section('content')
<div class="space-y-5" x-data="{ search: '', filter: 'all' }">

    {{-- Header --}}
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
            <h1 class="text-xl font-bold text-gray-800">Catalogue des formations</h1>
            <p class="text-sm text-gray-500 mt-0.5">{{ $formations->count() }} formation(s) disponible(s)</p>
        </div>
    </div>

    {{-- Barre de recherche --}}
    <div class="bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
        <div class="relative">
            <i class="fas fa-search absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm pointer-events-none"></i>
            <input type="text"
                   x-model="search"
                   placeholder="Rechercher une formation par titre, description…"
                   class="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 text-sm
                          focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition-all">
        </div>
    </div>

    {{-- Grille formations --}}
    @if($formations->isEmpty())
        <div class="bg-white rounded-2xl border border-dashed border-gray-200 p-16 text-center">
            <i class="fas fa-check-circle text-4xl text-green-200 mb-3"></i>
            <p class="text-gray-500 font-medium">Vous êtes inscrit à toutes les formations disponibles !</p>
        </div>
    @else
        <div class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
            @foreach($formations as $formation)
            <div x-show="!search || '{{ strtolower($formation->name) }}'.includes(search.toLowerCase())
                         || '{{ strtolower($formation->formation_details ?? '') }}'.includes(search.toLowerCase())"
                 class="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg
                        transition-all duration-250 overflow-hidden group flex flex-col">

                {{-- Image --}}
                <div class="relative h-44 bg-gradient-to-br from-blue-500 to-blue-700 overflow-hidden flex-shrink-0">
                    @if($formation->picture)
                        <img src="{{ asset('storage/' . $formation->picture) }}"
                             class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" alt="">
                    @else
                        <div class="absolute inset-0 flex items-center justify-center">
                            <i class="fas fa-book-open text-white/30 text-5xl"></i>
                        </div>
                    @endif
                    <div class="absolute top-3 right-3">
                        <span class="bg-white text-blue-700 text-xs font-bold px-2.5 py-1 rounded-full shadow">
                            {{ $formation->price == 0 ? 'Gratuit' : number_format($formation->price, 0, ',', ' ') . ' FCFA' }}
                        </span>
                    </div>
                </div>

                {{-- Body --}}
                <div class="p-4 flex flex-col flex-1">
                    <h3 class="font-semibold text-gray-800 text-sm leading-snug mb-1.5 line-clamp-2
                               group-hover:text-blue-600 transition-colors">
                        {{ $formation->name }}
                    </h3>

                    @if($formation->formation_details)
                        <p class="text-xs text-gray-500 leading-relaxed line-clamp-2 mb-3">
                            {{ $formation->formation_details }}
                        </p>
                    @endif

                    {{-- Meta --}}
                    <div class="flex items-center gap-3 text-xs text-gray-400 mb-3">
                        <span class="flex items-center gap-1">
                            <i class="fas fa-layer-group text-blue-400"></i>
                            {{ $formation->modules->count() }} modules
                        </span>
                        @if($formation->teachers)
                            <span class="flex items-center gap-1 truncate">
                                <i class="fas fa-chalkboard-teacher text-blue-400"></i>
                                {{ $formation->teachers->name }}
                            </span>
                        @endif
                    </div>

                    <div class="mt-auto">
                        <a href="{{ route('apprenant.catalogue.show', $formation->id) }}"
                           class="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl
                                  bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold
                                  transition-colors shadow-sm">
                            Voir la formation <i class="fas fa-arrow-right text-[10px]"></i>
                        </a>
                    </div>
                </div>
            </div>
            @endforeach
        </div>

        {{-- Empty search state --}}
        <div x-show="search && document.querySelectorAll('[x-show]').length === 0" x-cloak
             class="bg-white rounded-2xl border border-dashed border-gray-200 p-12 text-center">
            <i class="fas fa-search text-3xl text-gray-200 mb-2"></i>
            <p class="text-gray-500 text-sm">Aucune formation ne correspond à votre recherche.</p>
        </div>
    @endif
</div>
@endsection
