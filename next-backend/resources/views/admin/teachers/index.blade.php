@extends('layouts.master')
@section('title', 'Enseignants')

@section('breadcrumb')
    <x-breadcrumb :items="[
        ['label' => 'Dashboard', 'url' => route('admin.dashboard')],
        ['label' => 'Enseignants']
    ]" />
@endsection

@section('content')
<div class="space-y-5" x-data="{ search: '' }">
    <div>
        <h1 class="text-xl font-bold text-gray-800">Enseignants</h1>
        <p class="text-sm text-gray-500">{{ $teachers->count() }} enseignant(s)</p>
    </div>

    <div class="relative max-w-sm">
        <i class="fas fa-search absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-sm pointer-events-none"></i>
        <input x-model="search" placeholder="Rechercher un enseignant…"
               class="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition-all">
    </div>

    @if($teachers->isEmpty())
        <div class="bg-white rounded-2xl border border-dashed border-gray-200 p-16 text-center">
            <i class="fas fa-chalkboard-teacher text-5xl text-gray-200 mb-4"></i>
            <p class="text-gray-500">Aucun enseignant.</p>
        </div>
    @else
        <div class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
            @foreach($teachers as $teacher)
            <div x-show="!search || '{{ strtolower($teacher->name . ' ' . $teacher->surname) }}'.includes(search.toLowerCase())"
                 class="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all p-5">
                <div class="flex items-center gap-4 mb-4">
                    <div class="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center flex-shrink-0 overflow-hidden">
                        @if($teacher->picture)
                            <img src="{{ asset('storage/' . $teacher->picture) }}" class="w-full h-full object-cover">
                        @else
                            <span class="text-blue-600 font-bold text-lg">{{ strtoupper(substr($teacher->name, 0, 1)) }}</span>
                        @endif
                    </div>
                    <div class="flex-1 min-w-0">
                        <h3 class="font-semibold text-gray-800 truncate">{{ $teacher->name }} {{ $teacher->surname }}</h3>
                        <p class="text-xs text-gray-400 truncate">{{ $teacher->email }}</p>
                    </div>
                </div>
                <div class="flex items-center justify-between text-sm">
                    <span class="flex items-center gap-1.5 text-gray-600">
                        <i class="fas fa-book-open text-blue-400"></i>
                        {{ $teacher->teacher_formations_count }} formation(s)
                    </span>
                    <a href="{{ route('admin.teachers.show', $teacher->id) }}"
                       class="text-xs text-blue-600 hover:text-blue-800 font-semibold">
                        Voir →
                    </a>
                </div>
            </div>
            @endforeach
        </div>
    @endif
</div>
@endsection
