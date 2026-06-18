@extends('layouts.master')
@section('title', 'Dashboard Animateur')

@section('breadcrumb')
    <x-breadcrumb :items="[['label' => 'Dashboard']]" />
@endsection

@section('content')
<div class="space-y-6">

    {{-- Bannière --}}
    <div class="relative bg-gradient-to-r from-blue-800 via-blue-700 to-blue-500 rounded-2xl p-6 overflow-hidden shadow-lg">
        <div class="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/4 pointer-events-none"></div>
        <div class="relative flex items-center justify-between">
            <div>
                <p class="text-blue-200 text-sm font-medium">Espace Animateur</p>
                <h1 class="text-2xl font-bold text-white mt-0.5">
                    {{ auth()->user()->name }} {{ auth()->user()->surname }}
                </h1>
                <p class="text-blue-200 text-sm mt-1">
                    {{ now()->locale('fr')->isoFormat('dddd D MMMM YYYY') }}
                </p>
            </div>
            <div class="hidden md:flex w-20 h-20 bg-white/15 rounded-2xl items-center justify-center">
                <i class="fas fa-chalkboard-teacher text-4xl text-white/70"></i>
            </div>
        </div>
    </div>

    {{-- Stats --}}
    <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <x-card-stat
            title="Mes formations"
            :value="$formationsCount"
            icon="fas fa-book-open"
            color="blue"
            :link="route('animateur.formations.index')" />
        <x-card-stat
            title="Apprenants suivis"
            :value="$studentsCount"
            icon="fas fa-users"
            color="green"
            :link="route('animateur.apprenants.index')" />
        <x-card-stat
            title="Réunions totales"
            :value="$meetingsCount"
            icon="fas fa-video"
            color="purple"
            :link="route('animateur.reunions.index')" />
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {{-- Prochaines réunions --}}
        <div class="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div class="flex items-center justify-between px-5 py-4 border-b border-gray-100">
                <h2 class="font-semibold text-gray-800 flex items-center gap-2">
                    <i class="fas fa-calendar-alt text-blue-500"></i> Prochaines réunions
                </h2>
                <a href="{{ route('animateur.reunions.index') }}"
                   class="text-xs text-blue-600 font-medium hover:text-blue-800">
                    Voir tout →
                </a>
            </div>

            @if($upcomingMeetings->isEmpty())
                <div class="flex flex-col items-center justify-center py-10 text-center">
                    <i class="fas fa-calendar-times text-3xl text-gray-200 mb-2"></i>
                    <p class="text-sm text-gray-400">Aucune réunion planifiée</p>
                    <a href="{{ route('animateur.reunions.create') }}"
                       class="mt-3 text-xs text-blue-600 font-semibold hover:text-blue-800">
                        + Créer une réunion
                    </a>
                </div>
            @else
                <div class="divide-y divide-gray-50">
                    @foreach($upcomingMeetings as $meeting)
                    <div class="px-5 py-4 flex items-center gap-4">
                        <div class="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center flex-shrink-0">
                            <i class="fas fa-video text-blue-600 text-sm"></i>
                        </div>
                        <div class="flex-1 min-w-0">
                            <p class="text-sm font-semibold text-gray-800">
                                {{ $meeting->formation?->name ?? 'Formation' }}
                            </p>
                            <p class="text-xs text-gray-500">
                                Niveau {{ $meeting->progression_level }}% —
                                {{ \Carbon\Carbon::parse($meeting->scheduled_at)->locale('fr')->isoFormat('D MMM [à] HH[h]mm') }}
                            </p>
                        </div>
                        <span class="text-xs bg-blue-100 text-blue-700 font-semibold px-2 py-0.5 rounded-full whitespace-nowrap">
                            À venir
                        </span>
                    </div>
                    @endforeach
                </div>
            @endif
        </div>

        {{-- Mes formations --}}
        <div class="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div class="flex items-center justify-between px-5 py-4 border-b border-gray-100">
                <h2 class="font-semibold text-gray-800 flex items-center gap-2">
                    <i class="fas fa-book-open text-blue-500"></i> Mes formations
                </h2>
                <a href="{{ route('animateur.formations.index') }}"
                   class="text-xs text-blue-600 font-medium hover:text-blue-800">
                    Voir tout →
                </a>
            </div>

            @if($formations->isEmpty())
                <div class="flex flex-col items-center justify-center py-10 text-center">
                    <i class="fas fa-book text-3xl text-gray-200 mb-2"></i>
                    <p class="text-sm text-gray-400">Aucune formation assignée</p>
                </div>
            @else
                <div class="divide-y divide-gray-50">
                    @foreach($formations->take(5) as $formation)
                    <a href="{{ route('animateur.formations.show', $formation->id) }}"
                       class="flex items-center gap-4 px-5 py-4 hover:bg-gray-50 transition-colors group">
                        <div class="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center flex-shrink-0 overflow-hidden">
                            @if($formation->picture)
                                <img src="{{ asset('storage/' . $formation->picture) }}" class="w-full h-full object-cover">
                            @else
                                <i class="fas fa-book-open text-blue-600 text-sm"></i>
                            @endif
                        </div>
                        <div class="flex-1 min-w-0">
                            <p class="text-sm font-semibold text-gray-800 truncate group-hover:text-blue-600">{{ $formation->name }}</p>
                            <p class="text-xs text-gray-500">{{ $formation->students_count ?? 0 }} apprenant(s)</p>
                        </div>
                        <i class="fas fa-chevron-right text-gray-300 text-xs"></i>
                    </a>
                    @endforeach
                </div>
            @endif
        </div>
    </div>

    {{-- Action rapide --}}
    <div class="flex justify-center">
        <a href="{{ route('animateur.reunions.create') }}"
           class="flex items-center gap-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold
                  px-6 py-3 rounded-xl transition-colors shadow-md">
            <i class="fas fa-plus-circle"></i> Planifier une réunion
        </a>
    </div>
</div>
@endsection
