@extends('layouts.master')
@section('title', 'Demandes de Stage')

@section('breadcrumb')
    <x-breadcrumb :items="[
        ['label' => 'Dashboard', 'url' => route('admin.dashboard')],
        ['label' => 'Demandes de stage']
    ]" />
@endsection

@section('content')
<div class="space-y-5">
    <div>
        <h1 class="text-xl font-bold text-gray-800">Demandes de Stage</h1>
        <p class="text-sm text-gray-500">{{ $requests->count() }} demande(s) au total</p>
    </div>

    @if($requests->isEmpty())
        <div class="bg-white rounded-2xl border border-dashed border-gray-200 p-16 text-center">
            <i class="fas fa-file-signature text-5xl text-gray-200 mb-4"></i>
            <p class="text-gray-500 font-medium">Aucune demande de stage.</p>
        </div>
    @else
        <div class="space-y-4">
            @foreach($requests as $req)
            <div class="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
                <div class="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                    <div class="flex items-start gap-4">
                        <div class="w-12 h-12 rounded-xl bg-orange-100 flex items-center justify-center flex-shrink-0">
                            <i class="fas fa-file-signature text-orange-500"></i>
                        </div>
                        <div>
                            <p class="font-semibold text-gray-800">
                                {{ $req->student?->name }} {{ $req->student?->surname }}
                            </p>
                            <p class="text-sm text-gray-500">{{ $req->formation?->name }}</p>
                            <p class="text-xs text-gray-400 mt-0.5">
                                Score : {{ $req->score ?? '—' }}% · Progression : {{ $req->progression ?? 0 }}%
                            </p>
                        </div>
                    </div>

                    <div class="flex flex-col gap-3 sm:items-end">
                        @php
                            $statusMap = [
                                'pending'  => ['bg-yellow-100 text-yellow-700 border-yellow-200', 'fas fa-clock', 'En attente'],
                                'approved' => ['bg-green-100 text-green-700 border-green-200',   'fas fa-check-circle', 'Approuvée'],
                                'rejected' => ['bg-red-100 text-red-600 border-red-200',         'fas fa-times-circle', 'Refusée'],
                            ];
                            $status = $req->request_status ?? 'pending';
                            [$cls, $icon, $label] = $statusMap[$status] ?? ['bg-gray-100 text-gray-600 border-gray-200', 'fas fa-question', $status];
                        @endphp
                        <span class="flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-full border {{ $cls }}">
                            <i class="{{ $icon }}"></i> {{ $label }}
                        </span>

                        {{-- Changer statut --}}
                        <form method="POST" action="{{ route('admin.internship.update', $req->id) }}"
                              class="flex gap-2">
                            @csrf @method('PATCH')
                            <select name="status"
                                    class="text-xs border border-gray-200 rounded-lg px-2 py-1.5 focus:outline-none focus:border-blue-500">
                                <option value="pending"  {{ $status === 'pending'  ? 'selected' : '' }}>En attente</option>
                                <option value="approved" {{ $status === 'approved' ? 'selected' : '' }}>Approuver</option>
                                <option value="rejected" {{ $status === 'rejected' ? 'selected' : '' }}>Refuser</option>
                            </select>
                            <button type="submit"
                                    class="text-xs bg-blue-600 text-white font-semibold px-3 py-1.5 rounded-lg hover:bg-blue-700 transition-colors">
                                Mettre à jour
                            </button>
                        </form>

                        @if($req->request_internership)
                            <a href="{{ asset('storage/' . $req->request_internership) }}" target="_blank"
                               class="text-xs text-blue-600 font-semibold hover:text-blue-800">
                                <i class="fas fa-file-pdf text-red-400 mr-1"></i>Voir la demande
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
