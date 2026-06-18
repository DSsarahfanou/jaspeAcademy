@extends('layouts.master')
@section('title', 'Inscription — ' . $formation->name)

@section('breadcrumb')
    <x-breadcrumb :items="[
        ['label' => 'Catalogue', 'url' => route('apprenant.catalogue.index')],
        ['label' => $formation->name, 'url' => route('apprenant.catalogue.show', $formation->id)],
        ['label' => 'Inscription & Paiement']
    ]" />
@endsection

@section('content')
<div class="max-w-2xl mx-auto space-y-6">

    {{-- Récapitulatif formation --}}
    <div class="relative bg-gradient-to-r from-blue-700 to-blue-500 rounded-2xl overflow-hidden shadow-lg">
        @if($formation->picture)
            <img src="{{ asset('storage/' . $formation->picture) }}"
                 class="absolute inset-0 w-full h-full object-cover opacity-15" alt="">
        @endif
        <div class="relative p-6 flex items-start gap-4">
            <div class="w-14 h-14 rounded-xl bg-white/20 flex items-center justify-center flex-shrink-0">
                <i class="fas fa-graduation-cap text-white text-2xl"></i>
            </div>
            <div>
                <h1 class="text-xl font-bold text-white">{{ $formation->name }}</h1>
                @if($formation->teachers)
                    <p class="text-blue-100 text-sm mt-0.5">
                        <i class="fas fa-chalkboard-teacher mr-1"></i>
                        {{ $formation->teachers->name }} {{ $formation->teachers->surname }}
                    </p>
                @endif
                <p class="text-blue-100 text-sm mt-1">
                    {{ $formation->modules->count() }} modules
                    @if($formation->prerequisites)
                        · Prérequis : {{ $formation->prerequisites }}
                    @endif
                </p>
            </div>
        </div>
    </div>

    {{-- Carte paiement --}}
    <div class="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div class="px-6 py-5 border-b border-gray-100">
            <h2 class="font-bold text-gray-800 text-lg">Récapitulatif de commande</h2>
        </div>

        <div class="p-6 space-y-4">

            {{-- Ligne formation --}}
            <div class="flex items-center justify-between py-3 border-b border-gray-50">
                <div>
                    <p class="font-semibold text-gray-800 text-sm">{{ $formation->name }}</p>
                    <p class="text-xs text-gray-400">Accès illimité + attestation</p>
                </div>
                <p class="font-bold text-gray-800">
                    {{ $formation->price == 0 ? 'Gratuit' : number_format($formation->price, 0, ',', ' ') . ' FCFA' }}
                </p>
            </div>

            {{-- Total --}}
            <div class="flex items-center justify-between">
                <p class="font-semibold text-gray-700">Total</p>
                <p class="text-2xl font-bold text-blue-700">
                    {{ $formation->price == 0 ? 'Gratuit' : number_format($formation->price, 0, ',', ' ') . ' FCFA' }}
                </p>
            </div>

            @if($formation->price == 0)
                {{-- Formation gratuite : inscription directe --}}
                <form method="POST" action="{{ route('apprenant.catalogue.inscription.confirm', $formation->id) }}">
                    @csrf
                    <input type="hidden" name="transaction_id" value="FREE">
                    <button type="submit"
                            class="w-full flex items-center justify-center gap-2 py-4 rounded-xl
                                   bg-green-600 hover:bg-green-700 text-white font-bold transition-colors shadow-sm">
                        <i class="fas fa-check-circle text-xl"></i>
                        S'inscrire gratuitement
                    </button>
                </form>
            @else
                {{-- Paiement KkiaPay --}}
                @if(empty($kkiapayKey))
                    <div class="flex items-start gap-3 bg-amber-50 border border-amber-200 rounded-xl px-4 py-3 text-sm text-amber-800">
                        <i class="fas fa-exclamation-triangle text-amber-500 mt-0.5 flex-shrink-0"></i>
                        <span>Le paiement en ligne n'est pas encore configuré. Contactez l'administration pour vous inscrire.</span>
                    </div>
                @else
                    <div id="kkiapay-container">
                        <button id="pay-btn" onclick="launchPayment()"
                                class="w-full flex items-center justify-center gap-2 py-4 rounded-xl
                                       bg-blue-600 hover:bg-blue-700 text-white font-bold transition-colors shadow-md">
                            <i class="fas fa-credit-card text-xl"></i>
                            Payer {{ number_format($formation->price, 0, ',', ' ') }} FCFA avec KkiaPay
                        </button>
                        <p class="text-center text-xs text-gray-400 mt-2">
                            <i class="fas fa-lock mr-1"></i>Paiement sécurisé via KkiaPay
                        </p>
                    </div>

                    {{-- Formulaire de confirmation soumis après paiement --}}
                    <form id="confirm-form" method="POST"
                          action="{{ route('apprenant.catalogue.inscription.confirm', $formation->id) }}"
                          class="hidden">
                        @csrf
                        <input type="hidden" name="transaction_id" id="transaction_id_input">
                    </form>
                @endif
            @endif

        </div>
    </div>

    <div class="text-center">
        <a href="{{ route('apprenant.catalogue.show', $formation->id) }}"
           class="text-sm text-gray-500 hover:text-blue-600 transition-colors">
            ← Retour à la formation
        </a>
    </div>

</div>
@endsection

@push('scripts')
@if(!empty($kkiapayKey) && $formation->price > 0)
<script src="https://cdn.kkiapay.me/k.js"></script>
<script>
    const AMOUNT     = {{ (int) $formation->price }};
    const PUBLIC_KEY = @json($kkiapayKey);
    const REASON     = @json('Inscription : ' . $formation->name);

    function launchPayment() {
        openKkiapayWidget({
            amount:   AMOUNT,
            key:      PUBLIC_KEY,
            reason:   REASON,
            sandbox:  {{ config('app.env') === 'local' ? 'true' : 'false' }},
            theme:    '#2563eb',
            name:     @json(auth()->user()->name . ' ' . auth()->user()->surname),
            email:    @json(auth()->user()->email),
            phone:    @json(auth()->user()->phone ?? ''),
        });
    }

    addSuccessListener(function(response) {
        document.getElementById('transaction_id_input').value = response.transactionId;
        document.getElementById('confirm-form').submit();
    });

    addFailedListener(function() {
        alert('Le paiement a échoué. Veuillez réessayer.');
    });
</script>
@endif
@endpush
