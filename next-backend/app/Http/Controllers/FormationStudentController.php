<?php

namespace App\Http\Controllers;

use App\Models\FormationStudent;
use App\Models\Formation;
use App\Models\User;
use Illuminate\Http\Request;

class FormationStudentController extends Controller
{
    // 1. Enregistrer l'association formation ↔ étudiant
    public function store(Request $request)
    {
        $request->validate([
            'formation_id' => 'required|exists:formations,id',
            'student_id' => 'required|exists:users,id',
        ]);

        // Vérifie que l'utilisateur a bien le rôle "student"
        $student = User::where('id', $request->student_id)
                        ->where('role', 'student')
                        ->first();

        if (!$student) {
            return response()->json(['message' => 'L\'utilisateur n\'est pas un étudiant.'], 403);
        }

        $association = FormationStudent::create([
            'formation_id' => $request->formation_id,
            'student_id' => $request->student_id,
        ]);

        return response()->json([
            'message' => 'Étudiant inscrit à la formation avec succès.',
            'data' => $association,
        ], 201);
    }

    // 2. Afficher toutes les formations suivies par un étudiant

public function formationsByStudent($student_id)
{
    $student = User::where('id', $student_id)
                   ->where('role', 'student')
                   ->firstOrFail();

    $formations = $student->studentFormations()->with('teachers')->get();

    return response()->json([
        'formations' => $formations
    ]);
}



    // 3. Afficher tous les étudiants d’une formation
    public function studentsByFormation($formation_id)
    {
        $formation = Formation::findOrFail($formation_id);

        $students = $formation->students;

        return response()->json($students);
    }
}
