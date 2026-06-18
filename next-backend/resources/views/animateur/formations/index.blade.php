@extends('layouts.master')
@section('title', 'Mes Formations')

@section('breadcrumb')
    <x-breadcrumb :items="[
        ['label' => 'Dashboard', 'url' => route('animateur.dashboard')],
        ['label' => 'Mes formations']
    ]" />
@endsection

@section('content')
<div class="space-y-5">
    <div class="flex items-center justify-between">
        <div>
            <h1 class="text-xl font-bold text-gray-800">Mes Formations</h1>
            <p class="text-sm text-gray-500">{{ $formations->count() }} formation(s) assignée(s)</p>
        </div>
    </div>

    @if($formations->isEmpty())
        <div class="bg-white rounded-2xl border border-dashed border-gray-200 p-16 text-center">
            <i class="fas fa-book-open text-5xl text-gray-200 mb-4"></i>
            <p class="text-gray-500 font-medium">Aucune formation assignée pour l'instant</p>
        </div>
    @else
        <div class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
            @foreach($formations as $formation)
            <a href="{{ route('animateur.formations.show', $formation->id) }}"
               class="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md
                      transition-all duration-200 overflow-hidden group flex flex-col">
                <div class="relative h-40 bg-gradient-to-br from-blue-600 to-blue-800 overflow-hidden">
                    @if($formation->picture)
                        <img src="{{ asset('storage/' . $formation->picture) }}"
                             class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 opacity-90" alt="">
                    @else
                        <div class="absolute inset-0 flex items-center justify-center">
                            <i class="fas fa-book-open text-white/30 text-4xl"></i>
                        </div>
                    @endif
                </div>
                <div class="p-4 flex-1 flex flex-col">
                    <h3 class="font-semibold text-gray-800 text-sm line-clamp-2 group-hover:text-blue-600 transition-colors mb-2">
                        {{ $formation->name }}
                    </h3>
                    <div class="flex items-center gap-3 text-xs text-gray-400 mt-auto">
                        <span><i class="fas fa-users text-blue-400 mr-1"></i>{{ $formation->students_count }} apprenant(s)</span>
                        <span><i class="fas fa-layer-group text-blue-400 mr-1"></i>{{ $formation->modules->count() }} modules</span>
                    </div>
                </div>
            </a>
            @endforeach
        </div>
    @endif
</div>
@endsection
