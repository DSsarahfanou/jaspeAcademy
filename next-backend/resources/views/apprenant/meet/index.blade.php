@extends('layouts.master')
@section('title', 'Mes Réunions')

@section('breadcrumb')
    <x-breadcrumb :items="[['label' => 'Mes réunions']]" />
@endsection

@push('styles')
<style>[x-cloak]{display:none!important}</style>
@endpush

@section('content')
<div x-data="{ activeTab: '{{ $available->isNotEmpty() ? 'available' : 'completed' }}' }" class="space-y-6">

    {{-- ── TITRE ── --}}
    <div>
        <h1 class="text-xl font-bold text-gray-800 flex items-center gap-2">
            <i class="fas fa-video text-blue-500"></i> Mes Réunions
        </h1>
        <p class="text-sm text-gray-400 mt-0.5">
            Participez aux réunions obligatoires à 25%, 50% et 75% pour débloquer le quiz final.
        </p>
    </div>

    {{-- ═══ JALONS PAR FORMATION ═══ --}}
    @forelse($milestones as $ms)
    <div class="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">

        {{-- En-tête formation --}}
        <div class="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
            <div class="min-w-0">
                <h2 class="font-bold text-gray-800 truncate">{{ $ms['formation']->name ?? 'Formation' }}</h2>
                <p class="text-xs text-gray-400 mt-0.5">Votre progression : {{ $ms['progression'] }}%</p>
            </div>
            {{-- Mini barre de progression --}}
            <div class="hidden sm:block w-32 flex-shrink-0 ml-4">
                <div class="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                    <div class="h-full rounded-full transition-all duration-500
                        {{ $ms['progression'] >= 100 ? 'bg-green-500' : 'bg-blue-500' }}"
                         style="width: {{ min($ms['progression'], 100) }}%"></div>
                </div>
            </div>
        </div>

        {{-- 3 jalons en cards --}}
        <div class="p-5 grid grid-cols-1 sm:grid-cols-3 gap-4">
            @foreach($ms['levels'] as $lvl)
            @php
                $status  = $lvl['status'];  // locked | pending | available | completed
                $meeting = $lvl['meeting'];
                $level   = $lvl['level'];

                $palette = match($level) {
                    25  => ['bg' => 'bg-yellow-500', 'light' => 'bg-yellow-50 border-yellow-200', 'text' => 'text-yellow-700'],
                    50  => ['bg' => 'bg-orange-500',  'light' => 'bg-orange-50 border-orange-200',  'text' => 'text-orange-700'],
                    default => ['bg' => 'bg-red-500',    'light' => 'bg-red-50 border-red-200',    'text' => 'text-red-700'],
                };
            @endphp

            <div class="rounded-xl border p-4 flex flex-col gap-3
                {{ $status === 'completed' ? 'bg-green-50 border-green-200' :
                   ($status === 'available' ? 'bg-white border-blue-200 shadow-sm' :
                   ($status === 'pending'   ? 'bg-white border-gray-200' :
                                              'bg-gray-50 border-gray-100')) }}">

                {{-- Niveau + statut --}}
                <div class="flex items-center justify-between">
                    <span class="text-xs font-bold px-2.5 py-1 rounded-full text-white {{ $palette['bg'] }}">
                        {{ $level }}%
                    </span>
                    @if($status === 'completed')
                        <span class="text-xs font-bold text-green-700 bg-green-100 px-2.5 py-1 rounded-full flex items-center gap-1">
                            <i class="fas fa-check-circle"></i> Terminé
                        </span>
                    @elseif($status === 'available')
                        <span class="text-xs font-bold text-blue-700 bg-blue-100 px-2.5 py-1 rounded-full flex items-center gap-1">
                            <i class="fas fa-unlock"></i> Disponible
                        </span>
                    @elseif($status === 'pending')
                        <span class="text-xs font-semibold text-gray-500 bg-gray-100 px-2.5 py-1 rounded-full flex items-center gap-1">
                            <i class="fas fa-clock"></i> En attente
                        </span>
                    @else
                        <span class="text-xs font-semibold text-gray-400 bg-gray-100 px-2.5 py-1 rounded-full flex items-center gap-1">
                            <i class="fas fa-lock"></i> Verrouillé
                        </span>
                    @endif
                </div>

                {{-- Description --}}
                <div class="flex-1">
                    @if($status === 'completed')
                        <p class="text-xs text-green-700 font-medium"><i class="fas fa-check mr-1"></i>Réunion complétée</p>
                        <p class="text-xs text-gray-400 mt-0.5">Quiz débloqué pour ce palier</p>
                    @elseif($status === 'available' && $meeting)
                        <p class="text-xs font-semibold text-gray-700 truncate">{{ $meeting->formation?->name }}</p>
                        <p class="text-xs text-gray-500 mt-0.5 flex items-center gap-1">
                            <i class="fas fa-calendar-alt text-blue-400" style="font-size:10px"></i>
                            {{ \Carbon\Carbon::parse($meeting->scheduled_at)->locale('fr')->isoFormat('D MMM [à] HH[h]mm') }}
                        </p>
                        @if($meeting->teacher)
                        <p class="text-xs text-gray-400 mt-0.5 flex items-center gap-1">
                            <i class="fas fa-chalkboard-teacher text-purple-400" style="font-size:10px"></i>
                            {{ $meeting->teacher->name }} {{ $meeting->teacher->surname }}
                        </p>
                        @endif
                    @elseif($status === 'pending')
                        <p class="text-xs text-gray-500">Palier atteint</p>
                        <p class="text-xs text-gray-400 mt-0.5">En attente d'une réunion programmée</p>
                    @else
                        <p class="text-xs text-gray-400">Atteignez {{ $level }}% pour débloquer</p>
                        <div class="mt-1.5 h-1 bg-gray-200 rounded-full overflow-hidden">
                            <div class="h-full bg-gray-400 rounded-full"
                                 style="width: {{ min(($ms['progression'] / $level) * 100, 100) }}%"></div>
                        </div>
                    @endif
                </div>

                {{-- Action --}}
                @if($status === 'available' && $meeting)
                    <a href="{{ route('apprenant.meet.room', $meeting->room_link) }}"
                       class="flex items-center justify-center gap-1.5 py-2 rounded-lg
                              bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-colors">
                        <i class="fas fa-video text-xs"></i> Rejoindre
                    </a>
                @elseif($status === 'completed')
                    <div class="flex items-center justify-center gap-1.5 py-2 rounded-lg
                                bg-green-100 text-green-700 text-xs font-bold">
                        <i class="fas fa-check-circle text-xs"></i> Complétée
                    </div>
                @else
                    <div class="flex items-center justify-center gap-1.5 py-2 rounded-lg
                                bg-gray-100 text-gray-400 text-xs font-semibold cursor-not-allowed">
                        <i class="fas fa-{{ $status === 'locked' ? 'lock' : 'hourglass-half' }} text-xs"></i>
                        {{ $status === 'locked' ? 'Verrouillé' : 'En attente' }}
                    </div>
                @endif
            </div>
            @endforeach
        </div>
    </div>
    @empty
        <div class="bg-white rounded-2xl border border-dashed border-gray-200 p-20 text-center">
            <i class="fas fa-graduation-cap text-5xl text-gray-200 mb-4"></i>
            <p class="text-gray-500 font-medium">Vous n'êtes inscrit à aucune formation.</p>
            <a href="{{ route('apprenant.catalogue.index') }}"
               class="inline-block mt-4 px-5 py-2.5 bg-blue-600 text-white text-sm font-semibold rounded-xl hover:bg-blue-700 transition-colors">
                Découvrir le catalogue
            </a>
        </div>
    @endforelse

    {{-- ═══ LISTE MEETINGS ═══ --}}
    @if($available->isNotEmpty() || $completed->isNotEmpty())
    <div class="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">

        {{-- Onglets --}}
        <div class="flex border-b border-gray-100 px-5">
            <button @click="activeTab='available'"
                    class="px-4 py-3.5 text-sm font-semibold border-b-2 transition-colors mr-2"
                    :class="activeTab==='available'
                        ? 'border-blue-600 text-blue-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700'">
                <i class="fas fa-clock mr-1.5"></i> À rejoindre
                @if($available->isNotEmpty())
                    <span class="ml-1 bg-blue-100 text-blue-700 text-xs font-bold px-1.5 py-0.5 rounded-full">
                        {{ $available->count() }}
                    </span>
                @endif
            </button>
            <button @click="activeTab='completed'"
                    class="px-4 py-3.5 text-sm font-semibold border-b-2 transition-colors"
                    :class="activeTab==='completed'
                        ? 'border-blue-600 text-blue-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700'">
                <i class="fas fa-check-circle mr-1.5"></i> Historique
                @if($completed->isNotEmpty())
                    <span class="ml-1 bg-green-100 text-green-700 text-xs font-bold px-1.5 py-0.5 rounded-full">
                        {{ $completed->count() }}
                    </span>
                @endif
            </button>
        </div>

        {{-- Contenu : À rejoindre --}}
        <div x-show="activeTab==='available'" x-cloak class="p-5">
            @if($available->isEmpty())
                <div class="text-center py-10 text-gray-400">
                    <i class="fas fa-calendar-check text-3xl mb-3 text-gray-200"></i>
                    <p class="text-sm">Aucune réunion disponible pour le moment.</p>
                </div>
            @else
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    @foreach($available as $meeting)
                    <div class="border border-gray-100 rounded-xl p-4 hover:border-blue-200 hover:shadow-sm transition-all">
                        <div class="flex items-start justify-between gap-2 mb-3">
                            <h3 class="font-semibold text-sm text-gray-800 line-clamp-1">
                                {{ $meeting->formation?->name }}
                            </h3>
                            @php $lvlColor = match($meeting->progression_level) { 25 => 'bg-yellow-100 text-yellow-700', 50 => 'bg-orange-100 text-orange-700', default => 'bg-red-100 text-red-600' }; @endphp
                            <span class="text-xs font-bold px-2 py-0.5 rounded-full flex-shrink-0 {{ $lvlColor }}">
                                {{ $meeting->progression_level }}%
                            </span>
                        </div>
                        <div class="space-y-1 text-xs text-gray-500 mb-4">
                            <p class="flex items-center gap-1.5">
                                <i class="fas fa-calendar-alt text-blue-400 w-3.5 text-center"></i>
                                {{ \Carbon\Carbon::parse($meeting->scheduled_at)->locale('fr')->isoFormat('dddd D MMM YYYY [à] HH[h]mm') }}
                            </p>
                            @if($meeting->teacher)
                            <p class="flex items-center gap-1.5">
                                <i class="fas fa-chalkboard-teacher text-purple-400 w-3.5 text-center"></i>
                                {{ $meeting->teacher->name }} {{ $meeting->teacher->surname }}
                            </p>
                            @endif
                        </div>
                        <a href="{{ route('apprenant.meet.room', $meeting->room_link) }}"
                           class="flex items-center justify-center gap-2 py-2.5 rounded-xl
                                  bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold transition-colors">
                            <i class="fas fa-video text-xs"></i> Rejoindre la réunion
                        </a>
                    </div>
                    @endforeach
                </div>
            @endif
        </div>

        {{-- Contenu : Historique --}}
        <div x-show="activeTab==='completed'" x-cloak class="p-5">
            @if($completed->isEmpty())
                <div class="text-center py-10 text-gray-400">
                    <i class="fas fa-history text-3xl mb-3 text-gray-200"></i>
                    <p class="text-sm">Aucune réunion complétée pour le moment.</p>
                </div>
            @else
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    @foreach($completed as $meeting)
                    <div class="border border-green-100 bg-green-50/40 rounded-xl p-4">
                        <div class="flex items-start justify-between gap-2 mb-2">
                            <h3 class="font-semibold text-sm text-gray-800 line-clamp-1">
                                {{ $meeting->formation?->name }}
                            </h3>
                            <span class="text-xs font-bold px-2 py-0.5 rounded-full bg-green-100 text-green-700 flex-shrink-0 flex items-center gap-1">
                                <i class="fas fa-check-circle" style="font-size:10px"></i> Terminé
                            </span>
                        </div>
                        <div class="space-y-1 text-xs text-gray-500">
                            <p class="flex items-center gap-1.5">
                                <i class="fas fa-calendar-check text-green-400 w-3.5 text-center"></i>
                                {{ \Carbon\Carbon::parse($meeting->scheduled_at)->locale('fr')->isoFormat('D MMM YYYY [à] HH[h]mm') }}
                            </p>
                            @if($meeting->teacher)
                            <p class="flex items-center gap-1.5">
                                <i class="fas fa-chalkboard-teacher text-purple-400 w-3.5 text-center"></i>
                                {{ $meeting->teacher->name }} {{ $meeting->teacher->surname }}
                            </p>
                            @endif
                        </div>
                    </div>
                    @endforeach
                </div>
            @endif
        </div>
    </div>
    @endif

</div>
@endsection
