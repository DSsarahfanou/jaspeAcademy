@extends('layouts.master')
@section('title', 'Shop')

@section('breadcrumb')
    <x-breadcrumb :items="[['label' => 'Shop']]" />
@endsection

@push('styles')
<style>
    [x-cloak] { display: none !important; }
    .cart-overlay { backdrop-filter: blur(2px); }
</style>
@endpush

@section('content')

{{-- ═══ ALPINE STORE CART + PAGE ═══ --}}
<div x-data="shopPage()" x-init="initCart()">

    {{-- ── HEADER PAGE ── --}}
    <div class="flex items-center justify-between mb-6">
        <div>
            <h1 class="text-xl font-bold text-gray-800">
                <i class="fas fa-box-open text-blue-500 mr-2"></i>Shop
            </h1>
            <p class="text-sm text-gray-400 mt-0.5">{{ $equipments->count() }} article(s) disponible(s)</p>
        </div>

        {{-- Bouton panier flottant --}}
        <button @click="cartOpen = true"
                class="relative flex items-center gap-2.5 bg-blue-600 hover:bg-blue-700 text-white
                       font-semibold text-sm px-4 py-2.5 rounded-xl shadow-md transition-all hover:shadow-lg">
            <i class="fas fa-shopping-cart"></i>
            <span>Panier</span>
            <span x-show="cartCount > 0"
                  x-text="cartCount"
                  class="absolute -top-2 -right-2 w-5 h-5 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
            </span>
        </button>
    </div>

    {{-- ── GRILLE ÉQUIPEMENTS ── --}}
    @if($equipments->isEmpty())
        <div class="bg-white rounded-2xl border border-dashed border-gray-200 p-20 text-center">
            <i class="fas fa-box-open text-5xl text-gray-200 mb-4"></i>
            <p class="text-gray-500">Aucun article disponible pour le moment.</p>
        </div>
    @else
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            @foreach($equipments as $equipment)
            <div class="group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg
                        overflow-hidden transition-all hover:-translate-y-0.5">

                {{-- Image --}}
                <div class="relative h-44 bg-gradient-to-br from-gray-50 to-gray-100 overflow-hidden flex items-center justify-center">
                    @if($equipment->picture)
                        <img src="{{ asset('storage/'.$equipment->picture) }}"
                             alt="{{ $equipment->name }}"
                             class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300">
                    @else
                        <i class="fas fa-box text-5xl text-gray-200"></i>
                    @endif

                    @if($equipment->status)
                    <div class="absolute top-3 left-3">
                        <span class="text-xs font-semibold px-2.5 py-1 rounded-full
                            {{ $equipment->status === 'available' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-600' }}">
                            {{ $equipment->status === 'available' ? 'Disponible' : 'Rupture de stock' }}
                        </span>
                    </div>
                    @endif
                </div>

                {{-- Infos --}}
                <div class="p-4">
                    <h3 class="font-bold text-gray-800 text-sm mb-1 line-clamp-1">{{ $equipment->name }}</h3>

                    @if($equipment->description)
                        <p class="text-xs text-gray-400 line-clamp-2 mb-3 leading-relaxed">{{ $equipment->description }}</p>
                    @endif

                    <div class="flex items-center justify-between mt-2">
                        <div>
                            <p class="text-lg font-extrabold text-blue-700">
                                {{ number_format($equipment->price, 0, ',', ' ') }}
                                <span class="text-xs font-normal text-gray-400">FCFA</span>
                            </p>
                        </div>

                        {{-- Bouton ajouter / badge quantité --}}
                        <div>
                            <template x-if="!getItem({{ $equipment->id }})">
                                <button
                                    @click="addToCart({
                                        id: {{ $equipment->id }},
                                        name: '{{ addslashes($equipment->name) }}',
                                        price: {{ (int) $equipment->price }},
                                        picture: '{{ $equipment->picture ? asset('storage/'.$equipment->picture) : '' }}'
                                    })"
                                    @if($equipment->status && $equipment->status !== 'available') disabled @endif
                                    class="flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white
                                           text-xs font-semibold px-3 py-2 rounded-xl transition-colors
                                           disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed">
                                    <i class="fas fa-plus text-xs"></i> Ajouter
                                </button>
                            </template>

                            <template x-if="getItem({{ $equipment->id }})">
                                <div class="flex items-center gap-1.5 bg-blue-50 border border-blue-200 rounded-xl px-2 py-1">
                                    <button @click="updateQty({{ $equipment->id }}, getItem({{ $equipment->id }}).quantity - 1)"
                                            class="w-6 h-6 flex items-center justify-center rounded-lg bg-blue-100 hover:bg-blue-200 text-blue-700 text-xs font-bold transition-colors">
                                        −
                                    </button>
                                    <span x-text="getItem({{ $equipment->id }}).quantity"
                                          class="text-xs font-bold text-blue-700 w-5 text-center"></span>
                                    <button @click="updateQty({{ $equipment->id }}, getItem({{ $equipment->id }}).quantity + 1)"
                                            class="w-6 h-6 flex items-center justify-center rounded-lg bg-blue-100 hover:bg-blue-200 text-blue-700 text-xs font-bold transition-colors">
                                        +
                                    </button>
                                </div>
                            </template>
                        </div>
                    </div>
                </div>
            </div>
            @endforeach
        </div>
    @endif

    {{-- ═══ CART SLIDEOVER ═══ --}}

    {{-- Overlay --}}
    <div x-show="cartOpen" x-cloak
         @click="cartOpen = false"
         class="cart-overlay fixed inset-0 bg-black/40 z-40 transition-opacity"
         x-transition:enter="transition duration-200" x-transition:enter-start="opacity-0" x-transition:enter-end="opacity-100"
         x-transition:leave="transition duration-150" x-transition:leave-end="opacity-0">
    </div>

    {{-- Panel --}}
    <div x-show="cartOpen" x-cloak
         class="fixed top-0 right-0 h-full w-full max-w-sm bg-white shadow-2xl z-50 flex flex-col"
         x-transition:enter="transition duration-300 ease-out"
         x-transition:enter-start="translate-x-full"
         x-transition:enter-end="translate-x-0"
         x-transition:leave="transition duration-200 ease-in"
         x-transition:leave-end="translate-x-full">

        {{-- Header --}}
        <div class="flex items-center justify-between px-5 py-4 border-b border-gray-100">
            <h2 class="font-bold text-gray-800 flex items-center gap-2">
                <i class="fas fa-shopping-cart text-blue-500"></i>
                Mon panier
                <span x-show="cartCount > 0"
                      x-text="'('+cartCount+')'"
                      class="text-sm text-gray-400 font-normal"></span>
            </h2>
            <button @click="cartOpen = false"
                    class="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100 text-gray-500 transition-colors">
                <i class="fas fa-times"></i>
            </button>
        </div>

        {{-- Corps panier --}}
        <div class="flex-1 overflow-y-auto px-5 py-4">
            <template x-if="cartItems.length === 0">
                <div class="flex flex-col items-center justify-center h-full gap-4 text-gray-400">
                    <i class="fas fa-shopping-cart text-4xl text-gray-200"></i>
                    <p class="text-sm font-medium">Votre panier est vide</p>
                    <button @click="cartOpen = false"
                            class="text-blue-600 text-sm font-semibold hover:text-blue-800">
                        Continuer mes achats →
                    </button>
                </div>
            </template>

            <template x-if="cartItems.length > 0">
                <div class="space-y-3">
                    <template x-for="item in cartItems" :key="item.id">
                        <div class="flex items-center gap-3 bg-gray-50 rounded-xl p-3">
                            {{-- Miniature --}}
                            <div class="w-12 h-12 rounded-xl overflow-hidden bg-gray-200 flex-shrink-0 flex items-center justify-center">
                                <template x-if="item.picture">
                                    <img :src="item.picture" class="w-full h-full object-cover" :alt="item.name">
                                </template>
                                <template x-if="!item.picture">
                                    <i class="fas fa-box text-gray-400 text-sm"></i>
                                </template>
                            </div>

                            {{-- Détails --}}
                            <div class="flex-1 min-w-0">
                                <p class="text-sm font-semibold text-gray-800 truncate" x-text="item.name"></p>
                                <p class="text-xs text-gray-400" x-text="formatPrice(item.price) + ' FCFA'"></p>
                            </div>

                            {{-- Quantité + supprimer --}}
                            <div class="flex flex-col items-end gap-1.5 flex-shrink-0">
                                <div class="flex items-center gap-1 bg-white border border-gray-200 rounded-lg px-1.5 py-1">
                                    <button @click="updateQty(item.id, item.quantity - 1)"
                                            class="w-5 h-5 flex items-center justify-center text-gray-600 hover:text-blue-600 font-bold text-sm transition-colors">−</button>
                                    <span x-text="item.quantity" class="text-xs font-bold text-gray-700 w-5 text-center"></span>
                                    <button @click="updateQty(item.id, item.quantity + 1)"
                                            class="w-5 h-5 flex items-center justify-center text-gray-600 hover:text-blue-600 font-bold text-sm transition-colors">+</button>
                                </div>
                                <button @click="removeItem(item.id)"
                                        class="text-red-400 hover:text-red-600 text-xs transition-colors">
                                    <i class="fas fa-trash-alt"></i>
                                </button>
                            </div>
                        </div>
                    </template>
                </div>
            </template>
        </div>

        {{-- Footer --}}
        <template x-if="cartItems.length > 0">
            <div class="border-t border-gray-100 px-5 py-4 space-y-4 bg-gray-50">
                <div class="flex items-center justify-between">
                    <span class="font-semibold text-gray-700">Total</span>
                    <span class="text-xl font-extrabold text-blue-700" x-text="formatPrice(cartTotal) + ' FCFA'"></span>
                </div>
                <a :href="checkoutUrl"
                   class="block w-full text-center py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white
                          font-bold text-sm transition-colors shadow-sm">
                    <i class="fas fa-credit-card mr-2"></i> Commander
                </a>
                <button @click="clearCart(); cartOpen = false"
                        class="block w-full text-center py-2.5 rounded-xl border-2 border-gray-200 text-gray-500
                               hover:border-red-300 hover:text-red-500 text-sm font-medium transition-colors">
                    Vider le panier
                </button>
            </div>
        </template>
    </div>

    {{-- Toast --}}
    <div x-show="toast.visible" x-cloak
         x-transition:enter="transition duration-300" x-transition:enter-start="opacity-0 translate-y-2" x-transition:enter-end="opacity-100 translate-y-0"
         x-transition:leave="transition duration-200" x-transition:leave-end="opacity-0 translate-y-2"
         class="fixed bottom-5 right-5 z-50 flex items-center gap-2.5 px-4 py-3 bg-green-600 text-white text-sm font-semibold rounded-xl shadow-lg">
        <i class="fas fa-check-circle"></i>
        <span x-text="toast.message"></span>
    </div>

</div>
@endsection

@push('scripts')
<script>
const CART_KEY = 'jaspe_cart';

function shopPage() {
    return {
        cartOpen:    false,
        checkoutUrl: '{{ route('apprenant.shop.checkout') }}',
        cartItems:   [],
        toast:       { visible: false, message: '' },

        initCart() {
            try {
                this.cartItems = JSON.parse(localStorage.getItem(CART_KEY) || '[]');
            } catch { this.cartItems = []; }
        },

        get cartCount() { return this.cartItems.reduce((t, i) => t + i.quantity, 0); },
        get cartTotal()  { return this.cartItems.reduce((t, i) => t + (i.price * i.quantity), 0); },

        getItem(id)  { return this.cartItems.find(i => i.id === id) || null; },

        addToCart(eq) {
            const existing = this.getItem(eq.id);
            if (existing) { existing.quantity++; }
            else { this.cartItems.push({ ...eq, quantity: 1 }); }
            this.save();
            this.showToast(`"${eq.name}" ajouté au panier`);
        },

        updateQty(id, qty) {
            if (qty <= 0) { this.removeItem(id); return; }
            const item = this.getItem(id);
            if (item) { item.quantity = qty; this.save(); }
        },

        removeItem(id) {
            this.cartItems = this.cartItems.filter(i => i.id !== id);
            this.save();
        },

        clearCart() {
            this.cartItems = [];
            this.save();
        },

        save() {
            localStorage.setItem(CART_KEY, JSON.stringify(this.cartItems));
        },

        formatPrice(p) {
            return new Intl.NumberFormat('fr-FR').format(p);
        },

        showToast(msg) {
            this.toast = { visible: true, message: msg };
            setTimeout(() => { this.toast.visible = false; }, 2500);
        },
    };
}
</script>
@endpush
