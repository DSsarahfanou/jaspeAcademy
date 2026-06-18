@extends('layouts.master')
@section('title', $formation->name)

@section('breadcrumb')
    <x-breadcrumb :items="[
        ['label' => 'Catalogue', 'url' => route('apprenant.catalogue.index')],
        ['label' => $formation->name]
    ]" />
@endsection

@section('content')
<div class="max-w-4xl mx-auto space-y-6">

    {{-- Hero --}}
    <div class="relative bg-gradient-to-r from-blue-700 to-blue-500 rounded-2xl overflow-hidden shadow-lg">
        @if($formation->picture)
            <img src="{{ asset('storage/' . $formation->picture) }}"
                 class="absolute inset-0 w-full h-full object-cover opacity-20" alt="">
        @endif
        <div class="relative p-6 md:p-8">
            <h1 class="text-2xl font-bold text-white mb-2">{{ $formation->name }}</h1>
            @if($formation->teachers)
                <p class="text-blue-100 text-sm flex items-center gap-2 mb-3">
                    <i class="fas fa-chalkboard-teacher"></i>
                    {{ $formation->teachers->name }} {{ $formation->teachers->surname }}
                </p>
            @endif
            <div class="flex flex-wrap items-center gap-3">
                <span class="bg-white text-blue-700 text-sm font-bold px-3 py-1.5 rounded-full shadow">
                    {{ $formation->price == 0 ? 'Gratuit' : number_format($formation->price, 0, ',', ' ') . ' FCFA' }}
                </span>
                <span class="bg-white/20 text-white text-sm px-3 py-1.5 rounded-full">
                    {{ $formation->modules->count() }} modules
                </span>
            </div>
        </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {{-- Description + modules --}}
        <div class="lg:col-span-2 space-y-5">
            @if($formation->formation_details)
            <div class="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
                <h2 class="font-semibold text-gray-800 mb-3">À propos de la formation</h2>
                <p class="text-sm text-gray-600 leading-relaxed">{{ $formation->formation_details }}</p>
            </div>
            @endif

            @if($formation->prerequisites)
            <div class="bg-blue-50 border border-blue-100 rounded-xl p-5">
                <h2 class="font-semibold text-blue-800 mb-2 flex items-center gap-2">
                    <i class="fas fa-info-circle"></i> Prérequis
                </h2>
                <p class="text-sm text-blue-700">{{ $formation->prerequisites }}</p>
            </div>
            @endif

            {{-- Modules --}}
            <div class="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                <div class="px-5 py-4 border-b border-gray-100">
                    <h2 class="font-semibold text-gray-800">Programme de la formation</h2>
                </div>
                @forelse($formation->modules as $module)
                <div class="px-5 py-4 border-b border-gray-50 last:border-b-0">
                    <div class="flex items-start gap-3">
                        <div class="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                            <i class="fas fa-layer-group text-blue-600 text-xs"></i>
                        </div>
                        <div class="flex-1">
                            <p class="font-semibold text-sm text-gray-800">{{ $module->title }}</p>
                            @if($module->description)
                                <p class="text-xs text-gray-500 mt-0.5">{{ $module->description }}</p>
                            @endif
                            <p class="text-xs text-gray-400 mt-1">{{ $module->lessons->count() }} leçon(s)</p>
                        </div>
                    </div>
                </div>
                @empty
                <p class="px-5 py-4 text-sm text-gray-400">Programme à venir.</p>
                @endforelse
            </div>
        </div>

        {{-- Sidebar inscription --}}
        <div class="space-y-4">
            <div class="bg-white rounded-xl border border-gray-100 shadow-sm p-5 sticky top-20">
                @if($isSubscribed)
                    <div class="flex items-center gap-2 bg-green-50 border border-green-200 rounded-xl p-3 text-sm text-green-700 mb-4">
                        <i class="fas fa-check-circle text-green-500"></i>
                        Vous êtes déjà inscrit
                    </div>
                    <a href="{{ route('apprenant.formations.show', $formation->id) }}"
                       class="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700
                              text-white text-sm font-bold py-3 rounded-xl transition-colors">
                        <i class="fas fa-book-open"></i> Reprendre la formation
                    </a>
                @else
                    <div class="text-center mb-4">
                        <p class="text-3xl font-bold text-blue-700">
                            {{ $formation->price == 0 ? 'Gratuit' : number_format($formation->price, 0, ',', ' ') . ' FCFA' }}
                        </p>
                    </div>
                    <a href="{{ route('apprenant.catalogue.inscription', $formation->id) }}"
                       class="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700
                              text-white text-sm font-bold py-3.5 rounded-xl transition-colors shadow-sm mb-3">
                        <i class="fas fa-graduation-cap"></i>
                        {{ $formation->price == 0 ? "S'inscrire gratuitement" : 'S\'inscrire & Payer' }}
                    </a>
                    <a href="{{ route('apprenant.catalogue.index') }}"
                       class="w-full flex items-center justify-center gap-2 border-2 border-gray-200 text-gray-600
                              hover:border-blue-300 text-sm font-semibold py-2.5 rounded-xl transition-colors">
                        ← Retour au catalogue
                    </a>
                @endif

                <div class="mt-4 pt-4 border-t border-gray-100 space-y-2 text-sm text-gray-600">
                    <div class="flex items-center gap-2">
                        <i class="fas fa-layer-group text-blue-400 w-4 text-center"></i>
                        {{ $formation->modules->count() }} modules
                    </div>
                    <div class="flex items-center gap-2">
                        <i class="fas fa-award text-yellow-400 w-4 text-center"></i>
                        Attestation à la fin
                    </div>
                    <div class="flex items-center gap-2">
                        <i class="fas fa-infinity text-blue-400 w-4 text-center"></i>
                        Accès illimité
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection
