<?php

namespace App\Http\Controllers;

use App\Models\Equipment;
use Illuminate\Http\Request;

class EquipmentController extends Controller
{
    public function index()
    {
        return response()->json([
            'data' => Equipment::all(),
        ]);
    }
    
    public function show(Equipment $equipment)
    {
        return $equipment->load('formations');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'quantity' => 'required|integer|min:0',
            'price' => 'required|numeric|min:0',
            'status' => 'required|boolean',
            'description' => 'nullable|string|max:500',
            'details' => 'nullable|string',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048', // max 2MB
        ]);
    
        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('equipments', 'public');
            $validated['image'] = $path;
        }
    
        $equipment = Equipment::create($validated);
        
        return response()->json([
            'message' => 'Équipement créé avec succès',
            'data' => $equipment->load('formations')
        ], 201);
    }

    public function update(Request $request, Equipment $equipment)
    {
        $validated = $request->validate([
            'name' => 'sometimes|required|string|max:255',
            'quantity' => 'sometimes|required|integer|min:0',
            'price' => 'sometimes|required|numeric|min:0',
            'status' => 'sometimes|required|boolean',
            'description' => 'nullable|string|max:500',
            'details' => 'nullable|string',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        // Gérer l'upload d'image
        if ($request->hasFile('image')) {
            // Supprimer l'ancienne image si elle existe
            if ($equipment->image && Storage::disk('public')->exists($equipment->image)) {
                Storage::disk('public')->delete($equipment->image);
            }
            
            // Stocker la nouvelle image
            $path = $request->file('image')->store('equipments', 'public');
            $validated['image'] = $path;
        }

        $equipment->update($validated);

        return response()->json([
            'message' => 'Équipement mis à jour avec succès',
            'data' => $equipment->load('formations')
        ]);
    }
    

    public function destroy(Equipment $equipment)
    {
        $equipment->delete();

        return response()->noContent();
    }
}


