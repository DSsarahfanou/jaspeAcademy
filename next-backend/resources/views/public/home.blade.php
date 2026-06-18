@extends('layouts.public')
@section('title', 'Accueil')

@section('content')

{{-- ═══ HERO ═══ --}}
<section class="relative bg-gradient-to-br from-blue-900 via-blue-800 to-blue-600 overflow-hidden">
    <div class="absolute inset-0 opacity-10">
        <div class="absolute top-0 right-0 w-96 h-96 bg-white rounded-full -translate-y-1/2 translate-x-1/3"></div>
        <div class="absolute bottom-0 left-0 w-64 h-64 bg-blue-300 rounded-full translate-y-1/3 -translate-x-1/4"></div>
    </div>
    <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
                <span class="inline-block bg-blue-500/30 text-blue-100 text-xs font-semibold px-3 py-1.5 rounded-full mb-4">
                    <i class="fas fa-graduation-cap mr-1"></i> Plateforme e-learning
                </span>
                <h1 class="text-4xl md:text-5xl font-extrabold text-white leading-tight mb-5">
                    Votre <span class="text-blue-300">apprentissage</span><br>personnalisé commence ici
                </h1>
                <p class="text-blue-100 text-lg leading-relaxed mb-8">
                    Des formations en ligne adaptées à votre rythme pour développer vos compétences professionnelles dans un environnement bienveillant.
                </p>
                <div class="flex flex-col sm:flex-row gap-3">
                    <a href="{{ route('web.auth.register') }}"
                       class="flex items-center justify-center gap-2 px-7 py-3.5 bg-white hover:bg-blue-50 text-blue-700 font-bold rounded-xl shadow-lg transition-all">
                        <i class="fas fa-rocket"></i> Commencer maintenant
                    </a>
                    <a href="{{ route('public.formations') }}"
                       class="flex items-center justify-center gap-2 px-7 py-3.5 bg-white/15 hover:bg-white/25 text-white font-semibold rounded-xl border border-white/20 transition-all">
                        Explorer les cours
                    </a>
                </div>
            </div>
            <div class="hidden md:flex items-center justify-center">
                <div class="grid grid-cols-2 gap-4 w-full max-w-xs">
                    @php $colors = ['bg-blue-500','bg-indigo-500','bg-purple-500','bg-sky-500']; @endphp
                    @foreach([['fas fa-book-open','Formations','+'.$statsCount['formations'],'bg-blue-500'],['fas fa-users','Apprenants','+'.$statsCount['students'],'bg-indigo-500'],['fas fa-chalkboard-teacher','Formateurs','+'.$statsCount['teachers'],'bg-purple-500'],['fas fa-award','Certifications','100%','bg-sky-500']] as $stat)
                    <div class="bg-white/15 backdrop-blur-sm rounded-2xl p-5 text-center">
                        <i class="{{ $stat[0] }} text-2xl text-white mb-2"></i>
                        <p class="text-2xl font-extrabold text-white">{{ $stat[2] }}</p>
                        <p class="text-blue-200 text-xs mt-0.5">{{ $stat[1] }}</p>
                    </div>
                    @endforeach
                </div>
            </div>
        </div>
    </div>
</section>

{{-- ═══ FEATURES ═══ --}}
<section class="py-20 bg-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-14">
            <h2 class="text-3xl font-bold text-gray-900">Une plateforme conçue pour faciliter l'apprentissage</h2>
            <p class="text-gray-500 mt-3 max-w-xl mx-auto">Des outils intuitifs et des fonctionnalités innovantes pour une expérience d'apprentissage enrichissante.</p>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
            @foreach([
                ['fas fa-lightbulb','bg-blue-50 text-blue-600','Parcours personnalisé','Apprentissage adapté à votre niveau et vos objectifs avec des recommandations sur mesure.'],
                ['fas fa-video','bg-indigo-50 text-indigo-600','Visioconférences','Sessions en direct avec vos formateurs via notre système de réunion intégré.'],
                ['fas fa-award','bg-purple-50 text-purple-600','Certifications','Obtenez une attestation officielle à la fin de chaque formation réussie.'],
            ] as [$icon, $cls, $title, $desc])
            <div class="p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                <div class="w-14 h-14 {{ $cls }} rounded-2xl flex items-center justify-center mb-5">
                    <i class="{{ $icon }} text-2xl"></i>
                </div>
                <h3 class="text-lg font-bold text-gray-800 mb-2">{{ $title }}</h3>
                <p class="text-gray-500 text-sm leading-relaxed">{{ $desc }}</p>
            </div>
            @endforeach
        </div>
    </div>
</section>

{{-- ═══ FORMATIONS VEDETTES ═══ --}}
@if($featured->isNotEmpty())
<section class="py-20 bg-gray-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex flex-col sm:flex-row sm:items-center justify-between mb-10 gap-4">
            <div>
                <h2 class="text-3xl font-bold text-gray-900">Nos formations</h2>
                <p class="text-gray-500 mt-1">Découvrez nos formations les plus récentes</p>
            </div>
            <a href="{{ route('public.formations') }}"
               class="flex items-center gap-1.5 text-blue-600 hover:text-blue-800 font-semibold text-sm transition-colors">
                Voir toutes les formations <i class="fas fa-arrow-right text-xs"></i>
            </a>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            @foreach($featured as $f)
            <a href="{{ route('public.formations.show', $f->id) }}"
               class="group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg overflow-hidden transition-all hover:-translate-y-1">
                <div class="relative h-40 bg-gradient-to-br from-blue-100 to-blue-50 overflow-hidden">
                    @if($f->picture)
                        <img src="{{ asset('storage/' . $f->picture) }}" alt="{{ $f->name }}"
                             class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300">
                    @else
                        <div class="flex items-center justify-center h-full">
                            <i class="fas fa-graduation-cap text-5xl text-blue-300"></i>
                        </div>
                    @endif
                    <div class="absolute top-3 right-3 bg-white/90 backdrop-blur-sm font-bold text-blue-700 text-sm px-3 py-1 rounded-full shadow-sm">
                        {{ $f->price == 0 ? 'Gratuit' : number_format($f->price, 0, ',', ' ') . ' F' }}
                    </div>
                </div>
                <div class="p-5">
                    <h3 class="font-bold text-gray-800 mb-1 line-clamp-1">{{ $f->name }}</h3>
                    @if($f->teachers)
                        <p class="text-xs text-gray-500 mb-2 flex items-center gap-1">
                            <i class="fas fa-user-tie text-blue-400"></i>
                            {{ $f->teachers->name }} {{ $f->teachers->surname }}
                        </p>
                    @endif
                    <p class="text-xs text-gray-400 line-clamp-2 mb-3">{{ $f->formation_details }}</p>
                    <div class="flex items-center justify-between text-xs text-gray-400">
                        <span><i class="fas fa-layer-group mr-1 text-blue-400"></i>{{ $f->modules->count() }} modules</span>
                        <span><i class="fas fa-users mr-1 text-blue-400"></i>{{ $f->students_count }} inscrits</span>
                    </div>
                </div>
            </a>
            @endforeach
        </div>
    </div>
</section>
@endif

{{-- ═══ CTA ═══ --}}
<section class="py-20 bg-gradient-to-r from-blue-700 to-blue-500">
    <div class="max-w-3xl mx-auto px-4 text-center">
        <h2 class="text-3xl font-bold text-white mb-4">Prêt à commencer votre parcours ?</h2>
        <p class="text-blue-100 text-lg mb-8">Rejoignez notre communauté d'apprenants et atteignez vos objectifs professionnels dès aujourd'hui.</p>
        <div class="flex flex-col sm:flex-row gap-3 justify-center">
            <a href="{{ route('web.auth.register') }}"
               class="px-8 py-4 bg-white text-blue-700 font-bold rounded-xl shadow-lg hover:bg-blue-50 transition-colors">
                <i class="fas fa-user-plus mr-2"></i> Rejoindre maintenant
            </a>
            <a href="{{ route('public.formations') }}"
               class="px-8 py-4 bg-white/20 text-white font-semibold rounded-xl border border-white/30 hover:bg-white/30 transition-colors">
                Voir les formations
            </a>
        </div>
    </div>
</section>

@endsection
