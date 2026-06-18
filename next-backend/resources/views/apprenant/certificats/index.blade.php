@extends('layouts.master')
@section('title', 'Mes Certificats')

@section('breadcrumb')
    <x-breadcrumb :items="[
        ['label' => 'Dashboard', 'url' => route('apprenant.dashboard')],
        ['label' => 'Certificats']
    ]" />
@endsection

@section('content')
<div class="space-y-5">
    <div class="flex items-center justify-between">
        <div>
            <h1 class="text-xl font-bold text-gray-800">Mes Certificats & Attestations</h1>
            <p class="text-sm text-gray-500 mt-0.5">{{ $attestations->count() }} attestation(s) obtenue(s)</p>
        </div>
    </div>

    @if($attestations->isEmpty())
        <div class="bg-white rounded-2xl border border-dashed border-yellow-200 p-16 text-center">
            <div class="w-20 h-20 bg-yellow-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <i class="fas fa-award text-yellow-300 text-4xl"></i>
            </div>
            <h2 class="text-lg font-semibold text-gray-700 mb-1">Aucune attestation pour l'instant</h2>
            <p class="text-gray-400 text-sm">Terminez une formation et réussissez le quiz pour obtenir votre attestation.</p>
            <a href="{{ route('apprenant.formations.index') }}"
               class="inline-flex items-center gap-2 mt-4 bg-blue-600 text-white text-sm font-semibold
                      px-5 py-2.5 rounded-xl hover:bg-blue-700 transition-colors">
                <i class="fas fa-book"></i> Mes formations
            </a>
        </div>
    @else
        <div class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
            @foreach($attestations as $fs)
            <div class="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all overflow-hidden group">
                {{-- Banner --}}
                <div class="bg-gradient-to-r from-yellow-400 to-orange-400 h-2"></div>
                <div class="p-5">
                    <div class="flex items-start gap-3 mb-4">
                        <div class="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center flex-shrink-0">
                            <i class="fas fa-award text-yellow-500 text-xl"></i>
                        </div>
                        <div class="flex-1 min-w-0">
                            <h3 class="font-semibold text-gray-800 text-sm leading-snug line-clamp-2">
                                {{ $fs->formation->name }}
                            </h3>
                            <p class="text-xs text-gray-400 mt-1">Formation terminée</p>
                        </div>
                    </div>

                    {{-- Score --}}
                    @if($fs->score)
                    <div class="flex items-center gap-2 bg-blue-50 rounded-xl px-3 py-2 mb-4">
                        <i class="fas fa-star text-yellow-400"></i>
                        <span class="text-sm font-semibold text-blue-700">Score : {{ $fs->score }}%</span>
                        @if($fs->score >= 70)
                            <span class="ml-auto text-xs bg-green-100 text-green-700 font-semibold px-2 py-0.5 rounded-full">Admis</span>
                        @else
                            <span class="ml-auto text-xs bg-red-100 text-red-600 font-semibold px-2 py-0.5 rounded-full">Non admis</span>
                        @endif
                    </div>
                    @endif

                    {{-- Actions --}}
                    <div class="flex gap-2">
                        <a href="{{ asset('storage/' . $fs->attestation) }}" target="_blank"
                           class="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl
                                  bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-colors shadow-sm">
                            <i class="fas fa-eye"></i> Voir
                        </a>
                        <a href="{{ asset('storage/' . $fs->attestation) }}" download
                           class="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl
                                  border-2 border-blue-600 text-blue-600 hover:bg-blue-50 text-xs font-bold transition-colors">
                            <i class="fas fa-download"></i> Télécharger
                        </a>
                    </div>
                </div>
            </div>
            @endforeach
        </div>
    @endif
</div>
@endsection
