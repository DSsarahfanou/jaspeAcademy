@extends('layouts.master')
@section('title', 'Dashboard Admin')

@section('breadcrumb')
    <x-breadcrumb :items="[['label' => 'Dashboard Admin']]" />
@endsection

@section('content')
<div class="space-y-6">

    {{-- Bannière --}}
    <div class="relative bg-gradient-to-r from-blue-900 via-blue-800 to-blue-600 rounded-2xl p-6 overflow-hidden shadow-lg">
        <div class="absolute top-0 right-0 w-80 h-80 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>
        <div class="relative flex items-center justify-between">
            <div>
                <p class="text-blue-200 text-sm font-medium">Administration</p>
                <h1 class="text-2xl font-bold text-white mt-0.5">
                    {{ auth()->user()->name }} {{ auth()->user()->surname }}
                </h1>
                <p class="text-blue-200 text-sm mt-1">
                    {{ now()->locale('fr')->isoFormat('dddd D MMMM YYYY') }}
                </p>
            </div>
            <div class="hidden md:flex w-20 h-20 bg-white/15 rounded-2xl items-center justify-center">
                <i class="fas fa-shield-alt text-4xl text-white/70"></i>
            </div>
        </div>
    </div>

    {{-- Stats --}}
    <div class="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        <x-card-stat title="Formations"    :value="$stats['formations']"  icon="fas fa-book-open"       color="blue"   :link="route('admin.formations.index')" />
        <x-card-stat title="Utilisateurs"  :value="$stats['users']"       icon="fas fa-users"            color="indigo" :link="route('admin.accounts.index')" />
        <x-card-stat title="Apprenants"    :value="$stats['students']"    icon="fas fa-user-graduate"    color="green"  />
        <x-card-stat title="Enseignants"   :value="$stats['teachers']"    icon="fas fa-chalkboard-teacher" color="purple" :link="route('admin.teachers.index')" />
        <x-card-stat title="Commandes"     :value="$stats['orders']"      icon="fas fa-shopping-cart"    color="orange" :link="route('admin.orders.index')" />
        <x-card-stat title="Équipements"   :value="$stats['equipments']"  icon="fas fa-box-open"         color="red"    :link="route('admin.equipments.index')" />
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {{-- Dernières commandes --}}
        <div class="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div class="flex items-center justify-between px-5 py-4 border-b border-gray-100">
                <h2 class="font-semibold text-gray-800 flex items-center gap-2">
                    <i class="fas fa-shopping-cart text-blue-500"></i> Dernières commandes
                </h2>
                <a href="{{ route('admin.orders.index') }}" class="text-xs text-blue-600 font-medium hover:text-blue-800">
                    Voir tout →
                </a>
            </div>
            @if($recentOrders->isEmpty())
                <div class="py-10 text-center text-gray-400 text-sm">Aucune commande.</div>
            @else
                <div class="divide-y divide-gray-50">
                    @foreach($recentOrders as $order)
                    <div class="flex items-center gap-4 px-5 py-3.5">
                        <div class="w-9 h-9 bg-orange-100 rounded-xl flex items-center justify-center flex-shrink-0">
                            <i class="fas fa-shopping-cart text-orange-500 text-sm"></i>
                        </div>
                        <div class="flex-1 min-w-0">
                            <p class="text-sm font-semibold text-gray-800">
                                {{ $order->student?->name }} {{ $order->student?->surname }}
                            </p>
                            <p class="text-xs text-gray-400">{{ $order->created_at->locale('fr')->isoFormat('D MMM YYYY') }}</p>
                        </div>
                        <div class="text-right">
                            <p class="text-sm font-bold text-gray-800">{{ number_format($order->sum, 0, ',', ' ') }} FCFA</p>
                            @php $st = ['pending' => 'bg-yellow-100 text-yellow-700', 'completed' => 'bg-green-100 text-green-700', 'cancelled' => 'bg-red-100 text-red-600']; @endphp
                            <span class="text-xs font-semibold px-2 py-0.5 rounded-full {{ $st[$order->order_status] ?? 'bg-gray-100 text-gray-600' }}">
                                {{ $order->order_status }}
                            </span>
                        </div>
                    </div>
                    @endforeach
                </div>
            @endif
        </div>

        {{-- Derniers inscrits --}}
        <div class="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div class="flex items-center justify-between px-5 py-4 border-b border-gray-100">
                <h2 class="font-semibold text-gray-800 flex items-center gap-2">
                    <i class="fas fa-user-plus text-blue-500"></i> Nouveaux utilisateurs
                </h2>
                <a href="{{ route('admin.accounts.index') }}" class="text-xs text-blue-600 font-medium hover:text-blue-800">
                    Voir tout →
                </a>
            </div>
            <div class="divide-y divide-gray-50">
                @foreach($recentUsers as $usr)
                <div class="flex items-center gap-4 px-5 py-3.5">
                    <div class="w-9 h-9 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 overflow-hidden">
                        @if($usr->picture)
                            <img src="{{ asset('storage/' . $usr->picture) }}" class="w-full h-full object-cover">
                        @else
                            <span class="text-blue-600 font-bold text-sm">{{ strtoupper(substr($usr->name, 0, 1)) }}</span>
                        @endif
                    </div>
                    <div class="flex-1 min-w-0">
                        <p class="text-sm font-semibold text-gray-800">{{ $usr->name }} {{ $usr->surname }}</p>
                        <p class="text-xs text-gray-400">{{ $usr->email }}</p>
                    </div>
                    @php $roleCls = ['admin' => 'bg-red-100 text-red-700', 'teacher' => 'bg-purple-100 text-purple-700', 'student' => 'bg-blue-100 text-blue-700']; @endphp
                    <span class="text-xs font-semibold px-2 py-0.5 rounded-full {{ $roleCls[$usr->role] ?? 'bg-gray-100 text-gray-600' }}">
                        {{ ucfirst($usr->role) }}
                    </span>
                </div>
                @endforeach
            </div>
        </div>
    </div>

    {{-- Accès rapides --}}
    <div class="grid grid-cols-2 sm:grid-cols-4 gap-4">
        @php
            $quickLinks = [
                ['icon' => 'fa-book-open', 'label' => 'Formations', 'route' => 'admin.formations.index', 'color' => 'blue'],
                ['icon' => 'fa-chalkboard-teacher', 'label' => 'Enseignants', 'route' => 'admin.teachers.index', 'color' => 'purple'],
                ['icon' => 'fa-file-signature', 'label' => 'Demandes stage', 'route' => 'admin.internship.index', 'color' => 'orange'],
                ['icon' => 'fa-users-cog', 'label' => 'Comptes', 'route' => 'admin.accounts.index', 'color' => 'indigo'],
            ];
            $cls = ['blue' => 'bg-blue-50 text-blue-600 hover:bg-blue-100', 'purple' => 'bg-purple-50 text-purple-600 hover:bg-purple-100', 'orange' => 'bg-orange-50 text-orange-600 hover:bg-orange-100', 'indigo' => 'bg-indigo-50 text-indigo-600 hover:bg-indigo-100'];
        @endphp
        @foreach($quickLinks as $ql)
        <a href="{{ route($ql['route']) }}"
           class="flex flex-col items-center justify-center gap-2 p-5 rounded-2xl {{ $cls[$ql['color']] }} transition-colors text-center">
            <i class="fas {{ $ql['icon'] }} text-2xl"></i>
            <span class="text-sm font-semibold">{{ $ql['label'] }}</span>
        </a>
        @endforeach
    </div>
</div>
@endsection
