@extends('layouts.auth')

@section('title', 'Inscription')

@section('content')
<div x-data="{ showPwd: false, showPwd2: false, loading: false, step: 1, preview: null,
    nextStep() { if (this.step < 2) this.step++ },
    prevStep() { if (this.step > 1) this.step-- }
}">

    <div class="mb-5 text-center">
        <h2 class="text-xl font-bold text-gray-800">Créer un compte</h2>
        <p class="text-gray-500 text-sm mt-1">Rejoignez JaspeAcademy gratuitement</p>
    </div>

    {{-- Steps indicator --}}
    <div class="flex items-center gap-2 mb-6">
        <div class="flex items-center gap-1.5 flex-1">
            <div class="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold transition-colors"
                 :class="step >= 1 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-500'">1</div>
            <span class="text-xs font-medium" :class="step >= 1 ? 'text-blue-600' : 'text-gray-400'">Identité</span>
        </div>
        <div class="flex-1 h-px" :class="step >= 2 ? 'bg-blue-600' : 'bg-gray-200'"></div>
        <div class="flex items-center gap-1.5 flex-1 justify-end">
            <div class="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold transition-colors"
                 :class="step >= 2 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-500'">2</div>
            <span class="text-xs font-medium" :class="step >= 2 ? 'text-blue-600' : 'text-gray-400'">Accès</span>
        </div>
    </div>

    {{-- Erreurs --}}
    @if($errors->any())
        <div class="flex items-start gap-2 bg-red-50 border border-red-200 rounded-xl p-3 text-sm text-red-700 mb-4">
            <i class="fas fa-exclamation-circle text-red-500 mt-0.5 flex-shrink-0"></i>
            <ul class="list-disc list-inside space-y-0.5">
                @foreach($errors->all() as $error)
                    <li>{{ $error }}</li>
                @endforeach
            </ul>
        </div>
    @endif

    <form method="POST" action="{{ route('web.auth.register.post') }}"
          enctype="multipart/form-data"
          @submit="loading = true"
          class="space-y-4">
        @csrf

        {{-- ── STEP 1 : Informations personnelles ── --}}
        <div x-show="step === 1">
            {{-- Nom + Prénom --}}
            <div class="grid grid-cols-2 gap-3">
                <div>
                    <label class="block text-xs font-semibold text-gray-700 mb-1.5">Nom <span class="text-red-500">*</span></label>
                    <input type="text" name="name" value="{{ old('name') }}" placeholder="Dupont"
                           class="input-field {{ $errors->has('name') ? 'error' : '' }}" required>
                </div>
                <div>
                    <label class="block text-xs font-semibold text-gray-700 mb-1.5">Prénom <span class="text-red-500">*</span></label>
                    <input type="text" name="surname" value="{{ old('surname') }}" placeholder="Jean"
                           class="input-field {{ $errors->has('surname') ? 'error' : '' }}" required>
                </div>
            </div>

            {{-- Genre + Date de naissance --}}
            <div class="grid grid-cols-2 gap-3 mt-3">
                <div>
                    <label class="block text-xs font-semibold text-gray-700 mb-1.5">Genre <span class="text-red-500">*</span></label>
                    <div class="relative">
                        <i class="fas fa-venus-mars absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-sm pointer-events-none"></i>
                        <select name="gender" class="input-field pl-10 appearance-none {{ $errors->has('gender') ? 'error' : '' }}" required>
                            <option value="">— Choisir —</option>
                            <option value="male"   {{ old('gender') === 'male'   ? 'selected' : '' }}>Homme</option>
                            <option value="female" {{ old('gender') === 'female' ? 'selected' : '' }}>Femme</option>
                        </select>
                    </div>
                </div>
                <div>
                    <label class="block text-xs font-semibold text-gray-700 mb-1.5">Date de naissance <span class="text-red-500">*</span></label>
                    <input type="date" name="birth_date" value="{{ old('birth_date') }}"
                           class="input-field {{ $errors->has('birth_date') ? 'error' : '' }}" required>
                </div>
            </div>

            {{-- Téléphone --}}
            <div class="mt-3">
                <label class="block text-xs font-semibold text-gray-700 mb-1.5">Téléphone <span class="text-red-500">*</span></label>
                <div class="relative">
                    <i class="fas fa-phone absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-sm pointer-events-none"></i>
                    <input type="tel" name="phone" value="{{ old('phone') }}" placeholder="+229 00 00 00 00"
                           class="input-field pl-10 {{ $errors->has('phone') ? 'error' : '' }}" required>
                </div>
            </div>

            {{-- Adresse --}}
            <div class="mt-3">
                <label class="block text-xs font-semibold text-gray-700 mb-1.5">Adresse <span class="text-red-500">*</span></label>
                <div class="relative">
                    <i class="fas fa-map-marker-alt absolute left-3.5 top-3.5 text-gray-400 text-sm pointer-events-none"></i>
                    <textarea name="address" rows="2" placeholder="Cotonou, Bénin"
                              class="input-field pl-10 resize-none {{ $errors->has('address') ? 'error' : '' }}"
                              required>{{ old('address') }}</textarea>
                </div>
            </div>

            {{-- Photo de profil --}}
            <div class="mt-3">
                <label class="block text-xs font-semibold text-gray-700 mb-1.5">Photo de profil</label>
                <div class="flex items-center gap-4">
                    <div class="w-14 h-14 rounded-full bg-gray-100 border-2 border-dashed border-gray-300
                                flex items-center justify-center overflow-hidden flex-shrink-0">
                        <img x-show="preview" :src="preview" class="w-full h-full object-cover" x-cloak>
                        <i x-show="!preview" class="fas fa-user text-gray-400 text-xl"></i>
                    </div>
                    <div class="flex-1">
                        <input type="file" name="picture" accept="image/*"
                               @change="preview = $event.target.files[0] ? URL.createObjectURL($event.target.files[0]) : null"
                               class="block w-full text-sm text-gray-500
                                      file:mr-3 file:py-1.5 file:px-3 file:rounded-lg file:border-0
                                      file:text-xs file:font-semibold file:bg-blue-50 file:text-blue-700
                                      hover:file:bg-blue-100 file:cursor-pointer cursor-pointer">
                        <p class="text-xs text-gray-400 mt-1">JPG, PNG — max 2 Mo</p>
                    </div>
                </div>
            </div>

            <button type="button" @click="nextStep()"
                    class="btn-primary mt-5 flex items-center justify-center gap-2">
                Continuer <i class="fas fa-arrow-right text-sm"></i>
            </button>
        </div>

        {{-- ── STEP 2 : Accès / Connexion ── --}}
        <div x-show="step === 2" x-cloak
             x-transition:enter="transition ease-out duration-200"
             x-transition:enter-start="opacity-0 translate-x-4"
             x-transition:enter-end="opacity-100 translate-x-0">

            {{-- Email --}}
            <div>
                <label class="block text-xs font-semibold text-gray-700 mb-1.5">Email <span class="text-red-500">*</span></label>
                <div class="relative">
                    <i class="fas fa-envelope absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-sm pointer-events-none"></i>
                    <input type="email" name="email" value="{{ old('email') }}" placeholder="votre@email.com"
                           autocomplete="email"
                           class="input-field pl-10 {{ $errors->has('email') ? 'error' : '' }}" required>
                </div>
            </div>

            {{-- Password --}}
            <div class="mt-3">
                <label class="block text-xs font-semibold text-gray-700 mb-1.5">Mot de passe <span class="text-red-500">*</span></label>
                <div class="relative">
                    <i class="fas fa-lock absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-sm pointer-events-none"></i>
                    <input :type="showPwd ? 'text' : 'password'" name="password"
                           placeholder="Minimum 8 caractères" autocomplete="new-password"
                           class="input-field pl-10 pr-10 {{ $errors->has('password') ? 'error' : '' }}" required>
                    <button type="button" @click="showPwd = !showPwd"
                            class="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors">
                        <i class="fas" :class="showPwd ? 'fa-eye-slash' : 'fa-eye'" style="font-size:0.85rem"></i>
                    </button>
                </div>
            </div>

            {{-- Password confirmation --}}
            <div class="mt-3">
                <label class="block text-xs font-semibold text-gray-700 mb-1.5">Confirmer le mot de passe <span class="text-red-500">*</span></label>
                <div class="relative">
                    <i class="fas fa-lock absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-sm pointer-events-none"></i>
                    <input :type="showPwd2 ? 'text' : 'password'" name="password_confirmation"
                           placeholder="Répétez le mot de passe" autocomplete="new-password"
                           class="input-field pl-10 pr-10" required>
                    <button type="button" @click="showPwd2 = !showPwd2"
                            class="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors">
                        <i class="fas" :class="showPwd2 ? 'fa-eye-slash' : 'fa-eye'" style="font-size:0.85rem"></i>
                    </button>
                </div>
            </div>

            {{-- CGU --}}
            <div class="flex items-start gap-2 mt-4">
                <input type="checkbox" id="cgu" required
                       class="w-4 h-4 mt-0.5 rounded border-gray-300 text-blue-600 focus:ring-blue-500">
                <label for="cgu" class="text-xs text-gray-600 leading-snug cursor-pointer">
                    J'accepte les <a href="#" class="text-blue-600 font-medium hover:underline">conditions d'utilisation</a>
                    et la <a href="#" class="text-blue-600 font-medium hover:underline">politique de confidentialité</a>
                </label>
            </div>

            <div class="flex gap-3 mt-5">
                <button type="button" @click="prevStep()"
                        class="flex-1 py-2.5 rounded-xl border-2 border-gray-200 text-gray-600 text-sm font-semibold
                               hover:border-blue-300 hover:text-blue-600 transition-colors flex items-center justify-center gap-2">
                    <i class="fas fa-arrow-left text-xs"></i> Retour
                </button>
                <button type="submit"
                        :disabled="loading"
                        class="btn-primary flex-1 flex items-center justify-center gap-2">
                    <i x-show="loading" class="fas fa-spinner fa-spin" x-cloak></i>
                    <span x-text="loading ? 'Création...' : 'Créer le compte'">Créer le compte</span>
                </button>
            </div>
        </div>
    </form>

    <p class="text-center text-sm text-gray-500 mt-5">
        Déjà un compte ?
        <a href="{{ route('web.auth.login') }}" class="text-blue-600 font-semibold hover:text-blue-800 transition-colors">
            Se connecter
        </a>
    </p>
</div>
@endsection
