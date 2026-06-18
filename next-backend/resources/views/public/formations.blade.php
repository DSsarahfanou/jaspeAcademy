@extends('layouts.public')
@section('title', 'Formations')

@section('content')

{{-- Header --}}
<section class="bg-gradient-to-r from-blue-900 to-blue-700 py-16">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 class="text-3xl md:text-4xl font-bold text-white mb-3">Nos formations</h1>
        <p class="text-blue-200 text-lg max-w-xl mx-auto">Découvrez l'ensemble de notre catalogue de formations professionnelles.</p>
    </div>
</section>

<section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">

    @if($formations->isEmpty())
        <div class="text-center py-24">
            <i class="fas fa-book-open text-6xl text-gray-200 mb-5"></i>
            <p class="text-gray-500 text-lg">Aucune formation disponible pour le moment.</p>
            <a href="{{ route('web.auth.register') }}"
               class="inline-block mt-5 px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-colors">
                Être notifié à l'ouverture
            </a>
        </div>
    @else
        <p class="text-sm text-gray-400 mb-7">{{ $formations->count() }} formation(s) disponible(s)</p>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
            @foreach($formations as $f)
            <a href="{{ route('public.formations.show', $f->id) }}"
               class="group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl overflow-hidden transition-all hover:-translate-y-1.5">

                {{-- Cover --}}
                <div class="relative h-44 bg-gradient-to-br from-blue-100 to-blue-50 overflow-hidden">
                    @if($f->picture)
                        <img src="{{ asset('storage/' . $f->picture) }}" alt="{{ $f->name }}"
                             class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300">
                    @else
                        <div class="flex items-center justify-center h-full">
                            <i class="fas fa-graduation-cap text-5xl text-blue-300"></i>
                        </div>
                    @endif
                    <div class="absolute top-3 right-3 bg-white/90 backdrop-blur-sm font-bold text-blue-700 text-sm px-3 py-1 rounded-full shadow">
                        {{ $f->price == 0 ? 'Gratuit' : number_format($f->price, 0, ',', ' ') . ' FCFA' }}
                    </div>
                </div>

                <div class="p-5">
                    <h3 class="font-bold text-gray-800 text-base mb-1.5 line-clamp-1 group-hover:text-blue-700 transition-colors">
                        {{ $f->name }}
                    </h3>

                    @if($f->teachers)
                        <p class="text-xs text-gray-500 flex items-center gap-1.5 mb-2">
                            <span class="w-5 h-5 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                                <i class="fas fa-user text-purple-500" style="font-size:9px"></i>
                            </span>
                            {{ $f->teachers->name }} {{ $f->teachers->surname }}
                        </p>
                    @endif

                    <p class="text-xs text-gray-400 line-clamp-2 mb-4 leading-relaxed">
                        {{ $f->formation_details ?: 'Formation professionnelle de qualité.' }}
                    </p>

                    <div class="flex items-center justify-between text-xs">
                        <span class="text-gray-400"><i class="fas fa-layer-group mr-1 text-blue-400"></i>{{ $f->modules->count() }} modules</span>
                        <span class="text-gray-400"><i class="fas fa-users mr-1 text-blue-400"></i>{{ $f->students_count }} inscrits</span>
                    </div>

                    <div class="mt-4 flex items-center gap-1.5 text-blue-600 text-xs font-semibold group-hover:gap-2.5 transition-all">
                        Voir la formation <i class="fas fa-arrow-right text-xs"></i>
                    </div>
                </div>
            </a>
            @endforeach
        </div>
    @endif
</section>
@endsection
