@extends('layouts.master')
@section('title', $teacher->name . ' ' . $teacher->surname)

@section('breadcrumb')
    <x-breadcrumb :items="[
        ['label' => 'Enseignants', 'url' => route('admin.teachers.index')],
        ['label' => $teacher->name . ' ' . $teacher->surname]
    ]" />
@endsection

@section('content')
<div class="space-y-6">

    {{-- Hero --}}
    <div class="bg-gradient-to-r from-purple-800 to-purple-500 rounded-2xl p-6 shadow-lg">
        <div class="flex items-start justify-between gap-4">
            <div class="flex items-center gap-4">
                <div class="w-16 h-16 rounded-2xl overflow-hidden bg-white/20 flex items-center justify-center flex-shrink-0">
                    @if($teacher->picture)
                        <img src="{{ asset('storage/' . $teacher->picture) }}"
                             class="w-full h-full object-cover" alt="Photo">
                    @else
                        <span class="text-white font-bold text-2xl">
                            {{ strtoupper(substr($teacher->name, 0, 1)) }}
                        </span>
                    @endif
                </div>
                <div>
                    <h1 class="text-2xl font-bold text-white">{{ $teacher->name }} {{ $teacher->surname }}</h1>
                    <p class="text-purple-100 text-sm mt-0.5">{{ $teacher->email }}</p>
                    <p class="text-purple-100 text-sm">{{ $formations->count() }} formation(s) · Animateur</p>
                </div>
            </div>
            <a href="{{ route('admin.teachers.index') }}"
               class="flex items-center gap-1.5 bg-white/20 hover:bg-white/30 text-white text-sm font-semibold px-3 py-2 rounded-xl transition-colors flex-shrink-0">
                <i class="fas fa-arrow-left text-xs"></i> Retour
            </a>
        </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {{-- Informations --}}
        <div class="lg:col-span-1 bg-white rounded-2xl border border-gray-100 shadow-sm p-5 space-y-4">
            <h2 class="font-semibold text-gray-800 text-sm">Coordonnées</h2>
            <div class="space-y-3 text-sm">
                <div class="flex items-start gap-3 py-2 border-b border-gray-50">
                    <i class="fas fa-envelope text-gray-400 mt-0.5 flex-shrink-0"></i>
                    <span class="text-gray-700 break-all">{{ $teacher->email }}</span>
                </div>
                @if($teacher->phone)
                <div class="flex items-center gap-3 py-2 border-b border-gray-50">
                    <i class="fas fa-phone text-gray-400 flex-shrink-0"></i>
                    <span class="text-gray-700">{{ $teacher->phone }}</span>
                </div>
                @endif
                @if($teacher->address)
                <div class="flex items-start gap-3 py-2 border-b border-gray-50">
                    <i class="fas fa-map-marker-alt text-gray-400 mt-0.5 flex-shrink-0"></i>
                    <span class="text-gray-700">{{ $teacher->address }}</span>
                </div>
                @endif
                <div class="flex justify-between py-2">
                    <span class="text-gray-500">Inscrit le</span>
                    <span class="text-gray-600">{{ $teacher->created_at->locale('fr')->isoFormat('D MMM YYYY') }}</span>
                </div>
            </div>
        </div>

        {{-- Formations --}}
        <div class="lg:col-span-2 bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div class="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
                <h2 class="font-semibold text-gray-800">Formations assignées</h2>
                <span class="text-xs bg-purple-100 text-purple-700 font-bold px-2 py-0.5 rounded-full">
                    {{ $formations->count() }}
                </span>
            </div>

            @if($formations->isEmpty())
                <div class="py-16 text-center">
                    <i class="fas fa-book-open text-5xl text-gray-200 mb-4"></i>
                    <p class="text-gray-500 text-sm">Aucune formation assignée.</p>
                </div>
            @else
                <div class="divide-y divide-gray-50">
                    @foreach($formations as $formation)
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
                                {{ $formation->students_count }} apprenant(s) ·
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
