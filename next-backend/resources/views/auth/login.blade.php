@extends('layouts.auth')

@section('title', 'Connexion')

@section('content')
<div x-data="{
    showPassword: false,
    loading: false,
    step: 'login',       {{-- 'login' | '2fa' --}}
    email: '',
    twoFaCode: '',
    twoFaLoading: false,
    twoFaError: '',
    twoFaSent: false,

    async send2fa() {
        this.twoFaLoading = true; this.twoFaError = '';
        try {
            const r = await fetch('/send-2fa-code', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'X-CSRF-TOKEN': document.querySelector('meta[name=csrf-token]').content },
                body: JSON.stringify({ email: this.email })
            });
            const data = await r.json();
            if (data.status === 'success') { this.twoFaSent = true; this.step = '2fa'; }
            else this.twoFaError = data.message || 'Erreur lors de l\'envoi.';
        } catch(e) { this.twoFaError = 'Erreur réseau.'; }
        this.twoFaLoading = false;
    }
}">
  @csrf
    {{-- ── STEP 1 : CREDENTIALS ── --}}
    <div x-show="step === 'login'">
        <div class="mb-6 text-center">
            <h2 class="text-xl font-bold text-gray-800">Bon retour !</h2>
            <p class="text-gray-500 text-sm mt-1">Connectez-vous à votre espace</p>
        </div>

        <form method="POST" action="{{ route('web.auth.login.post') }}"
              @submit="loading = true"
              class="space-y-4">
            @csrf

            {{-- Erreurs globales --}}
            @if($errors->any())
                <div class="flex items-start gap-2 bg-red-50 border border-red-200 rounded-xl p-3 text-sm text-red-700">
                    <i class="fas fa-exclamation-circle text-red-500 mt-0.5 flex-shrink-0"></i>
                    <span>{{ $errors->first() }}</span>
                </div>
            @endif

            {{-- Email --}}
            <div>
                <label class="block text-xs font-semibold text-gray-700 mb-1.5">
                    Adresse email
                </label>
                <div class="relative">
                    <i class="fas fa-envelope absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-sm pointer-events-none"></i>
                    <input type="email"
                           name="email"
                           x-model="email"
                           value="{{ old('email') }}"
                           placeholder="votre@email.com"
                           autocomplete="email"
                           required
                           class="input-field pl-10 {{ $errors->has('email') ? 'error' : '' }}">
                </div>
            </div>

            {{-- Password --}}
            <div>
                <div class="flex items-center justify-between mb-1.5">
                    <label class="text-xs font-semibold text-gray-700">Mot de passe</label>
                    <a href="{{ route('web.auth.forgot-password') }}"
                       class="text-xs text-blue-600 hover:text-blue-800 font-medium transition-colors">
                        Mot de passe oublié ?
                    </a>
                </div>
                <div class="relative">
                    <i class="fas fa-lock absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-sm pointer-events-none"></i>
                    <input :type="showPassword ? 'text' : 'password'"
                           name="password"
                           placeholder="••••••••"
                           autocomplete="current-password"
                           required
                           class="input-field pl-10 pr-10 {{ $errors->has('password') ? 'error' : '' }}">
                    <button type="button"
                            @click="showPassword = !showPassword"
                            class="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors">
                        <i class="fas" :class="showPassword ? 'fa-eye-slash' : 'fa-eye'" style="font-size:0.85rem"></i>
                    </button>
                </div>
            </div>

            {{-- Remember me + 2FA --}}
            <div class="flex items-center justify-between">
                <label class="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" name="remember"
                           class="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500">
                    <span class="text-sm text-gray-600">Se souvenir de moi</span>
                </label>
                <button type="button"
                        @click="if(email) send2fa(); else $refs.emailInput?.focus()"
                        class="text-xs text-blue-600 hover:text-blue-800 font-medium transition-colors">
                    Connexion 2FA
                </button>
            </div>

            {{-- Submit --}}
            <button type="submit"
                    :disabled="loading"
                    class="btn-primary flex items-center justify-center gap-2 mt-2">
                <i x-show="loading" class="fas fa-spinner fa-spin" x-cloak></i>
                <span x-text="loading ? 'Connexion...' : 'Se connecter'">Se connecter</span>
            </button>
        </form>

        {{-- Register link --}}
        <p class="text-center text-sm text-gray-500 mt-6">
            Pas encore de compte ?
            <a href="{{ route('web.auth.register') }}"
               class="text-blue-600 font-semibold hover:text-blue-800 transition-colors">
                S'inscrire
            </a>
        </p>
    </div>

    {{-- ── STEP 2 : 2FA CODE ── --}}
    <div x-show="step === '2fa'" x-cloak
         x-data="{ code: '', verifying: false, verified: false, err: '' }"
         x-transition:enter="transition ease-out duration-300"
         x-transition:enter-start="opacity-0 translate-x-4"
         x-transition:enter-end="opacity-100 translate-x-0">

        <div class="mb-6 text-center">
            <div class="w-14 h-14 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-3">
                <i class="fas fa-shield-alt text-blue-600 text-2xl"></i>
            </div>
            <h2 class="text-lg font-bold text-gray-800">Vérification 2FA</h2>
            <p class="text-gray-500 text-sm mt-1">
                Code envoyé à <span class="font-medium text-gray-700" x-text="email"></span>
            </p>
        </div>

        <template x-if="twoFaError">
            <p class="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2 mb-4" x-text="twoFaError"></p>
        </template>

        <template x-if="err">
            <p class="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2 mb-4" x-text="err"></p>
        </template>

        <div class="mb-4">
            <label class="block text-xs font-semibold text-gray-700 mb-1.5">Code à 6 chiffres</label>
            <input type="text"
                   x-model="code"
                   maxlength="6"
                   placeholder="000000"
                   class="input-field text-center text-xl tracking-[0.4em] font-bold">
        </div>

        <button type="button"
                :disabled="verifying || code.length < 6"
                @click="
                    verifying = true; err = '';
                    fetch('/verify-2fa-code', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json', 'X-CSRF-TOKEN': document.querySelector('meta[name=csrf-token]').content },
                        body: JSON.stringify({ email: email, code: code })
                    }).then(r => r.json()).then(d => {
                        verifying = false;
                        if (d.status === 'success') { verified = true; step = 'login'; }
                        else err = d.message || 'Code invalide.';
                    }).catch(() => { verifying = false; err = 'Erreur réseau.'; })
                "
                class="btn-primary flex items-center justify-center gap-2">
            <i x-show="verifying" class="fas fa-spinner fa-spin" x-cloak></i>
            <span x-text="verifying ? 'Vérification...' : 'Vérifier le code'">Vérifier</span>
        </button>

        <button type="button" @click="step = 'login'"
                class="mt-3 w-full text-sm text-gray-500 hover:text-gray-700 text-center transition-colors">
            ← Retour à la connexion
        </button>
    </div>

</div>
@endsection
