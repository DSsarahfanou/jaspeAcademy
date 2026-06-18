@extends('layouts.master')
@section('title', 'Finaliser la commande')

@section('breadcrumb')
    <x-breadcrumb :items="[
        ['label' => 'Shop', 'url' => route('apprenant.shop.index')],
        ['label' => 'Finaliser la commande']
    ]" />
@endsection

@push('styles')
<style>[x-cloak] { display: none !important; }</style>
@endpush

@section('content')
<div class="max-w-3xl mx-auto" x-data="checkoutPage()" x-init="loadCart()">

    {{-- Panier vide --}}
    <template x-if="cartItems.length === 0">
        <div class="bg-white rounded-2xl border border-dashed border-gray-200 p-20 text-center">
            <i class="fas fa-shopping-cart text-5xl text-gray-200 mb-4"></i>
            <p class="text-gray-500 font-medium mb-5">Votre panier est vide.</p>
            <a href="{{ route('apprenant.shop.index') }}"
               class="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-colors">
                <i class="fas fa-arrow-left text-xs"></i> Retour au shop
            </a>
        </div>
    </template>

    <template x-if="cartItems.length > 0">
        <div class="space-y-6">

            {{-- ── RÉSUMÉ COMMANDE ── --}}
            <div class="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                <div class="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
                    <h2 class="font-bold text-gray-800">Récapitulatif</h2>
                    <a href="{{ route('apprenant.shop.index') }}"
                       class="text-xs text-blue-600 hover:text-blue-800 font-medium transition-colors">
                        ← Modifier le panier
                    </a>
                </div>

                <div class="divide-y divide-gray-50">
                    <template x-for="item in cartItems" :key="item.id">
                        <div class="flex items-center gap-4 px-6 py-4">
                            <div class="w-12 h-12 rounded-xl overflow-hidden bg-gray-100 flex-shrink-0 flex items-center justify-center">
                                <template x-if="item.picture">
                                    <img :src="item.picture" class="w-full h-full object-cover" :alt="item.name">
                                </template>
                                <template x-if="!item.picture">
                                    <i class="fas fa-box text-gray-300 text-sm"></i>
                                </template>
                            </div>
                            <div class="flex-1 min-w-0">
                                <p class="font-semibold text-sm text-gray-800 truncate" x-text="item.name"></p>
                                <p class="text-xs text-gray-400"
                                   x-text="formatPrice(item.price) + ' FCFA × ' + item.quantity"></p>
                            </div>
                            <p class="font-bold text-sm text-gray-800 flex-shrink-0"
                               x-text="formatPrice(item.price * item.quantity) + ' FCFA'"></p>
                        </div>
                    </template>
                </div>

                <div class="px-6 py-4 bg-gray-50 border-t border-gray-100 flex items-center justify-between">
                    <span class="font-semibold text-gray-700">Total à payer</span>
                    <span class="text-2xl font-extrabold text-blue-700"
                          x-text="formatPrice(cartTotal) + ' FCFA'"></span>
                </div>
            </div>

            {{-- ── PAIEMENT ── --}}
            <div class="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                <div class="px-6 py-4 border-b border-gray-100">
                    <h2 class="font-bold text-gray-800">Paiement</h2>
                    <p class="text-xs text-gray-400 mt-0.5">Paiement sécurisé via KkiaPay</p>
                </div>

                <div class="p-6 space-y-4">

                    {{-- Infos acheteur --}}
                    <div class="flex items-center gap-3 bg-blue-50 border border-blue-100 rounded-xl px-4 py-3">
                        <div class="w-9 h-9 rounded-full bg-blue-200 flex items-center justify-center flex-shrink-0">
                            <span class="text-blue-700 font-bold text-sm">{{ strtoupper(substr(auth()->user()->name, 0, 1)) }}</span>
                        </div>
                        <div>
                            <p class="text-sm font-semibold text-gray-800">{{ auth()->user()->name }} {{ auth()->user()->surname }}</p>
                            <p class="text-xs text-gray-500">{{ auth()->user()->email }}</p>
                        </div>
                    </div>

                    @if(empty($kkiapayKey))
                        <div class="flex items-start gap-3 bg-amber-50 border border-amber-200 rounded-xl p-4">
                            <i class="fas fa-exclamation-triangle text-amber-500 mt-0.5 flex-shrink-0"></i>
                            <div>
                                <p class="text-sm font-semibold text-amber-800">Paiement non configuré</p>
                                <p class="text-xs text-amber-700 mt-0.5">La clé KkiaPay n'est pas encore configurée. Contactez l'administration.</p>
                            </div>
                        </div>
                    @else
                        {{-- Bouton KkiaPay --}}
                        <button id="pay-btn"
                                @click="launchPayment()"
                                :disabled="paying"
                                class="w-full flex items-center justify-center gap-3 py-4 rounded-xl font-bold text-white
                                       transition-all shadow-md"
                                :class="paying ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 hover:shadow-lg'">
                            <template x-if="!paying">
                                <span class="flex items-center gap-2">
                                    <i class="fas fa-credit-card text-lg"></i>
                                    Payer <span x-text="formatPrice(cartTotal)"></span> FCFA avec KkiaPay
                                </span>
                            </template>
                            <template x-if="paying">
                                <span class="flex items-center gap-2">
                                    <i class="fas fa-spinner fa-spin"></i> Traitement en cours...
                                </span>
                            </template>
                        </button>
                        <p class="text-center text-xs text-gray-400">
                            <i class="fas fa-lock mr-1 text-green-500"></i>Connexion sécurisée SSL
                        </p>
                    @endif

                    {{-- Formulaire de confirmation (soumis par JS) --}}
                    <form id="confirm-form"
                          method="POST"
                          action="{{ route('apprenant.shop.checkout.confirm') }}"
                          class="hidden">
                        @csrf
                        <input type="hidden" name="transaction_id" id="transaction_id_input">
                        <input type="hidden" name="items" id="items_input">
                        <input type="hidden" name="total" id="total_input">
                    </form>

                </div>
            </div>

            {{-- Garanties --}}
            <div class="grid grid-cols-3 gap-4 text-center">
                @foreach([
                    ['fas fa-shield-alt','text-green-500','Paiement sécurisé'],
                    ['fas fa-file-invoice','text-blue-500','Facture automatique'],
                    ['fas fa-headset','text-purple-500','Support disponible'],
                ] as [$icon, $cls, $label])
                <div class="bg-white rounded-xl border border-gray-100 p-3">
                    <i class="{{ $icon }} {{ $cls }} text-xl mb-1.5"></i>
                    <p class="text-xs text-gray-500 font-medium">{{ $label }}</p>
                </div>
                @endforeach
            </div>

        </div>
    </template>
</div>
@endsection

@push('scripts')
@if(!empty($kkiapayKey))
<script src="https://cdn.kkiapay.me/k.js"></script>
@endif
<script>
const CART_KEY     = 'jaspe_cart';
const KKIAPAY_KEY  = @json($kkiapayKey);
const IS_SANDBOX   = {{ config('app.env') === 'local' ? 'true' : 'false' }};

function checkoutPage() {
    return {
        cartItems: [],
        paying:    false,

        loadCart() {
            try {
                this.cartItems = JSON.parse(localStorage.getItem(CART_KEY) || '[]');
            } catch { this.cartItems = []; }
        },

        get cartTotal()  { return this.cartItems.reduce((t, i) => t + (i.price * i.quantity), 0); },
        get cartCount()  { return this.cartItems.reduce((t, i) => t + i.quantity, 0); },

        formatPrice(p) { return new Intl.NumberFormat('fr-FR').format(p); },

        launchPayment() {
            if (!KKIAPAY_KEY || this.cartItems.length === 0) return;
            this.paying = true;

            openKkiapayWidget({
                amount:  this.cartTotal,
                key:     KKIAPAY_KEY,
                sandbox: IS_SANDBOX,
                reason:  'Commande JaspeAcademy — ' + this.cartCount + ' article(s)',
                theme:   '#2563eb',
                name:    @json(auth()->user()->name . ' ' . auth()->user()->surname),
                email:   @json(auth()->user()->email),
                phone:   @json(auth()->user()->phone ?? ''),
            });

            addSuccessListener((response) => {
                document.getElementById('transaction_id_input').value = response.transactionId;
                document.getElementById('items_input').value          = JSON.stringify(this.cartItems);
                document.getElementById('total_input').value          = this.cartTotal;

                // Vider le panier local AVANT de soumettre
                localStorage.removeItem(CART_KEY);
                document.getElementById('confirm-form').submit();
            });

            addFailedListener(() => {
                this.paying = false;
                alert('Le paiement a échoué. Veuillez réessayer.');
            });
        },
    };
}
</script>
@endpush
