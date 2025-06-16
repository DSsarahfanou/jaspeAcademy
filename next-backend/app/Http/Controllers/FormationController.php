<?php

namespace App\Http\Controllers;

use App\Models\Equipment;
use App\Models\EquipmentFormation;
use App\Models\Formation;
use App\Models\Lesson;
use App\Models\Module;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class FormationController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $formations = Formation::with(['modules.lessons', 'equipments'])->get();

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
        // Validation des données
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'prerequisites' => 'required|string',
            'price' => 'required|numeric|min:0',
            'formation_details' => 'required|string',
            'picture' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:102400',
            'categorie' => 'nullable|string|max:255',
            'modules' => 'required|array',
            'modules.*.title' => 'required|string|max:255',
            'modules.*.description' => 'required|string',
            'modules.*.lessons' => 'required|array',
            'modules.*.lessons.*.title' => 'required|string|max:255',
            'modules.*.lessons.*.content_file' => 'nullable|file|mimes:pdf|max:5120000',
            'modules.*.lessons.*.video_file' => 'nullable|file|mimes:mp4,mov,avi|max:1024000',
            'equipments' => 'nullable|array',
            'equipments.*.id' => 'nullable|integer|exists:equipments,id',
            'equipments.*.name' => 'required_without:equipments.*.id|string|max:255',
            'equipments.*.quantity' => 'required|integer|min:1',
            'equipments.*.price' => 'required_without:equipments.*.id|numeric|min:0',
            'equipments.*.status' => 'required_without:equipments.*.id|boolean',
            'equipments.*.description' => 'nullable|string|max:500',
            'equipments.*.details' => 'nullable|string',
            'equipments.*.picture' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:102400',
        ]);

        // Traitement de l'image de la formation
        $picturePath = null;
        if ($request->hasFile('picture')) {
            $picturePath = $request->file('picture')->store('formations', 'public');
        }

        // Création de la formation
        $formation = Formation::create([
            'name' => $validated['name'],
            'prerequisites' => $validated['prerequisites'],
            'price' => $validated['price'],
            'formation_details' => $validated['formation_details'],
            'picture' => $picturePath,
            'categorie' => $validated['categorie'] ?? null,
        ]);

        // Création des modules et leçons
        foreach ($validated['modules'] as $moduleData) {
            $module = Module::create([
                'formation_id' => $formation->id,
                'title' => $moduleData['title'],
                'description' => $moduleData['description'],
            ]);

            foreach ($moduleData['lessons'] as $lessonData) {
                $contentPath = null;
                $videoPath = null;

                // Traitement du fichier PDF
                if (isset($lessonData['content_file']) && $lessonData['content_file']->isValid()) {
                    $contentPath = $lessonData['content_file']->store('lessons/content', 'public');
                }

                // Traitement du fichier vidéo
                if (isset($lessonData['video_file']) && $lessonData['video_file']->isValid()) {
                    $videoPath = $lessonData['video_file']->store('lessons/videos', 'public');
                }

                Lesson::create([
                    'module_id' => $module->id,
                    'title' => $lessonData['title'],
                    'content' => $contentPath,
                    'video' => $videoPath,
                ]);
            }
        }

        // Gestion des équipements
        if (!empty($validated['equipments'])) {
            foreach ($validated['equipments'] as $equipmentData) {
                // Si c'est un équipement existant
                if (isset($equipmentData['id'])) {
                    EquipmentFormation::create([
                        'formation_id' => $formation->id,
                        'equipment_id' => $equipmentData['id'],
                        'quantity' => $equipmentData['quantity'],
                    ]);
                } 
                // Si c'est un nouvel équipement
                else {
                    $equipmentPicturePath = null;
                    if (isset($equipmentData['picture']) && $equipmentData['picture']->isValid()) {
                        $equipmentPicturePath = $equipmentData['picture']->store('equipments', 'public');
                    }

                    $equipment = Equipment::create([
                        'name' => $equipmentData['name'],
                        'quantity' => $equipmentData['quantity'],
                        'price' => $equipmentData['price'],
                        'status' => $equipmentData['status'],
                        'description' => $equipmentData['description'] ?? null,
                        'details' => $equipmentData['details'] ?? null,
                        'picture' => $equipmentPicturePath,
                    ]);

                    EquipmentFormation::create([
                        'formation_id' => $formation->id,
                        'equipment_id' => $equipment->id,
                        'quantity' => $equipmentData['quantity'],
                    ]);
                }
            }
        }

        return response()->json([
            'status' => 'success',
            'message' => 'Formation créée avec succès',
            'data' => $formation->load(['modules.lessons', 'equipments'])
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $formation = Formation::with(['modules.lessons', 'equipments'])->find($id);

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
            'name' => 'sometimes|string|max:255',
            'prerequisites' => 'sometimes|string',
            'price' => 'sometimes|numeric|min:0',
            'formation_details' => 'sometimes|string',
            'picture' => 'sometimes|image|mimes:jpeg,png,jpg,gif|max:2048',
            'categorie' => 'sometimes|string|max:255',
        ]);

        // Mise à jour de l'image si fournie
        if ($request->hasFile('picture')) {
            // Supprimer l'ancienne image si elle existe
            if ($formation->picture) {
                Storage::disk('public')->delete($formation->picture);
            }
            $validated['picture'] = $request->file('picture')->store('formations', 'public');
        }

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
        $formation = Formation::with(['modules.lessons', 'equipments'])->find($id);

        if (!$formation) {
            return response()->json([
                'status' => 'error',
                'message' => 'Formation non trouvée'
            ], 404);
        }

        // Suppression des fichiers associés
        if ($formation->picture) {
            Storage::disk('public')->delete($formation->picture);
        }

        // Suppression des fichiers des leçons
        foreach ($formation->modules as $module) {
            foreach ($module->lessons as $lesson) {
                if ($lesson->content) {
                    Storage::disk('public')->delete($lesson->content);
                }
                if ($lesson->video) {
                    Storage::disk('public')->delete($lesson->video);
                }
            }
        }

        $formation->delete();

        return response()->json([
            'status' => 'success',
            'message' => 'Formation supprimée avec succès'
        ]);
    }

    /**
     * Récupère la liste des équipements existants
     */
    public function getEquipments()
    {
        $equipments = Equipment::all();

        return response()->json([
            'status' => 'success',
            'data' => $equipments
        ]);
    }
}