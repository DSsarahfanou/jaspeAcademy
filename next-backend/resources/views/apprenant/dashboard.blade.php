@extends('layouts.master')
@section('title', 'Mon Dashboard')

@section('breadcrumb')
    <x-breadcrumb :items="[['label' => 'Dashboard']]" />
@endsection

@section('content')
<div class="space-y-6 animate-fade-in-up" x-data>

    {{-- Bannière bienvenue --}}
    <div class="relative bg-gradient-to-r from-blue-700 via-blue-600 to-blue-500 rounded-2xl p-6 overflow-hidden shadow-lg">
        <div class="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/4 pointer-events-none"></div>
        <div class="absolute bottom-0 left-1/2 w-48 h-48 bg-white/5 rounded-full translate-y-1/2 pointer-events-none"></div>
        <div class="relative flex items-center justify-between">
            <div>
                <p class="text-blue-100 text-sm font-medium">Bienvenue de retour,</p>
                <h1 class="text-2xl font-bold text-white mt-0.5">
                    {{ auth()->user()->name }} {{ auth()->user()->surname }}
                </h1>
                <p class="text-blue-200 text-sm mt-1">
                    {{ now()->locale('fr')->isoFormat('dddd D MMMM YYYY') }}
                </p>
            </div>
            <div class="hidden md:flex w-20 h-20 bg-white/15 rounded-2xl items-center justify-center">
                <i class="fas fa-graduation-cap text-4xl text-white/70"></i>
            </div>
        </div>
    </div>

    {{-- Stats --}}
    <div class="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <x-card-stat
            title="Formations en cours"
            :value="$stats->en_cours ?? 0"
            icon="fas fa-book"
            color="blue"
            :link="route('apprenant.formations.index')" />
        <x-card-stat
            title="Formations terminées"
            :value="$stats->terminees ?? 0"
            icon="fas fa-check-circle"
            color="green"
            :link="route('apprenant.formations.index')" />
        <x-card-stat
            title="Attestations obtenues"
            :value="$stats->attestations ?? 0"
            icon="fas fa-award"
            color="purple"
            :link="route('apprenant.certificats.index')" />
        <x-card-stat
            title="Meetings disponibles"
            :value="$meetingsDispo ?? 0"
            icon="fas fa-video"
            color="orange" />
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {{-- Formations récentes --}}
        <div class="lg:col-span-2 bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div class="flex items-center justify-between px-5 py-4 border-b border-gray-100">
                <h2 class="font-semibold text-gray-800 flex items-center gap-2">
                    <i class="fas fa-book text-blue-500"></i> Mes formations récentes
                </h2>
                <a href="{{ route('apprenant.formations.index') }}"
                   class="text-xs text-blue-600 font-medium hover:text-blue-800 transition-colors">
                    Voir tout <i class="fas fa-arrow-right text-[10px] ml-1"></i>
                </a>
            </div>

            <div class="divide-y divide-gray-50">
                @forelse($recentFormations as $fs)
                <a href="{{ route('apprenant.formations.show', $fs->formation->id) }}"
                   class="flex items-center gap-4 px-5 py-4 hover:bg-gray-50 transition-colors group">

                    {{-- Image --}}
                    <div class="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center flex-shrink-0 overflow-hidden">
                        @if($fs->formation->picture)
                            <img src="{{ asset('storage/' . $fs->formation->picture) }}" class="w-full h-full object-cover" alt="">
                        @else
                            <i class="fas fa-book-open text-blue-500"></i>
                        @endif
                    </div>

                    {{-- Info --}}
                    <div class="flex-1 min-w-0">
                        <p class="font-medium text-sm text-gray-800 truncate group-hover:text-blue-600 transition-colors">
                            {{ $fs->formation->name }}
                        </p>
                        {{-- Progress bar --}}
                        <div class="mt-1.5 flex items-center gap-2">
                            <div class="flex-1 bg-gray-100 rounded-full h-1.5 overflow-hidden">
                                <div class="h-full rounded-full transition-all duration-500
                                    {{ $fs->progression >= 100 ? 'bg-green-500' : 'bg-blue-500' }}"
                                     style="width: {{ min($fs->progression, 100) }}%">
                                </div>
                            </div>
                            <span class="text-xs font-semibold text-gray-500 whitespace-nowrap">
                                {{ $fs->progression ?? 0 }}%
                            </span>
                        </div>
                    </div>

                    {{-- Badge --}}
                    <div class="flex-shrink-0">
                        @if(($fs->progression ?? 0) >= 100)
                            <span class="text-xs bg-green-100 text-green-700 font-semibold px-2 py-1 rounded-full">Terminée</span>
                        @else
                            <span class="text-xs bg-blue-100 text-blue-700 font-semibold px-2 py-1 rounded-full">En cours</span>
                        @endif
                    </div>
                </a>
                @empty
                <div class="flex flex-col items-center justify-center py-12 text-center">
                    <div class="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center mb-3">
                        <i class="fas fa-search text-blue-300 text-xl"></i>
                    </div>
                    <p class="text-gray-500 text-sm font-medium mb-1">Aucune formation suivie</p>
                    <a href="{{ route('apprenant.catalogue.index') }}"
                       class="text-xs text-blue-600 hover:text-blue-800 font-medium mt-1">
                        Découvrir le catalogue →
                    </a>
                </div>
                @endforelse
            </div>
        </div>

        {{-- Liens rapides --}}
        <div class="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div class="px-5 py-4 border-b border-gray-100">
                <h2 class="font-semibold text-gray-800 flex items-center gap-2">
                    <i class="fas fa-bolt text-blue-500"></i> Accès rapide
                </h2>
            </div>
            <div class="p-4 space-y-2">
                @php
                    $links = [
                        ['icon' => 'fa-search', 'label' => 'Catalogue formations', 'color' => 'blue', 'route' => 'apprenant.catalogue.index'],
                        ['icon' => 'fa-award', 'label' => 'Mes certificats', 'color' => 'purple', 'route' => 'apprenant.certificats.index'],
                        ['icon' => 'fa-shopping-bag', 'label' => 'Mes commandes', 'color' => 'orange', 'route' => 'apprenant.orders.index'],
                        ['icon' => 'fa-briefcase', 'label' => 'Demande de stage', 'color' => 'green', 'route' => 'apprenant.stage.index'],
                        ['icon' => 'fa-user-circle', 'label' => 'Mon profil', 'color' => 'indigo', 'route' => 'apprenant.profil.index'],
                    ];
                    $colorMap = ['blue' => 'bg-blue-50 text-blue-600', 'purple' => 'bg-purple-50 text-purple-600', 'orange' => 'bg-orange-50 text-orange-600', 'green' => 'bg-green-50 text-green-600', 'indigo' => 'bg-indigo-50 text-indigo-600'];
                @endphp

                @foreach($links as $link)
                <a href="{{ route($link['route']) }}"
                   class="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors group">
                    <div class="w-9 h-9 rounded-lg {{ $colorMap[$link['color']] }} flex items-center justify-center flex-shrink-0">
                        <i class="fas {{ $link['icon'] }} text-sm"></i>
                    </div>
                    <span class="text-sm font-medium text-gray-700 group-hover:text-blue-600 transition-colors">
                        {{ $link['label'] }}
                    </span>
                    <i class="fas fa-chevron-right text-gray-300 text-xs ml-auto"></i>
                </a>
                @endforeach
            </div>
        </div>
    </div>
</div>
@endsection
