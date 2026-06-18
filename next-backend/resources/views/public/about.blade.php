@extends('layouts.public')
@section('title', 'À propos')

@section('content')

{{-- Hero --}}
<section class="bg-gradient-to-r from-blue-900 to-blue-700 py-20">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 class="text-3xl md:text-4xl font-bold text-white mb-4">À propos de JaspeAcademy</h1>
        <p class="text-blue-200 text-lg max-w-2xl mx-auto">
            Une plateforme de formation professionnelle en ligne dédiée au développement des compétences.
        </p>
    </div>
</section>

<section class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">

    {{-- Mission --}}
    <div class="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        <div>
            <span class="text-xs font-bold text-blue-600 uppercase tracking-wider">Notre mission</span>
            <h2 class="text-2xl font-bold text-gray-900 mt-2 mb-4">Rendre la formation accessible à tous</h2>
            <p class="text-gray-600 leading-relaxed mb-4">
                JaspeAcademy est une plateforme d'apprentissage en ligne qui connecte des formateurs experts avec des apprenants motivés.
                Notre objectif est de rendre la formation professionnelle accessible, flexible et de haute qualité.
            </p>
            <p class="text-gray-600 leading-relaxed">
                Nous proposons des formations dans de nombreux domaines, dispensées par des professionnels certifiés,
                avec des sessions en direct et des attestations officielles.
            </p>
        </div>
        <div class="flex justify-center">
            <div class="w-56 h-56 bg-blue-100 rounded-3xl flex items-center justify-center">
                <i class="fas fa-graduation-cap text-7xl text-blue-600"></i>
            </div>
        </div>
    </div>

    {{-- Valeurs --}}
    <div>
        <div class="text-center mb-10">
            <span class="text-xs font-bold text-blue-600 uppercase tracking-wider">Nos valeurs</span>
            <h2 class="text-2xl font-bold text-gray-900 mt-2">Ce qui nous guide</h2>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-6">
            @foreach([
                ['fas fa-heart','text-red-500','bg-red-50','Excellence','Nous nous engageons à offrir des formations de la plus haute qualité.'],
                ['fas fa-hands-helping','text-green-600','bg-green-50','Accompagnement','Nos formateurs sont disponibles pour guider chaque apprenant.'],
                ['fas fa-lightbulb','text-yellow-500','bg-yellow-50','Innovation','Nous intégrons les dernières technologies pour enrichir l\'apprentissage.'],
            ] as [$icon, $iconCls, $bgCls, $title, $desc])
            <div class="text-center p-6 rounded-2xl {{ $bgCls }} border border-gray-100">
                <div class="w-14 h-14 bg-white rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-sm">
                    <i class="{{ $icon }} text-2xl {{ $iconCls }}"></i>
                </div>
                <h3 class="font-bold text-gray-800 mb-2">{{ $title }}</h3>
                <p class="text-sm text-gray-600 leading-relaxed">{{ $desc }}</p>
            </div>
            @endforeach
        </div>
    </div>

    {{-- Chiffres --}}
    <div class="bg-gradient-to-r from-blue-700 to-blue-500 rounded-3xl p-8 md:p-10">
        <div class="text-center mb-8">
            <h2 class="text-2xl font-bold text-white">JaspeAcademy en chiffres</h2>
        </div>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            @foreach([['fas fa-book-open','Formations','disponibles'],['fas fa-users','Apprenants','inscrits'],['fas fa-chalkboard-teacher','Formateurs','experts'],['fas fa-award','Attestations','délivrées']] as $item)
            <div>
                <i class="{{ $item[0] }} text-3xl text-blue-200 mb-2"></i>
                <p class="text-white font-bold text-sm mt-1">{{ $item[1] }}</p>
                <p class="text-blue-200 text-xs">{{ $item[2] }}</p>
            </div>
            @endforeach
        </div>
    </div>

    {{-- CTA --}}
    <div class="text-center">
        <h2 class="text-2xl font-bold text-gray-900 mb-3">Rejoignez JaspeAcademy</h2>
        <p class="text-gray-500 mb-7">Commencez votre parcours d'apprentissage dès aujourd'hui.</p>
        <div class="flex flex-col sm:flex-row gap-3 justify-center">
            <a href="{{ route('web.auth.register') }}"
               class="px-8 py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-sm transition-colors">
                <i class="fas fa-user-plus mr-2"></i> Créer un compte
            </a>
            <a href="{{ route('public.formations') }}"
               class="px-8 py-3.5 border-2 border-blue-600 text-blue-600 hover:bg-blue-50 font-semibold rounded-xl transition-colors">
                Voir les formations
            </a>
        </div>
    </div>

</section>
@endsection
