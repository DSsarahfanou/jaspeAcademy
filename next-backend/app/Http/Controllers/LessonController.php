<?php

namespace App\Http\Controllers;

use App\Models\Lesson;
use Illuminate\Http\Request;

class LessonController extends Controller
{
    public function index()
    {
        return response()->json([
            'status' => 'success',
            'data' => Lesson::all()
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'contents' => 'required|string',
            'video' => 'nullable|url',
        ]);

        $lesson = Lesson::create($validated);

        return response()->json([
            'status' => 'success',
            'message' => 'Leçon créée avec succès',
            'data' => $lesson
        ], 201);
    }

    public function show(string $id)
    {
        $lesson = Lesson::find($id);

        if (!$lesson) {
            return response()->json([
                'status' => 'error',
                'message' => 'Leçon non trouvée'
            ], 404);
        }

        return response()->json([
            'status' => 'success',
            'data' => $lesson
        ]);
    }

    public function update(Request $request, string $id)
    {
        $lesson = Lesson::find($id);

        if (!$lesson) {
            return response()->json([
                'status' => 'error',
                'message' => 'Leçon non trouvée'
            ], 404);
        }

        $validated = $request->validate([
            'title' => 'sometimes|string|max:255',
            'contents' => 'sometimes|string',
            'video' => 'nullable|url',
        ]);

        $lesson->update($validated);

        return response()->json([
            'status' => 'success',
            'message' => 'Leçon mise à jour avec succès',
            'data' => $lesson
        ]);
    }

    public function destroy(string $id)
    {
        $lesson = Lesson::find($id);

        if (!$lesson) {
            return response()->json([
                'status' => 'error',
                'message' => 'Leçon non trouvée'
            ], 404);
        }

        $lesson->delete();

        return response()->json([
            'status' => 'success',
            'message' => 'Leçon supprimée avec succès'
        ]);
    }
}
