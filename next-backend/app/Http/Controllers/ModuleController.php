<?php

namespace App\Http\Controllers;

use App\Models\Module;
use Illuminate\Http\Request;

class ModuleController extends Controller
{
    public function index()
    {
        return response()->json([
            'status' => 'success',
            'data' => Module::all()
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
        ]);

        $module = Module::create($validated);

        return response()->json([
            'status' => 'success',
            'message' => 'Module créé avec succès',
            'data' => $module
        ], 201);
    }

    public function show(string $id)
    {
        $module = Module::find($id);

        if (!$module) {
            return response()->json([
                'status' => 'error',
                'message' => 'Module non trouvé'
            ], 404);
        }

        return response()->json([
            'status' => 'success',
            'data' => $module
        ]);
    }

    public function update(Request $request, string $id)
    {
        $module = Module::find($id);

        if (!$module) {
            return response()->json([
                'status' => 'error',
                'message' => 'Module non trouvé'
            ], 404);
        }

        $validated = $request->validate([
            'title' => 'sometimes|string|max:255',
            'description' => 'sometimes|string',
        ]);

        $module->update($validated);

        return response()->json([
            'status' => 'success',
            'message' => 'Module mis à jour avec succès',
            'data' => $module
        ]);
    }

    public function destroy(string $id)
    {
        $module = Module::find($id);

        if (!$module) {
            return response()->json([
                'status' => 'error',
                'message' => 'Module non trouvé'
            ], 404);
        }

        $module->delete();

        return response()->json([
            'status' => 'success',
            'message' => 'Module supprimé avec succès'
        ]);
    }
}
