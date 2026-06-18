@extends('layouts.master')
@section('title', 'Modifier la réunion')

@section('breadcrumb')
    <x-breadcrumb :items="[
        ['label' => 'Réunions', 'url' => route('animateur.reunions.index')],
        ['label' => 'Modifier']
    ]" />
@endsection

@section('content')
<div class="max-w-lg mx-auto">
    <div class="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div class="px-6 py-5 border-b border-gray-100 bg-gradient-to-r from-blue-50 to-white">
            <h1 class="text-lg font-bold text-gray-800 flex items-center gap-2">
                <i class="fas fa-edit text-blue-600"></i> Modifier la réunion
            </h1>
            <p class="text-sm text-gray-500 mt-0.5">
                Formation : <span class="font-semibold text-gray-700">{{ $meeting->formation?->name ?? '—' }}</span>
            </p>
        </div>

        @if($errors->any())
            <div class="mx-6 mt-5 flex items-start gap-3 bg-red-50 border border-red-200 rounded-xl px-4 py-3 text-sm text-red-700">
                <i class="fas fa-exclamation-circle text-red-500 mt-0.5 flex-shrink-0"></i>
                <ul class="list-disc list-inside">
                    @foreach($errors->all() as $error)
                        <li>{{ $error }}</li>
                    @endforeach
                </ul>
            </div>
        @endif

        <form method="POST" action="{{ route('animateur.reunions.update', $meeting->id) }}" class="p-6 space-y-5">
            @csrf
            @method('PUT')

            {{-- Salle (lecture seule) --}}
            <div>
                <label class="block text-xs font-semibold text-gray-700 mb-1.5">Salle (non modifiable)</label>
                <div class="flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-gray-50 border border-gray-200">
                    <i class="fas fa-link text-gray-400 text-sm"></i>
                    <span class="text-sm text-gray-500 font-mono truncate">{{ $meeting->room_link }}</span>
                </div>
            </div>

            {{-- Niveau de progression --}}
            <div>
                <label class="block text-xs font-semibold text-gray-700 mb-1.5">
                    Niveau de progression requis <span class="text-red-500">*</span>
                </label>
                <div class="grid grid-cols-3 gap-3">
                    @foreach([25, 50, 75] as $level)
                    <label class="relative cursor-pointer">
                        <input type="radio" name="progression_level" value="{{ $level }}"
                               {{ (old('progression_level', $meeting->progression_level) == $level) ? 'checked' : '' }}
                               class="peer sr-only" required>
                        <div class="flex flex-col items-center py-4 rounded-xl border-2 border-gray-200
                                    peer-checked:border-blue-600 peer-checked:bg-blue-50 transition-all hover:border-blue-300">
                            <span class="text-2xl font-bold text-gray-700 peer-checked:text-blue-700">{{ $level }}%</span>
                            <span class="text-xs text-gray-400 mt-0.5">
                                @if($level === 25) Début
                                @elseif($level === 50) Milieu
                                @else Avancé
                                @endif
                            </span>
                        </div>
                    </label>
                    @endforeach
                </div>
            </div>

            {{-- Date et heure --}}
            <div>
                <label class="block text-xs font-semibold text-gray-700 mb-1.5">
                    Date et heure <span class="text-red-500">*</span>
                </label>
                <div class="relative">
                    <i class="fas fa-calendar-alt absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-sm pointer-events-none"></i>
                    <input type="datetime-local"
                           name="scheduled_at"
                           value="{{ old('scheduled_at', \Carbon\Carbon::parse($meeting->scheduled_at)->format('Y-m-d\TH:i')) }}"
                           class="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 text-sm
                                  focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition-all"
                           required>
                </div>
            </div>

            <div class="flex gap-3 pt-2">
                <a href="{{ route('animateur.reunions.index') }}"
                   class="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl border-2 border-gray-200
                          text-gray-600 text-sm font-semibold hover:border-gray-300 transition-colors">
                    Annuler
                </a>
                <button type="submit"
                        class="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl
                               bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold transition-colors shadow-sm">
                    <i class="fas fa-save"></i> Enregistrer
                </button>
            </div>
        </form>
    </div>
</div>
@endsection
