@extends('layouts.master')
@section('title', 'Demande de stage')

@section('breadcrumb')
    <x-breadcrumb :items="[
        ['label' => 'Demandes de stage', 'url' => route('admin.internship.index')],
        ['label' => $internship->student?->name . ' ' . $internship->student?->surname]
    ]" />
@endsection

@section('content')
<div class="max-w-3xl mx-auto space-y-6">

    {{-- Hero --}}
    @php
        $statusMap = [
            'pending'  => ['bg-yellow-100 text-yellow-700 border-yellow-200', 'fas fa-clock',        'En attente'],
            'approved' => ['bg-green-100 text-green-700 border-green-200',   'fas fa-check-circle', 'Approuvée'],
            'rejected' => ['bg-red-100 text-red-600 border-red-200',         'fas fa-times-circle', 'Refusée'],
        ];
        $status = $internship->request_status ?? 'pending';
        [$cls, $icon, $label] = $statusMap[$status] ?? ['bg-gray-100 text-gray-600 border-gray-200', 'fas fa-question', $status];
    @endphp
    <div class="bg-gradient-to-r from-orange-700 to-orange-500 rounded-2xl p-6 shadow-lg">
        <div class="flex items-start justify-between gap-4">
            <div class="flex items-center gap-4">
                <div class="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center flex-shrink-0">
                    <i class="fas fa-file-signature text-white text-2xl"></i>
                </div>
                <div>
                    <h1 class="text-2xl font-bold text-white">
                        {{ $internship->student?->name }} {{ $internship->student?->surname }}
                    </h1>
                    <p class="text-orange-100 text-sm mt-0.5">{{ $internship->formation?->name }}</p>
                </div>
            </div>
            <a href="{{ route('admin.internship.index') }}"
               class="flex items-center gap-1.5 bg-white/20 hover:bg-white/30 text-white text-sm font-semibold px-3 py-2 rounded-xl transition-colors flex-shrink-0">
                <i class="fas fa-arrow-left text-xs"></i> Retour
            </a>
        </div>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">

        {{-- Informations apprenant --}}
        <div class="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 space-y-4">
            <h2 class="font-semibold text-gray-800 text-sm flex items-center gap-2">
                <i class="fas fa-user text-blue-500"></i> Apprenant
            </h2>
            <div class="space-y-3 text-sm">
                <div class="flex justify-between py-2 border-b border-gray-50">
                    <span class="text-gray-500">Nom</span>
                    <span class="font-semibold text-gray-800">
                        {{ $internship->student?->name }} {{ $internship->student?->surname }}
                    </span>
                </div>
                <div class="flex justify-between py-2 border-b border-gray-50">
                    <span class="text-gray-500">Email</span>
                    <span class="text-gray-700 text-xs">{{ $internship->student?->email }}</span>
                </div>
                <div class="flex justify-between py-2 border-b border-gray-50">
                    <span class="text-gray-500">Formation</span>
                    <span class="font-semibold text-gray-800">{{ $internship->formation?->name }}</span>
                </div>
                <div class="flex justify-between py-2 border-b border-gray-50">
                    <span class="text-gray-500">Score</span>
                    <span class="font-semibold {{ ($internship->score ?? 0) >= 50 ? 'text-green-600' : 'text-red-500' }}">
                        {{ $internship->score ?? '—' }}%
                    </span>
                </div>
                <div class="flex justify-between py-2">
                    <span class="text-gray-500">Progression</span>
                    <span class="font-semibold text-gray-800">{{ $internship->progression ?? 0 }}%</span>
                </div>
            </div>
        </div>

        {{-- Statut & actions --}}
        <div class="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 space-y-4">
            <h2 class="font-semibold text-gray-800 text-sm flex items-center gap-2">
                <i class="fas fa-tasks text-orange-500"></i> Statut de la demande
            </h2>

            <span class="flex items-center gap-2 text-sm font-bold px-4 py-2 rounded-xl border w-fit {{ $cls }}">
                <i class="{{ $icon }}"></i> {{ $label }}
            </span>

            <form method="POST" action="{{ route('admin.internship.update', $internship->id) }}"
                  class="space-y-3">
                @csrf @method('PATCH')
                <div>
                    <label class="block text-xs font-semibold text-gray-700 mb-1.5">Changer le statut</label>
                    <select name="status"
                            class="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 appearance-none">
                        <option value="pending"  {{ $status === 'pending'  ? 'selected' : '' }}>En attente</option>
                        <option value="approved" {{ $status === 'approved' ? 'selected' : '' }}>Approuver</option>
                        <option value="rejected" {{ $status === 'rejected' ? 'selected' : '' }}>Refuser</option>
                    </select>
                </div>
                <button type="submit"
                        class="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold transition-colors">
                    Mettre à jour
                </button>
            </form>

            @if($internship->request_internership)
            <div class="pt-2 border-t border-gray-100">
                <p class="text-xs font-semibold text-gray-500 mb-2">Document joint</p>
                <a href="{{ asset('storage/' . $internship->request_internership) }}" target="_blank"
                   class="flex items-center gap-2 text-sm text-blue-600 font-semibold hover:text-blue-800">
                    <i class="fas fa-file-pdf text-red-400 text-lg"></i>
                    Télécharger la demande
                    <i class="fas fa-external-link-alt text-xs ml-auto"></i>
                </a>
            </div>
            @endif
        </div>
    </div>
</div>
@endsection
