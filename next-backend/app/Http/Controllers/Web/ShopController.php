<?php

namespace App\Http\Controllers\Web;

use App\Http\Controllers\Controller;
use App\Models\Equipment;
use App\Models\EquipmentOrder;
use App\Models\Order;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;

class ShopController extends Controller
{
    public function index()
    {
        $equipments = Equipment::latest()->get();

        return view('apprenant.shop.index', compact('equipments'));
    }

    public function checkout()
    {
        $kkiapayKey = env('KKIAPAY_PUBLIC_KEY', '');

        return view('apprenant.shop.checkout', compact('kkiapayKey'));
    }

    public function checkoutConfirm(Request $request)
    {
        $request->validate([
            'transaction_id' => 'required|string',
            'items'          => 'required|string', // JSON
            'total'          => 'required|numeric|min:1',
        ]);

        $items = json_decode($request->items, true);

        if (empty($items)) {
            return back()->with('error', 'Panier vide. Impossible de finaliser la commande.');
        }

        $user = auth()->user();

        DB::beginTransaction();
        try {
            $order = Order::create([
                'student_id'   => $user->id,
                'sum'          => $request->total,
                'order_status' => 'pending',
            ]);

            foreach ($items as $item) {
                EquipmentOrder::create([
                    'order_id'     => $order->id,
                    'equipment_id' => $item['id'],
                    'quantity'     => (int) ($item['quantity'] ?? 1),
                ]);
            }

            // Génération facture PDF
            try {
                $order->load('equipment_orders.equipment', 'student');
                $invoicePath = 'factures/facture_' . $order->id . '_' . time() . '.pdf';
                $pdf = \Barryvdh\DomPDF\Facade\Pdf::loadView('invoices.equipment_invoice', [
                    'order' => $order,
                    'items' => $items,
                ]);
                Storage::disk('public')->put($invoicePath, $pdf->output());
                $order->update(['path_facture' => $invoicePath]);
            } catch (\Throwable $e) {
                // La facture est optionnelle — ne pas bloquer la commande
                \Log::warning('Invoice generation failed: ' . $e->getMessage());
            }

            DB::commit();
        } catch (\Throwable $e) {
            DB::rollBack();
            \Log::error('Order creation failed: ' . $e->getMessage());
            return back()->with('error', 'Erreur lors de la création de la commande. Veuillez réessayer.');
        }

        return redirect()->route('apprenant.orders.index')
            ->with('success', 'Commande #CMD-' . str_pad($order->id, 5, '0', STR_PAD_LEFT) . ' passée avec succès ! Votre facture est disponible.');
    }
}
