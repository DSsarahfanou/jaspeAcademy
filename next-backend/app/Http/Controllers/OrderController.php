<?php

namespace App\Http\Controllers;

use App\Models\Order;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Barryvdh\DomPDF\Facade\Pdf; // Si tu utilises DomPDF via la façade
use App\Models\EquipmentOrder;
use Illuminate\Support\Facades\Auth;



class OrderController extends Controller
{
    public function index()
    {
        $orders = Order::with(['student', 'equipment_orders.equipment'])
        ->latest()
        ->get()
        ->map(function ($order) {
            $order->order_number = 'CMD-' . str_pad($order->id, 6, '0', STR_PAD_LEFT);
            return $order;
        });


        return response()->json([
            'status' => 'success',
            'data' => $orders
        ]);
    }

    public function show(string $id)
    {
        $order = Order::find($id);

        if (!$order) {
            return response()->json([
                'status' => 'error',
                'message' => 'Commande non trouvée'
            ], 404);
        }

        return response()->json([
            'status' => 'success',
            'data' => $order
        ]);
    }

    public function showOrderStudent()
    {
        $student_id = Auth::id();

        // Récupère toutes les commandes avec les détails (EquipmentOrder)
        $orders = Order::with('equipment_orders.equipment')
            ->where('student_id', $student_id)
            ->latest()
            ->get()
            ->map(function ($order) {
            // Générer un numéro de commande formaté
            $order->order_number = 'CMD-' . $order->created_at->format('Ymd') . '-' . str_pad($order->id, 4, '0', STR_PAD_LEFT);
            return $order;
        });

        return response()->json([
            'status' => 'success',
            'data' => $orders
        ]);
    }



    // public function store(Request $request)
    // {
    //     $validated = $request->validate([
    //         'sum' => 'required|numeric',
    //         'path_facture' => 'nullable|string',
    //         'order_status' => 'required|string|in:pending,paid,cancelled'
    //     ]);

    //     $order = Order::create($validated);

    //     return response()->json([
    //         'status' => 'success',
    //         'message' => 'Commande créée avec succès',
    //         'data' => $order
    //     ], 201);
    // }



    public function update($id)
    {
        \Log::debug('Bypass update', ['id' => $id]);
        $order = Order::find($id);
        $order->update(['order_status' => true]);
        return response()->json(['status' => 'success']);
    }

    public function destroy(string $id)
    {
        $order = Order::find($id);

        if (!$order) {
            return response()->json([
                'status' => 'error',
                'message' => 'Commande non trouvée'
            ], 404);
        }

        $order->delete();

        return response()->json([
            'status' => 'success',
            'message' => 'Commande supprimée avec succès'
        ]);
    }



    public function store(Request $request)
    {
        $validated = $request->validate([
            'sum' => 'required|numeric',
            'student_id' => 'required|exists:users,id',
            'items' => 'required|array',
            'items.*.equipment_id' => 'required|exists:equipments,id',
            'items.*.quantity' => 'required|integer|min:1',
        ]);

        $items = $validated['items'] ?? [];


    

        
        // Démarrer une transaction pour s'assurer que tout est enregistré ou rien ne l'est
        DB::beginTransaction();
        try {
            // Créer la commande principale
            $order = Order::create([
                'student_id'=> $validated['student_id'],
                'sum' => $validated['sum'],
                'order_status' => false,
            ]); 
            // $order->load('equipment_orders.equipment', 'student');


            // Enregistrer les articles de la commande
            foreach ($items as $item) {
                EquipmentOrder::create([
                    'order_id' => $order->id,
                    'equipment_id' => $item['equipment_id'],
                    'quantity' => $item['quantity'],
                ]);
            }

            // Charger les relations APRÈS avoir inséré les items
            $order->load('equipment_orders.equipment', 'student');
            // Générer le nom de fichier unique pour la facture
            $invoiceFileName = 'facture_' . $order->id . '_' . time() . '.pdf';
            $invoicePath = 'factures/' . $invoiceFileName;
            // Charger la vue Blade pour la facture avec les données de la commande
            $pdf = Pdf::loadView('invoices.equipment_invoice', [
                'order' => $order,
                'items' => $items
            ]);
            // Sauvegarder le PDF généré dans le répertoire public/factures
            Storage::disk('public')->put($invoicePath, $pdf->output());
            // Mettre à jour la commande avec le chemin de la facture
            $order->update(['path_facture' => $invoicePath]);
            DB::commit();
            return response()->json([
                'status' => 'success',
                'message' => 'Commande créée et facture générée avec succès',
                'data' => [
                    'order' => $order,
                    'invoice_url' => asset('storage/' . $invoicePath)
                ]
            ], 201);

        } 
        catch (\Exception $e) {
            DB::rollBack();
            \Log::error('Order store failed', [
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);
            return response()->json([
                'status' => 'error',
                'message' => 'Erreur lors de la création',
                'error_message' => $e->getMessage()
            ], 500);
        }

    }
}
