@extends('layouts.master')
@section('title', 'Mes Demandes de Stage')

@section('breadcrumb')
    <x-breadcrumb :items="[
        ['label' => 'Dashboard', 'url' => route('apprenant.dashboard')],
        ['label' => 'Demandes de stage']
    ]" />
@endsection

@section('content')
<div class="space-y-5">
    <div>
        <h1 class="text-xl font-bold text-gray-800">Mes Demandes de Stage</h1>
        <p class="text-sm text-gray-500 mt-0.5">{{ $stages->count() }} demande(s) soumise(s)</p>
    </div>

    @if($stages->isEmpty())
        <div class="bg-white rounded-2xl border border-dashed border-gray-200 p-16 text-center">
            <div class="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <i class="fas fa-briefcase text-4xl text-gray-200"></i>
            </div>
            <h2 class="text-gray-600 font-medium mb-1">Aucune demande de stage</h2>
            <p class="text-gray-400 text-sm">Terminez une formation pour soumettre une demande de stage.</p>
        </div>
    @else
        <div class="space-y-4">
            @foreach($stages as $fs)
            <div class="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
                <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div class="flex items-start gap-4">
                        <div class="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                            <i class="fas fa-briefcase text-blue-600"></i>
                        </div>
                        <div>
                            <h3 class="font-semibold text-gray-800">{{ $fs->formation->name }}</h3>
                            <p class="text-xs text-gray-500 mt-0.5">Score formation : {{ $fs->score ?? '—' }}%</p>
                        </div>
                    </div>

                    <div class="flex items-center gap-3">
                        @php
                            $statusMap = [
                                'pending'  => ['bg-yellow-100 text-yellow-700 border-yellow-200', 'fas fa-clock', 'En attente'],
                                'approved' => ['bg-green-100 text-green-700 border-green-200',   'fas fa-check-circle', 'Approuvée'],
                                'rejected' => ['bg-red-100 text-red-600 border-red-200',         'fas fa-times-circle', 'Refusée'],
                            ];
                            $status = $fs->request_status ?? 'pending';
                            [$cls, $icon, $label] = $statusMap[$status] ?? ['bg-gray-100 text-gray-600 border-gray-200', 'fas fa-question-circle', $status];
                        @endphp
                        <span class="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full border {{ $cls }}">
                            <i class="{{ $icon }}"></i> {{ $label }}
                        </span>

                        @if($fs->request_internership)
                            <a href="{{ asset('storage/' . $fs->request_internership) }}" target="_blank"
                               class="flex items-center gap-1.5 text-xs text-blue-600 hover:text-blue-800 font-semibold">
                                <i class="fas fa-file-pdf text-red-400"></i> Voir ma demande
                            </a>
                        @endif
                    </div>
                </div>
            </div>
            @endforeach
        </div>
    @endif
</div>
@endsection
