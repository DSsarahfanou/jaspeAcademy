@extends('layouts.public')
@section('title', 'Accès non autorisé')

@section('content')
<section class="min-h-[80vh] flex items-center justify-center px-4">
    <div class="text-center max-w-lg">
        <div class="w-24 h-24 bg-red-100 rounded-3xl flex items-center justify-center mx-auto mb-7">
            <i class="fas fa-lock text-4xl text-red-500"></i>
        </div>

        <h1 class="text-6xl font-extrabold text-gray-200 mb-2">403</h1>
        <h2 class="text-2xl font-bold text-gray-800 mb-3">Accès non autorisé</h2>
        <p class="text-gray-500 leading-relaxed mb-8">
            Vous n'avez pas les permissions nécessaires pour accéder à cette page.
            Veuillez vous connecter avec un compte approprié.
        </p>

        <div class="flex flex-col sm:flex-row gap-3 justify-center">
            <a href="{{ route('web.auth.login') }}"
               class="px-7 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-colors shadow-sm">
                <i class="fas fa-sign-in-alt mr-2"></i> Se connecter
            </a>
            <a href="{{ route('public.home') }}"
               class="px-7 py-3 border-2 border-gray-200 hover:border-blue-300 text-gray-700 hover:text-blue-700 font-semibold rounded-xl transition-colors">
                <i class="fas fa-home mr-2"></i> Accueil
            </a>
        </div>

        <p class="mt-6 text-xs text-gray-400">
            Si vous pensez qu'il s'agit d'une erreur, contactez l'administrateur.
        </p>
    </div>
</section>
@endsection
