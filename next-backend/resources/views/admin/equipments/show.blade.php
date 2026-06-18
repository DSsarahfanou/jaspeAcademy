@extends('layouts.master')
@section('title', $equipment->name)

@section('breadcrumb')
    <x-breadcrumb :items="[
        ['label' => 'Équipements', 'url' => route('admin.equipments.index')],
        ['label' => $equipment->name]
    ]" />
@endsection

@section('content')
<div class="space-y-6">

    {{-- Hero --}}
    <div class="bg-gradient-to-r from-red-800 to-red-500 rounded-2xl p-6 shadow-lg">
        <div class="flex items-start justify-between gap-4">
            <div class="flex items-center gap-4">
                <div class="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center flex-shrink-0">
                    <i class="fas fa-box-open text-white text-2xl"></i>
                </div>
                <div>
                    <h1 class="text-2xl font-bold text-white">{{ $equipment->name }}</h1>
                    <p class="text-red-100 text-sm mt-0.5">
                        {{ number_format($equipment->price, 0, ',', ' ') }} FCFA ·
                        {{ $equipment->formations->count() }} formation(s) associée(s)
                    </p>
                </div>
            </div>
            <a href="{{ route('admin.equipments.index') }}"
               class="flex items-center gap-1.5 bg-white/20 hover:bg-white/30 text-white text-sm font-semibold px-3 py-2 rounded-xl transition-colors flex-shrink-0">
                <i class="fas fa-arrow-left text-xs"></i> Retour
            </a>
        </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {{-- Détails --}}
        <div class="lg:col-span-1 bg-white rounded-2xl border border-gray-100 shadow-sm p-5 space-y-4">
            <h2 class="font-semibold text-gray-800 text-sm">Informations</h2>
            <div class="space-y-3 text-sm">
                <div class="flex justify-between py-2 border-b border-gray-50">
                    <span class="text-gray-500">Nom</span>
                    <span class="font-semibold text-gray-800">{{ $equipment->name }}</span>
                </div>
                <div class="flex justify-between py-2 border-b border-gray-50">
                    <span class="text-gray-500">Prix unitaire</span>
                    <span class="font-semibold text-blue-700">{{ number_format($equipment->price, 0, ',', ' ') }} FCFA</span>
                </div>
                <div class="flex justify-between py-2 border-b border-gray-50">
                    <span class="text-gray-500">Formations liées</span>
                    <span class="font-semibold text-gray-800">{{ $equipment->formations->count() }}</span>
                </div>
                <div class="flex justify-between py-2">
                    <span class="text-gray-500">Ajouté le</span>
                    <span class="text-gray-600">{{ $equipment->created_at->locale('fr')->isoFormat('D MMM YYYY') }}</span>
                </div>
            </div>

            @if($equipment->description)
            <div class="pt-2">
                <p class="text-xs font-semibold text-gray-500 uppercase mb-1.5">Description</p>
                <p class="text-sm text-gray-700 leading-relaxed">{{ $equipment->description }}</p>
            </div>
            @endif
        </div>

        {{-- Formations associées --}}
        <div class="lg:col-span-2 bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div class="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
                <h2 class="font-semibold text-gray-800">Formations associées</h2>
                <span class="text-xs bg-red-100 text-red-700 font-bold px-2 py-0.5 rounded-full">
                    {{ $equipment->formations->count() }}
                </span>
            </div>

            @if($equipment->formations->isEmpty())
                <div class="py-16 text-center">
                    <i class="fas fa-book-open text-5xl text-gray-200 mb-4"></i>
                    <p class="text-gray-500 text-sm">Aucune formation associée.</p>
                </div>
            @else
                <div class="divide-y divide-gray-50">
                    @foreach($equipment->formations as $formation)
                    <div class="flex items-center gap-4 px-5 py-4 hover:bg-gray-50 transition-colors">
                        <div class="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center flex-shrink-0 overflow-hidden">
                            @if($formation->picture)
                                <img src="{{ asset('storage/' . $formation->picture) }}" class="w-full h-full object-cover">
                            @else
                                <i class="fas fa-graduation-cap text-blue-500 text-sm"></i>
                            @endif
                        </div>
                        <div class="flex-1 min-w-0">
                            <p class="font-semibold text-sm text-gray-800 truncate">{{ $formation->name }}</p>
                            <p class="text-xs text-gray-400 mt-0.5">
                                {{ number_format($formation->price, 0, ',', ' ') }} FCFA
                            </p>
                        </div>
                        <a href="{{ route('admin.formations.show', $formation->id) }}"
                           class="text-xs text-blue-600 font-semibold hover:text-blue-800 flex-shrink-0">
                            Voir <i class="fas fa-arrow-right ml-1 text-xs"></i>
                        </a>
                    </div>
                    @endforeach
                </div>
            @endif
        </div>
    </div>
</div>
@endsection
