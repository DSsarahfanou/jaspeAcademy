<?php

namespace App\Http\Controllers;

use App\Models\Formation;
use Illuminate\Http\Request;

class FormationController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $formations = Formation::with(['students', 'teachers', 'equipments'])->get();

        return response()->json([
            'status' => 'success',
            'data' => $formations
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'prerequisites' => 'required|string',
            'price' => 'required|numeric',
            'formation_details' => 'required|string',
        ]);

        $formation = Formation::create($validated);

        return response()->json([
            'status' => 'success',
            'message' => 'Formation créée avec succès',
            'data' => $formation
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $formation = Formation::with(['students', 'teachers', 'equipments'])->find($id);

        if (!$formation) {
            return response()->json([
                'status' => 'error',
                'message' => 'Formation non trouvée'
            ], 404);
        }

        return response()->json([
            'status' => 'success',
            'data' => $formation
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $formation = Formation::find($id);

        if (!$formation) {
            return response()->json([
                'status' => 'error',
                'message' => 'Formation non trouvée'
            ], 404);
        }

        $validated = $request->validate([
            'prerequisites' => 'sometimes|string',
            'price' => 'sometimes|numeric',
            'formation_details' => 'sometimes|string',
        ]);

        $formation->update($validated);

        return response()->json([
            'status' => 'success',
            'message' => 'Formation mise à jour avec succès',
            'data' => $formation
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $formation = Formation::find($id);

        if (!$formation) {
            return response()->json([
                'status' => 'error',
                'message' => 'Formation non trouvée'
            ], 404);
        }

        $formation->delete();

        return response()->json([
            'status' => 'success',
            'message' => 'Formation supprimée avec succès'
        ]);
    }
}
