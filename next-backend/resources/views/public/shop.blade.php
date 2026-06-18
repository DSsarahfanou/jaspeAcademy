@extends('layouts.public')
@section('title', 'Shop')

@section('content')

{{-- Header --}}
<section class="bg-gradient-to-r from-blue-900 to-blue-700 py-16">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 class="text-3xl md:text-4xl font-bold text-white mb-3">
            <i class="fas fa-box-open mr-3 text-blue-300"></i>Shop
        </h1>
        <p class="text-blue-200 text-lg max-w-xl mx-auto">Équipements et matériels pédagogiques pour vos formations.</p>
    </div>
</section>

<section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">

    @if($equipments->isEmpty())
        <div class="text-center py-24">
            <i class="fas fa-box-open text-6xl text-gray-200 mb-5"></i>
            <p class="text-gray-500 text-lg">Aucun article disponible pour le moment.</p>
        </div>
    @else
        <p class="text-sm text-gray-400 mb-7">{{ $equipments->count() }} article(s) disponible(s)</p>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            @foreach($equipments as $eq)
            <div class="group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl overflow-hidden transition-all hover:-translate-y-1">

                {{-- Image --}}
                <div class="relative h-44 bg-gradient-to-br from-gray-100 to-gray-50 overflow-hidden flex items-center justify-center">
                    @if(isset($eq->picture) && $eq->picture)
                        <img src="{{ asset('storage/' . $eq->picture) }}" alt="{{ $eq->name }}"
                             class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300">
                    @else
                        <i class="fas fa-box text-5xl text-gray-300"></i>
                    @endif
                    @if(isset($eq->status))
                    <div class="absolute top-3 left-3">
                        <span class="text-xs font-semibold px-2.5 py-1 rounded-full
                            {{ $eq->status === 'available' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-600' }}">
                            {{ $eq->status === 'available' ? 'Disponible' : 'Rupture' }}
                        </span>
                    </div>
                    @endif
                </div>

                <div class="p-5">
                    <h3 class="font-bold text-gray-800 mb-1 line-clamp-1">{{ $eq->name }}</h3>

                    @if($eq->description)
                        <p class="text-xs text-gray-400 line-clamp-2 mb-3">{{ $eq->description }}</p>
                    @endif

                    <div class="flex items-center justify-between mt-3">
                        <p class="text-lg font-extrabold text-blue-700">
                            {{ number_format($eq->price, 0, ',', ' ') }}
                            <span class="text-xs font-normal text-gray-400">FCFA</span>
                        </p>
                    </div>

                    <div class="mt-4 pt-4 border-t border-gray-100">
                        @auth
                            <p class="text-xs text-center text-gray-400">
                                <i class="fas fa-info-circle mr-1 text-blue-400"></i>
                                Commandez via votre dashboard
                            </p>
                        @else
                            <a href="{{ route('web.auth.register') }}"
                               class="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl
                                      bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold transition-colors">
                                <i class="fas fa-shopping-cart text-xs"></i> Commander
                            </a>
                        @endauth
                    </div>
                </div>
            </div>
            @endforeach
        </div>
    @endif
</section>
@endsection
