@extends('layouts.master')
@section('title', 'Commandes')

@section('breadcrumb')
    <x-breadcrumb :items="[
        ['label' => 'Dashboard', 'url' => route('admin.dashboard')],
        ['label' => 'Commandes']
    ]" />
@endsection

@section('content')
<div class="space-y-5" x-data="{ search: '' }">
    <div>
        <h1 class="text-xl font-bold text-gray-800">Toutes les Commandes</h1>
        <p class="text-sm text-gray-500">{{ $orders->count() }} commande(s)</p>
    </div>

    <div class="relative max-w-sm">
        <i class="fas fa-search absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-sm pointer-events-none"></i>
        <input x-model="search" placeholder="Rechercher…"
               class="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition-all">
    </div>

    <div class="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div class="overflow-x-auto">
            <table class="w-full text-sm">
                <thead>
                    <tr class="bg-gray-50 border-b border-gray-100">
                        <th class="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase">Réf.</th>
                        <th class="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase">Apprenant</th>
                        <th class="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase hidden md:table-cell">Date</th>
                        <th class="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase">Montant</th>
                        <th class="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase">Statut</th>
                        <th class="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase hidden sm:table-cell">Facture</th>
                    </tr>
                </thead>
                <tbody class="divide-y divide-gray-50">
                    @forelse($orders as $order)
                    <tr x-show="!search || '{{ strtolower(optional($order->student)->name . ' ' . optional($order->student)->surname) }}'.includes(search.toLowerCase())"
                        class="hover:bg-gray-50 transition-colors">
                        <td class="px-5 py-4">
                            <span class="font-mono text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
                                #{{ str_pad($order->id, 6, '0', STR_PAD_LEFT) }}
                            </span>
                        </td>
                        <td class="px-5 py-4">
                            <p class="font-semibold text-gray-800 text-sm">
                                {{ $order->student?->name }} {{ $order->student?->surname }}
                            </p>
                            <p class="text-xs text-gray-400">{{ $order->student?->email }}</p>
                        </td>
                        <td class="px-5 py-4 hidden md:table-cell text-gray-600 text-xs">
                            {{ $order->created_at->locale('fr')->isoFormat('D MMM YYYY') }}
                        </td>
                        <td class="px-5 py-4 font-bold text-gray-800">
                            {{ number_format($order->sum, 0, ',', ' ') }} FCFA
                        </td>
                        <td class="px-5 py-4">
                            @php $cls = ['pending' => 'bg-yellow-100 text-yellow-700', 'completed' => 'bg-green-100 text-green-700', 'cancelled' => 'bg-red-100 text-red-600']; @endphp
                            <span class="text-xs font-semibold px-2.5 py-1 rounded-full {{ $cls[$order->order_status] ?? 'bg-gray-100 text-gray-600' }}">
                                {{ ucfirst($order->order_status) }}
                            </span>
                        </td>
                        <td class="px-5 py-4 hidden sm:table-cell">
                            @if($order->path_facture)
                                <a href="{{ asset('storage/' . $order->path_facture) }}" target="_blank"
                                   class="text-xs text-blue-600 font-semibold hover:text-blue-800">
                                    <i class="fas fa-file-pdf text-red-400 mr-1"></i>Facture
                                </a>
                            @else
                                <span class="text-xs text-gray-400">—</span>
                            @endif
                        </td>
                    </tr>
                    @empty
                    <tr>
                        <td colspan="6" class="px-5 py-12 text-center text-gray-400 text-sm">
                            <i class="fas fa-inbox text-3xl text-gray-200 mb-2 block"></i>
                            Aucune commande.
                        </td>
                    </tr>
                    @endforelse
                </tbody>
            </table>
        </div>
    </div>
</div>
@endsection
