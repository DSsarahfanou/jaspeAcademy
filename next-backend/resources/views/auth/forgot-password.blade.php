@extends('layouts.auth')

@section('title', 'Mot de passe oublié')

@section('content')
<div x-data="{ loading: false, sent: {{ session('success') ? 'true' : 'false' }} }">

    <div class="mb-6 text-center">
        <div class="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-3">
            <i class="fas fa-key text-blue-600 text-xl"></i>
        </div>
        <h2 class="text-xl font-bold text-gray-800">Mot de passe oublié</h2>
        <p class="text-gray-500 text-sm mt-1">Nous vous enverrons un lien de réinitialisation</p>
    </div>

    <template x-if="sent">
        <div class="text-center py-4">
            <div class="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <i class="fas fa-check text-green-600 text-2xl"></i>
            </div>
            <p class="font-semibold text-gray-800 text-sm">Email envoyé !</p>
            <p class="text-gray-500 text-xs mt-1">Vérifiez votre boite mail pour le lien de réinitialisation.</p>
        </div>
    </template>

    <template x-if="!sent">
        <form method="POST" action="{{ route('web.auth.forgot-password.post') }}"
              @submit="loading = true" class="space-y-4">
            @csrf

            @if($errors->any())
                <div class="flex items-start gap-2 bg-red-50 border border-red-200 rounded-xl p-3 text-sm text-red-700">
                    <i class="fas fa-exclamation-circle text-red-500 mt-0.5 flex-shrink-0"></i>
                    <span>{{ $errors->first() }}</span>
                </div>
            @endif

            <div>
                <label class="block text-xs font-semibold text-gray-700 mb-1.5">Adresse email</label>
                <div class="relative">
                    <i class="fas fa-envelope absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-sm pointer-events-none"></i>
                    <input type="email" name="email" value="{{ old('email') }}" placeholder="votre@email.com"
                           class="input-field pl-10" required autofocus>
                </div>
            </div>

            <button type="submit" :disabled="loading" class="btn-primary flex items-center justify-center gap-2">
                <i x-show="loading" class="fas fa-spinner fa-spin" x-cloak></i>
                <span x-text="loading ? 'Envoi en cours...' : 'Envoyer le lien'">Envoyer le lien</span>
            </button>
        </form>
    </template>

    <p class="text-center text-sm text-gray-500 mt-5">
        <a href="{{ route('web.auth.login') }}" class="text-blue-600 font-semibold hover:text-blue-800 transition-colors">
            ← Retour à la connexion
        </a>
    </p>
</div>
@endsection
