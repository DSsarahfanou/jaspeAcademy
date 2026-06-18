@extends('layouts.master')
@section('title', 'Réunions')

@section('breadcrumb')
    <x-breadcrumb :items="[
        ['label' => 'Dashboard', 'url' => route('animateur.dashboard')],
        ['label' => 'Réunions']
    ]" />
@endsection

@section('content')
<div class="space-y-5">
    <div class="flex items-center justify-between">
        <div>
            <h1 class="text-xl font-bold text-gray-800">Mes Réunions</h1>
            <p class="text-sm text-gray-500">{{ $meetings->count() }} réunion(s) au total</p>
        </div>
        <a href="{{ route('animateur.reunions.create') }}"
           class="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold
                  px-4 py-2.5 rounded-xl transition-colors shadow-sm">
            <i class="fas fa-plus text-xs"></i> Nouvelle réunion
        </a>
    </div>

    @if($meetings->isEmpty())
        <div class="bg-white rounded-2xl border border-dashed border-blue-200 p-16 text-center">
            <i class="fas fa-video text-5xl text-blue-200 mb-4"></i>
            <p class="text-gray-500 font-medium">Aucune réunion planifiée</p>
            <a href="{{ route('animateur.reunions.create') }}"
               class="inline-flex items-center gap-2 mt-4 bg-blue-600 text-white text-sm font-semibold
                      px-5 py-2.5 rounded-xl hover:bg-blue-700 transition-colors">
                <i class="fas fa-plus"></i> Créer votre première réunion
            </a>
        </div>
    @else
        @php
            $upcoming = $meetings->where('scheduled_at', '>=', now()->toDateTimeString());
            $past     = $meetings->where('scheduled_at', '<',  now()->toDateTimeString());
        @endphp

        @if($upcoming->count() > 0)
        <div>
            <h2 class="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">
                À venir ({{ $upcoming->count() }})
            </h2>
            <div class="space-y-3">
                @foreach($upcoming as $meeting)
                <div class="bg-white rounded-2xl border border-blue-100 shadow-sm p-5">
                    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div class="flex items-center gap-4">
                            <div class="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                                <i class="fas fa-video text-blue-600"></i>
                            </div>
                            <div>
                                <p class="font-semibold text-gray-800">{{ $meeting->formation?->name ?? 'Formation' }}</p>
                                <p class="text-sm text-gray-500">
                                    Niveau {{ $meeting->progression_level }}% —
                                    {{ \Carbon\Carbon::parse($meeting->scheduled_at)->locale('fr')->isoFormat('dddd D MMM YYYY [à] HH[h]mm') }}
                                </p>
                                <p class="text-xs text-gray-400 font-mono mt-0.5">{{ $meeting->room_link }}</p>
                            </div>
                        </div>
                        <div class="flex items-center gap-2 flex-wrap">
                            <span class="text-xs bg-blue-100 text-blue-700 font-bold px-3 py-1.5 rounded-full">
                                <i class="fas fa-users mr-1"></i>{{ $meeting->students->count() }} inscrits
                            </span>
                            <a href="{{ route('animateur.meet', $meeting->room_link) }}"
                               class="text-xs bg-green-600 hover:bg-green-700 text-white font-semibold px-3 py-1.5 rounded-full transition-colors">
                                <i class="fas fa-video mr-1"></i>Rejoindre
                            </a>
                            <a href="{{ route('animateur.reunions.edit', $meeting->id) }}"
                               class="text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold px-3 py-1.5 rounded-full transition-colors">
                                <i class="fas fa-edit mr-1"></i>Modifier
                            </a>
                        </div>
                    </div>
                </div>
                @endforeach
            </div>
        </div>
        @endif

        @if($past->count() > 0)
        <div>
            <h2 class="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">
                Passées ({{ $past->count() }})
            </h2>
            <div class="space-y-3">
                @foreach($past as $meeting)
                <div class="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 opacity-75">
                    <div class="flex items-center gap-4">
                        <div class="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center flex-shrink-0">
                            <i class="fas fa-check-circle text-green-500"></i>
                        </div>
                        <div>
                            <p class="font-semibold text-gray-700">{{ $meeting->formation?->name ?? 'Formation' }}</p>
                            <p class="text-sm text-gray-400">
                                Niveau {{ $meeting->progression_level }}% —
                                {{ \Carbon\Carbon::parse($meeting->scheduled_at)->locale('fr')->isoFormat('D MMM YYYY') }}
                            </p>
                        </div>
                        <div class="ml-auto">
                            <span class="text-xs bg-gray-100 text-gray-500 font-bold px-3 py-1.5 rounded-full">
                                {{ $meeting->students->count() }} participants
                            </span>
                        </div>
                    </div>
                </div>
                @endforeach
            </div>
        </div>
        @endif
    @endif
</div>
@endsection
