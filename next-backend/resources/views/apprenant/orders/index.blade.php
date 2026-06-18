@extends('layouts.master')
@section('title', 'Mes Commandes')

@section('breadcrumb')
    <x-breadcrumb :items="[
        ['label' => 'Dashboard', 'url' => route('apprenant.dashboard')],
        ['label' => 'Commandes']
    ]" />
@endsection

@section('content')
<div class="space-y-5">
    <div>
        <h1 class="text-xl font-bold text-gray-800">Mes Commandes</h1>
        <p class="text-sm text-gray-500 mt-0.5">{{ $orders->count() }} commande(s) au total</p>
    </div>

    @if($orders->isEmpty())
        <div class="bg-white rounded-2xl border border-dashed border-gray-200 p-16 text-center">
            <i class="fas fa-shopping-bag text-5xl text-gray-200 mb-4"></i>
            <p class="text-gray-500 font-medium">Aucune commande pour l'instant</p>
        </div>
    @else
        <div class="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div class="overflow-x-auto">
                <table class="w-full text-sm">
                    <thead>
                        <tr class="bg-gray-50 border-b border-gray-100">
                            <th class="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase">Réf.</th>
                            <th class="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase">Date</th>
                            <th class="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase">Montant</th>
                            <th class="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase">Statut</th>
                            <th class="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase">Facture</th>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-gray-50">
                        @foreach($orders as $order)
                        <tr class="hover:bg-gray-50 transition-colors">
                            <td class="px-5 py-4">
                                <span class="font-mono text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
                                    #{{ str_pad($order->id, 6, '0', STR_PAD_LEFT) }}
                                </span>
                            </td>
                            <td class="px-5 py-4 text-gray-600">
                                {{ $order->created_at->locale('fr')->isoFormat('D MMM YYYY') }}
                            </td>
                            <td class="px-5 py-4 font-semibold text-gray-800">
                                {{ number_format($order->sum, 0, ',', ' ') }} FCFA
                            </td>
                            <td class="px-5 py-4">
                                @php
                                    $statusMap = [
                                        'pending'   => ['bg-yellow-100 text-yellow-700', 'En attente'],
                                        'completed' => ['bg-green-100 text-green-700',  'Payée'],
                                        'cancelled' => ['bg-red-100 text-red-600',      'Annulée'],
                                    ];
                                    [$cls, $lbl] = $statusMap[$order->order_status] ?? ['bg-gray-100 text-gray-600', $order->order_status];
                                @endphp
                                <span class="text-xs font-semibold px-2.5 py-1 rounded-full {{ $cls }}">
                                    {{ $lbl }}
                                </span>
                            </td>
                            <td class="px-5 py-4">
                                @if($order->path_facture)
                                    <a href="{{ asset('storage/' . $order->path_facture) }}" target="_blank"
                                       class="flex items-center gap-1.5 text-blue-600 hover:text-blue-800 text-xs font-semibold">
                                        <i class="fas fa-file-pdf text-red-400"></i> Télécharger
                                    </a>
                                @else
                                    <span class="text-xs text-gray-400">—</span>
                                @endif
                            </td>
                        </tr>
                        @endforeach
                    </tbody>
                </table>
            </div>
        </div>
    @endif
</div>
@endsection
