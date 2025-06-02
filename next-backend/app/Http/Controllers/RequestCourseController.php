<?php

namespace App\Http\Controllers;

use App\Models\RequestCourse;
use Illuminate\Http\Request;

class RequestCourseController extends Controller
{
    public function index()
    {
        $requests = RequestCourse::all();

        return response()->json([
            'status' => 'success',
            'data' => $requests
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'path_pdf' => 'required|string',
            'status' => 'required|string|in:pending,approved,rejected',
        ]);

        $requestCourse = RequestCourse::create($validated);

        return response()->json([
            'status' => 'success',
            'message' => 'Demande de cours enregistrée avec succès',
            'data' => $requestCourse
        ], 201);
    }

    public function show(string $id)
    {
        $requestCourse = RequestCourse::find($id);

        if (!$requestCourse) {
            return response()->json([
                'status' => 'error',
                'message' => 'Demande non trouvée'
            ], 404);
        }

        return response()->json([
            'status' => 'success',
            'data' => $requestCourse
        ]);
    }

    public function update(Request $request, string $id)
    {
        $requestCourse = RequestCourse::find($id);

        if (!$requestCourse) {
            return response()->json([
                'status' => 'error',
                'message' => 'Demande non trouvée'
            ], 404);
        }

        $validated = $request->validate([
            'path_pdf' => 'sometimes|string',
            'status' => 'sometimes|string|in:pending,approved,rejected',
        ]);

        $requestCourse->update($validated);

        return response()->json([
            'status' => 'success',
            'message' => 'Demande mise à jour avec succès',
            'data' => $requestCourse
        ]);
    }

    public function destroy(string $id)
    {
        $requestCourse = RequestCourse::find($id);

        if (!$requestCourse) {
            return response()->json([
                'status' => 'error',
                'message' => 'Demande non trouvée'
            ], 404);
        }

        $requestCourse->delete();

        return response()->json([
            'status' => 'success',
            'message' => 'Demande supprimée avec succès'
        ]);
    }
}
