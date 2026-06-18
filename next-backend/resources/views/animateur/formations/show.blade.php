@extends('layouts.master')
@section('title', $formation->name)

@section('breadcrumb')
    <x-breadcrumb :items="[
        ['label' => 'Mes formations', 'url' => route('animateur.formations.index')],
        ['label' => $formation->name]
    ]" />
@endsection

@section('content')
<div class="space-y-6">
    {{-- Hero --}}
    <div class="bg-gradient-to-r from-blue-700 to-blue-500 rounded-2xl p-6 text-white shadow-lg">
        <h1 class="text-2xl font-bold mb-2">{{ $formation->name }}</h1>
        <div class="flex flex-wrap gap-4 text-sm text-blue-100">
            <span><i class="fas fa-users mr-1"></i>{{ $formation->students->count() }} apprenant(s)</span>
            <span><i class="fas fa-layer-group mr-1"></i>{{ $formation->modules->count() }} modules</span>
            <span><i class="fas fa-video mr-1"></i>{{ $meetings->count() }} réunion(s)</span>
        </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {{-- Apprenants --}}
        <div class="lg:col-span-2 bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div class="flex items-center justify-between px-5 py-4 border-b border-gray-100">
                <h2 class="font-semibold text-gray-800">Apprenants inscrits</h2>
                <span class="text-xs bg-blue-100 text-blue-700 font-bold px-2 py-0.5 rounded-full">
                    {{ $formation->students->count() }}
                </span>
            </div>
            @if($formation->students->isEmpty())
                <div class="py-10 text-center text-gray-400 text-sm">Aucun apprenant inscrit.</div>
            @else
                <div class="divide-y divide-gray-50">
                    @foreach($formation->students as $student)
                    <a href="{{ route('animateur.apprenants.show', $student->id) }}"
                       class="flex items-center gap-4 px-5 py-3.5 hover:bg-gray-50 transition-colors group">
                        <div class="w-9 h-9 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 overflow-hidden">
                            @if($student->picture)
                                <img src="{{ asset('storage/' . $student->picture) }}" class="w-full h-full object-cover">
                            @else
                                <span class="text-blue-600 font-bold text-sm">{{ strtoupper(substr($student->name, 0, 1)) }}</span>
                            @endif
                        </div>
                        <div class="flex-1 min-w-0">
                            <p class="text-sm font-semibold text-gray-800 group-hover:text-blue-600">
                                {{ $student->name }} {{ $student->surname }}
                            </p>
                            <p class="text-xs text-gray-400">{{ $student->email }}</p>
                        </div>
                        @php
                            $fs = $student->studentFormations->where('formation_id', $formation->id)->first();
                            $prog = $fs->progression ?? 0;
                        @endphp
                        <div class="flex items-center gap-2 text-xs">
                            <div class="w-20 bg-gray-100 rounded-full h-1.5">
                                <div class="h-full rounded-full {{ $prog >= 100 ? 'bg-green-500' : 'bg-blue-500' }}"
                                     style="width: {{ min($prog, 100) }}%"></div>
                            </div>
                            <span class="text-gray-500 font-semibold">{{ $prog }}%</span>
                        </div>
                    </a>
                    @endforeach
                </div>
            @endif
        </div>

        {{-- Réunions --}}
        <div class="space-y-4">
            <div class="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                <div class="flex items-center justify-between px-5 py-4 border-b border-gray-100">
                    <h2 class="font-semibold text-gray-800">Réunions</h2>
                    <a href="{{ route('animateur.reunions.create') }}"
                       class="text-xs bg-blue-600 text-white font-semibold px-3 py-1.5 rounded-lg hover:bg-blue-700 transition-colors">
                        + Créer
                    </a>
                </div>
                @if($meetings->isEmpty())
                    <div class="py-8 text-center text-gray-400 text-sm">Aucune réunion.</div>
                @else
                    <div class="divide-y divide-gray-50">
                        @foreach($meetings as $meet)
                        <div class="px-5 py-3.5">
                            <div class="flex items-start justify-between gap-2">
                                <div>
                                    <p class="text-sm font-semibold text-gray-800">Niveau {{ $meet->progression_level }}%</p>
                                    <p class="text-xs text-gray-500">
                                        {{ \Carbon\Carbon::parse($meet->scheduled_at)->locale('fr')->isoFormat('D MMM YYYY [à] HH[h]mm') }}
                                    </p>
                                </div>
                                <span class="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full font-semibold">
                                    {{ $meet->students_count ?? 0 }} inscrits
                                </span>
                            </div>
                            <p class="text-xs text-gray-400 mt-1 font-mono truncate">{{ $meet->room_link }}</p>
                        </div>
                        @endforeach
                    </div>
                @endif
            </div>

            {{-- Info --}}
            <div class="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
                <h3 class="font-semibold text-gray-800 text-sm mb-3">Détails</h3>
                <dl class="space-y-2 text-sm">
                    <div class="flex justify-between">
                        <dt class="text-gray-500">Prix</dt>
                        <dd class="font-semibold">{{ number_format($formation->price, 0, ',', ' ') }} FCFA</dd>
                    </div>
                    <div class="flex justify-between">
                        <dt class="text-gray-500">Prérequis</dt>
                        <dd class="font-semibold text-right max-w-[120px] truncate">{{ $formation->prerequisites ?? '—' }}</dd>
                    </div>
                </dl>
            </div>
        </div>
    </div>
</div>
@endsection
