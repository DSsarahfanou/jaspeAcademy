<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class FormationInscriptionController extends Controller
{
    /**
     * Affiche la liste des formations d'un étudiant
     */
    public function index($studentId)
    {
        // Récupérer l'étudiant avec ses formations
        $student = Student::with('formations')->findOrFail($studentId);
        
        // Transformer les données pour la vue
        $formations = $student->formations->map(function ($formation) {
            return [
                'id' => $formation->id,
                'name' => $formation->name,
                'animateur' => $formation->instructor_name, // Supposant que vous avez ce champ
                'formation_details' => $formation->description,
                // Ajoutez d'autres champs si nécessaire
            ];
        });
        
        return view('student.formations.index', [
            'formations' => $formations,
            'student' => $student
        ]);
    }

    /**
     * Affiche les détails d'une formation spécifique pour l'étudiant
     */
    public function show($studentId, $formationId)
    {
        $student = Student::findOrFail($studentId);
        $formation = $student->formations()->findOrFail($formationId);
        
        return view('student.formations.show', compact('student', 'formation'));
    }
}

