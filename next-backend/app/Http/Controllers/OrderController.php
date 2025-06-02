<?php

namespace App\Http\Controllers;

use App\Models\Order;
use Illuminate\Http\Request;

class OrderController extends Controller
{
    public function index()
    {
        $orders = Order::all();

        return response()->json([
            'status' => 'success',
            'data' => $orders
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'sum' => 'required|numeric',
            'path_facture' => 'nullable|string',
            'order_status' => 'required|string|in:pending,paid,cancelled'
        ]);

        $order = Order::create($validated);

        return response()->json([
            'status' => 'success',
            'message' => 'Commande créée avec succès',
            'data' => $order
        ], 201);
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

    public function update(Request $request, string $id)
    {
        $order = Order::find($id);

        if (!$order) {
            return response()->json([
                'status' => 'error',
                'message' => 'Commande non trouvée'
            ], 404);
        }

        $validated = $request->validate([
            'sum' => 'sometimes|numeric',
            'path_facture' => 'sometimes|string',
            'order_status' => 'sometimes|string|in:pending,paid,cancelled'
        ]);

        $order->update($validated);

        return response()->json([
            'status' => 'success',
            'message' => 'Commande mise à jour avec succès',
            'data' => $order
        ]);
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
}
