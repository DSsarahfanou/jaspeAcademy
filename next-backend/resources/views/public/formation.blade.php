@extends('layouts.public')
@section('title', $formation->name)

@section('content')

{{-- Hero --}}
<section class="relative bg-gradient-to-r from-blue-900 to-blue-600 overflow-hidden">
    @if($formation->picture)
        <img src="{{ asset('storage/' . $formation->picture) }}"
             class="absolute inset-0 w-full h-full object-cover opacity-15" alt="">
    @endif
    <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <a href="{{ route('public.formations') }}"
           class="inline-flex items-center gap-1.5 text-blue-200 hover:text-white text-sm mb-5 transition-colors">
            <i class="fas fa-arrow-left text-xs"></i> Retour au catalogue
        </a>
        <div class="flex flex-col md:flex-row md:items-start justify-between gap-6">
            <div class="flex-1">
                <h1 class="text-3xl md:text-4xl font-bold text-white mb-3">{{ $formation->name }}</h1>
                @if($formation->teachers)
                    <p class="text-blue-100 flex items-center gap-2 mb-3">
                        <i class="fas fa-chalkboard-teacher"></i>
                        {{ $formation->teachers->name }} {{ $formation->teachers->surname }}
                    </p>
                @endif
                <div class="flex flex-wrap gap-3 mt-4">
                    <span class="bg-white text-blue-700 text-sm font-bold px-4 py-1.5 rounded-full shadow">
                        {{ $formation->price == 0 ? 'Gratuit' : number_format($formation->price, 0, ',', ' ') . ' FCFA' }}
                    </span>
                    <span class="bg-white/20 text-white text-sm px-4 py-1.5 rounded-full">
                        <i class="fas fa-layer-group mr-1"></i>{{ $formation->modules->count() }} modules
                    </span>
                    @if($formation->prerequisites)
                    <span class="bg-white/20 text-white text-sm px-4 py-1.5 rounded-full">
                        <i class="fas fa-check-circle mr-1"></i>Prérequis requis
                    </span>
                    @endif
                </div>
            </div>
        </div>
    </div>
</section>

<section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">

        {{-- Contenu principal --}}
        <div class="lg:col-span-2 space-y-7">

            @if($formation->formation_details)
            <div class="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                <h2 class="font-bold text-gray-800 text-lg mb-3">À propos de la formation</h2>
                <p class="text-gray-600 leading-relaxed">{{ $formation->formation_details }}</p>
            </div>
            @endif

            @if($formation->prerequisites)
            <div class="bg-blue-50 border border-blue-100 rounded-2xl p-6">
                <h2 class="font-semibold text-blue-800 mb-2 flex items-center gap-2">
                    <i class="fas fa-info-circle"></i> Prérequis
                </h2>
                <p class="text-blue-700 text-sm">{{ $formation->prerequisites }}</p>
            </div>
            @endif

            {{-- Programme --}}
            <div class="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                <div class="px-6 py-4 border-b border-gray-100">
                    <h2 class="font-bold text-gray-800">Programme de la formation</h2>
                    <p class="text-sm text-gray-400 mt-0.5">{{ $formation->modules->count() }} modules</p>
                </div>
                @forelse($formation->modules as $i => $module)
                <div class="flex items-start gap-4 px-6 py-4 border-b border-gray-50 last:border-b-0 hover:bg-gray-50 transition-colors">
                    <div class="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span class="text-blue-600 font-bold text-xs">{{ $i + 1 }}</span>
                    </div>
                    <div class="flex-1">
                        <p class="font-semibold text-sm text-gray-800">{{ $module->title }}</p>
                        @if($module->description)
                            <p class="text-xs text-gray-500 mt-0.5">{{ $module->description }}</p>
                        @endif
                        <p class="text-xs text-gray-400 mt-1"><i class="fas fa-play-circle mr-1 text-blue-400"></i>{{ $module->lessons->count() }} leçon(s)</p>
                    </div>
                </div>
                @empty
                <p class="px-6 py-4 text-sm text-gray-400">Programme à venir.</p>
                @endforelse
            </div>

            {{-- Équipements --}}
            @if($formation->equipments->isNotEmpty())
            <div class="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                <h2 class="font-bold text-gray-800 mb-4 flex items-center gap-2">
                    <i class="fas fa-box-open text-blue-500"></i> Équipements requis
                </h2>
                <div class="space-y-2">
                    @foreach($formation->equipments as $eq)
                    <div class="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
                        <span class="text-sm text-gray-700">{{ $eq->name }}</span>
                        <span class="text-sm font-semibold text-blue-700">{{ number_format($eq->price, 0, ',', ' ') }} FCFA</span>
                    </div>
                    @endforeach
                </div>
            </div>
            @endif
        </div>

        {{-- Sidebar --}}
        <div>
            <div class="bg-white rounded-2xl border border-gray-100 shadow-lg p-6 sticky top-24">
                <div class="text-center mb-5">
                    <p class="text-4xl font-extrabold text-blue-700">
                        {{ $formation->price == 0 ? 'Gratuit' : number_format($formation->price, 0, ',', ' ') }}
                    </p>
                    @if($formation->price > 0)
                        <p class="text-gray-400 text-sm">FCFA</p>
                    @endif
                </div>

                @auth
                    <a href="{{ route('apprenant.catalogue.inscription', $formation->id) }}"
                       class="w-full flex items-center justify-center gap-2 py-4 rounded-xl
                              bg-blue-600 hover:bg-blue-700 text-white font-bold transition-colors shadow-sm mb-4">
                        <i class="fas fa-graduation-cap"></i>
                        {{ $formation->price == 0 ? "S'inscrire gratuitement" : 'S\'inscrire' }}
                    </a>
                @else
                    <a href="{{ route('web.auth.register') }}"
                       class="w-full flex items-center justify-center gap-2 py-4 rounded-xl
                              bg-blue-600 hover:bg-blue-700 text-white font-bold transition-colors shadow-sm mb-4">
                        <i class="fas fa-user-plus"></i> Créer un compte
                    </a>
                    <a href="{{ route('web.auth.login') }}"
                       class="w-full flex items-center justify-center gap-2 py-3 rounded-xl
                              border-2 border-blue-600 text-blue-600 hover:bg-blue-50 font-semibold transition-colors mb-4">
                        <i class="fas fa-sign-in-alt"></i> Se connecter
                    </a>
                @endauth

                <div class="space-y-2.5 text-sm text-gray-600 border-t border-gray-100 pt-4">
                    <div class="flex items-center gap-2.5">
                        <i class="fas fa-layer-group text-blue-400 w-4 text-center"></i>
                        {{ $formation->modules->count() }} modules
                    </div>
                    <div class="flex items-center gap-2.5">
                        <i class="fas fa-award text-yellow-500 w-4 text-center"></i>
                        Attestation à la fin
                    </div>
                    <div class="flex items-center gap-2.5">
                        <i class="fas fa-infinity text-blue-400 w-4 text-center"></i>
                        Accès illimité
                    </div>
                    <div class="flex items-center gap-2.5">
                        <i class="fas fa-video text-blue-400 w-4 text-center"></i>
                        Sessions en direct
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>

@endsection
