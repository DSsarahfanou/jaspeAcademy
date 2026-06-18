@extends('layouts.master')
@section('title', 'Équipements')

@section('breadcrumb')
    <x-breadcrumb :items="[
        ['label' => 'Dashboard', 'url' => route('admin.dashboard')],
        ['label' => 'Équipements']
    ]" />
@endsection

@section('content')
<div class="space-y-5" x-data="{ search: '' }">
    <div>
        <h1 class="text-xl font-bold text-gray-800">Équipements</h1>
        <p class="text-sm text-gray-500">{{ $equipments->count() }} équipement(s)</p>
    </div>

    <div class="relative max-w-sm">
        <i class="fas fa-search absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-sm pointer-events-none"></i>
        <input x-model="search" placeholder="Rechercher…"
               class="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition-all">
    </div>

    @if($equipments->isEmpty())
        <div class="bg-white rounded-2xl border border-dashed border-gray-200 p-16 text-center">
            <i class="fas fa-box-open text-5xl text-gray-200 mb-4"></i>
            <p class="text-gray-500 font-medium">Aucun équipement.</p>
        </div>
    @else
        <div class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
            @foreach($equipments as $eq)
            <div x-show="!search || '{{ strtolower($eq->name) }}'.includes(search.toLowerCase())"
                 class="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all overflow-hidden">
                <div class="relative h-36 bg-gray-100 overflow-hidden">
                    @if($eq->picture)
                        <img src="{{ asset('storage/' . $eq->picture) }}" class="w-full h-full object-cover">
                    @else
                        <div class="absolute inset-0 flex items-center justify-center">
                            <i class="fas fa-box-open text-gray-300 text-4xl"></i>
                        </div>
                    @endif
                    <div class="absolute top-2 right-2">
                        <span class="text-xs font-bold px-2.5 py-1 rounded-full shadow {{ $eq->status ? 'bg-green-500 text-white' : 'bg-red-500 text-white' }}">
                            {{ $eq->status ? 'Disponible' : 'Indisponible' }}
                        </span>
                    </div>
                </div>
                <div class="p-4">
                    <h3 class="font-semibold text-gray-800 text-sm mb-1">{{ $eq->name }}</h3>
                    @if($eq->description)
                        <p class="text-xs text-gray-500 line-clamp-2 mb-3">{{ $eq->description }}</p>
                    @endif
                    <div class="flex items-center justify-between">
                        <span class="text-sm font-bold text-blue-700">{{ number_format($eq->price, 0, ',', ' ') }} FCFA</span>
                        <span class="text-xs text-gray-400">{{ $eq->formations_count }} formation(s)</span>
                    </div>
                </div>
            </div>
            @endforeach
        </div>
    @endif
</div>
@endsection
