@extends('layouts.master')
@section('title', $apprenant->name . ' ' . $apprenant->surname)

@section('breadcrumb')
    <x-breadcrumb :items="[
        ['label' => 'Apprenants', 'url' => route('animateur.apprenants.index')],
        ['label' => $apprenant->name . ' ' . $apprenant->surname]
    ]" />
@endsection

@section('content')
<div class="space-y-6">

    {{-- Hero --}}
    <div class="bg-gradient-to-r from-blue-800 to-blue-500 rounded-2xl p-6 shadow-lg">
        <div class="flex items-start justify-between gap-4">
            <div class="flex items-center gap-4">
                <div class="w-16 h-16 rounded-2xl overflow-hidden bg-white/20 flex items-center justify-center flex-shrink-0">
                    @if($apprenant->picture)
                        <img src="{{ asset('storage/' . $apprenant->picture) }}"
                             class="w-full h-full object-cover" alt="Photo">
                    @else
                        <span class="text-white font-bold text-2xl">
                            {{ strtoupper(substr($apprenant->name, 0, 1)) }}
                        </span>
                    @endif
                </div>
                <div>
                    <h1 class="text-2xl font-bold text-white">{{ $apprenant->name }} {{ $apprenant->surname }}</h1>
                    <p class="text-blue-100 text-sm mt-0.5">{{ $apprenant->email }}</p>
                    <p class="text-blue-100 text-sm">{{ $progress->count() }} formation(s) suivie(s)</p>
                </div>
            </div>
            <a href="{{ route('animateur.apprenants.index') }}"
               class="flex items-center gap-1.5 bg-white/20 hover:bg-white/30 text-white text-sm font-semibold px-3 py-2 rounded-xl transition-colors flex-shrink-0">
                <i class="fas fa-arrow-left text-xs"></i> Retour
            </a>
        </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {{-- Informations --}}
        <div class="lg:col-span-1 bg-white rounded-2xl border border-gray-100 shadow-sm p-5 space-y-4">
            <h2 class="font-semibold text-gray-800 text-sm">Informations</h2>
            <div class="space-y-3 text-sm">
                <div class="flex items-start gap-3 py-2 border-b border-gray-50">
                    <i class="fas fa-envelope text-gray-400 mt-0.5 flex-shrink-0"></i>
                    <span class="text-gray-700 break-all">{{ $apprenant->email }}</span>
                </div>
                @if($apprenant->phone)
                <div class="flex items-center gap-3 py-2 border-b border-gray-50">
                    <i class="fas fa-phone text-gray-400 flex-shrink-0"></i>
                    <span class="text-gray-700">{{ $apprenant->phone }}</span>
                </div>
                @endif
                <div class="flex justify-between py-2 border-b border-gray-50">
                    <span class="text-gray-500">Inscrit le</span>
                    <span class="text-gray-600">{{ $apprenant->created_at->locale('fr')->isoFormat('D MMM YYYY') }}</span>
                </div>
                <div class="flex justify-between py-2">
                    <span class="text-gray-500">Formations</span>
                    <span class="font-semibold text-gray-800">{{ $progress->count() }}</span>
                </div>
            </div>

            {{-- Résumé progression --}}
            @php
                $totalProg = $progress->avg('progression') ?? 0;
                $completed = $progress->filter(fn($p) => $p->progression >= 100)->count();
            @endphp
            <div class="pt-2 border-t border-gray-100 space-y-3">
                <div>
                    <div class="flex justify-between text-xs text-gray-500 mb-1">
                        <span>Progression moyenne</span>
                        <span class="font-semibold">{{ round($totalProg) }}%</span>
                    </div>
                    <div class="h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div class="h-full bg-blue-500 rounded-full transition-all"
                             style="width: {{ round($totalProg) }}%"></div>
                    </div>
                </div>
                <div class="flex justify-between text-sm">
                    <span class="text-gray-500">Formations terminées</span>
                    <span class="font-semibold text-green-600">{{ $completed }}</span>
                </div>
            </div>
        </div>

        {{-- Formations & progression --}}
        <div class="lg:col-span-2 bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div class="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
                <h2 class="font-semibold text-gray-800">Progression par formation</h2>
                <span class="text-xs bg-blue-100 text-blue-700 font-bold px-2 py-0.5 rounded-full">
                    {{ $progress->count() }}
                </span>
            </div>

            @if($progress->isEmpty())
                <div class="py-16 text-center">
                    <i class="fas fa-book-open text-5xl text-gray-200 mb-4"></i>
                    <p class="text-gray-500 text-sm">Aucune formation suivie.</p>
                </div>
            @else
                <div class="divide-y divide-gray-50">
                    @foreach($progress as $fs)
                    <div class="px-5 py-4">
                        <div class="flex items-start justify-between gap-3 mb-2">
                            <div class="flex items-center gap-3 min-w-0">
                                <div class="w-9 h-9 rounded-xl bg-blue-100 flex items-center justify-center flex-shrink-0 overflow-hidden">
                                    @if($fs->formation?->picture)
                                        <img src="{{ asset('storage/' . $fs->formation->picture) }}" class="w-full h-full object-cover">
                                    @else
                                        <i class="fas fa-graduation-cap text-blue-500 text-xs"></i>
                                    @endif
                                </div>
                                <div class="min-w-0">
                                    <p class="font-semibold text-sm text-gray-800 truncate">{{ $fs->formation?->name ?? '—' }}</p>
                                    @if($fs->score !== null)
                                        <p class="text-xs text-gray-400">Score quiz : {{ $fs->score }}%</p>
                                    @endif
                                </div>
                            </div>
                            <div class="text-right flex-shrink-0">
                                @if($fs->progression >= 100)
                                    <span class="text-xs font-semibold px-2 py-0.5 rounded-full bg-green-100 text-green-700">Terminée</span>
                                @else
                                    <span class="text-xs font-semibold px-2 py-0.5 rounded-full bg-yellow-100 text-yellow-700">En cours</span>
                                @endif
                            </div>
                        </div>

                        {{-- Progress bar --}}
                        <div class="mt-2">
                            <div class="flex justify-between text-xs text-gray-400 mb-1">
                                <span>Progression</span>
                                <span>{{ $fs->progression ?? 0 }}%</span>
                            </div>
                            <div class="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                                <div class="h-full rounded-full transition-all {{ $fs->progression >= 100 ? 'bg-green-500' : 'bg-blue-500' }}"
                                     style="width: {{ min($fs->progression ?? 0, 100) }}%"></div>
                            </div>
                        </div>
                    </div>
                    @endforeach
                </div>
            @endif
        </div>
    </div>
</div>
@endsection
