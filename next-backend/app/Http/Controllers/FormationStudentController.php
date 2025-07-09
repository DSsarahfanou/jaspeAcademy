<?php

// namespace App\Http\Controllers;
// next-backend\app\Http\Controllers\FormationStudentController.php
// use App\Models\FormationStudent;
// use App\Models\Formation;
// use App\Models\User;
// use Illuminate\Http\Request;

// class FormationStudentController extends Controller
// {
//     // 1. Enregistrer l'association formation ↔ étudiant
//     public function store(Request $request)
//     {
//         $request->validate([
//             'formation_id' => 'required|exists:formations,id',
//             'student_id' => 'required|exists:users,id',
//         ]);

//         // Vérifie que l'utilisateur a bien le rôle "student"
//         $student = User::where('id', $request->student_id)
//                         ->where('role', 'student')
//                         ->first();

//         if (!$student) {
//             return response()->json(['message' => 'L\'utilisateur n\'est pas un étudiant.'], 403);
//         }

//         $association = FormationStudent::create([
//             'formation_id' => $request->formation_id,
//             'student_id' => $request->student_id,
//         ]);

//         return response()->json([
//             'message' => 'Étudiant inscrit à la formation avec succès.',
//             'data' => $association,
//         ], 201);
//     }

//     // 2. Afficher toutes les formations suivies par un étudiant

//     public function formationsByStudent($student_id)
//     {
//         $student = User::where('id', $student_id)
//                     ->where('role', 'student')
//                     ->firstOrFail();

//         $formations = $student->studentFormations()->with('teachers')->get();

//         return response()->json([
//             'formations' => $formations
//         ]);
//     }



//     // 3. Afficher tous les étudiants d’une formation
//     public function studentsByFormation($formation_id)
//     {
//         $formation = Formation::findOrFail($formation_id);

//         $students = $formation->students;

//         return response()->json($students);
//     }
// }



namespace App\Http\Controllers;

use App\Models\FormationStudent;
use App\Models\Formation;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Support\Facades\Storage;

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
            'progression' => 0, // Initialisation à 0
            'completed_lessons' => [], // Initialisation avec un tableau vide
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

    // 4. Récupérer la progression et les leçons terminées pour une formation et un étudiant
    public function showProgression($formation_id, Request $request)
    {
       // $student_id = $request->user()->id; // Supposons que l'utilisateur est authentifié

         $student_id = Auth::id();

        $formationStudent = FormationStudent::where('formation_id', $formation_id)
                                           ->where('student_id', $student_id)
                                           ->first();

        if (!$formationStudent) {
            return response()->json([
                'status' => 'error',
                'message' => 'Aucune association trouvée pour cette formation et cet étudiant'
            ], 404);
        }

        return response()->json([
            'status' => 'success',
            'data' => [
                'progression' => $formationStudent->progression,
                'completed_lessons' => $formationStudent->completed_lessons ?? [],
            ]
        ]);
    }

    // 5. Mettre à jour la progression et les leçons terminées
    public function updateProgression(Request $request, $formation_id)
    {
        //$student_id = $request->user()->id; // Supposons que l'utilisateur est authentifié

        $student_id = Auth::id();


        $request->validate([
            'progression' => 'required|numeric|min:0|max:100',
            'completed_lessons' => 'required|array',
            'completed_lessons.*' => 'string', // Valide que chaque élément est une chaîne (ex. "moduleId:lessonId")
        ]);

        $formationStudent = FormationStudent::where('formation_id', $formation_id)
                                           ->where('student_id', $student_id)
                                           ->first();

        if (!$formationStudent) {
            return response()->json([
                'status' => 'error',
                'message' => 'Aucune association trouvée pour cette formation et cet étudiant'
            ], 404);
        }

        $formationStudent->update([
            'progression' => $request->progression,
            'completed_lessons' => $request->completed_lessons,
        ]);

        return response()->json([
            'status' => 'success',
            'message' => 'Progression mise à jour avec succès',
            'data' => $formationStudent
        ]);
    }




// 6. Traiter la demande de stage
    public function storeInternshipRequest(Request $request, $formation_id)
    {
        $student_id = $request->user()->id;

        $request->validate([
            'name' => 'required|string|max:255',
            'surname' => 'required|string|max:255',
            'email' => 'required|email',
            'phone' => 'required|string|max:20',
            'address' => 'required|string',
            'birth_date' => 'required|date',
            'gender' => 'required|string',
            'isInCountry' => 'required|boolean',
            'hasRelatives' => 'required_if:isInCountry,false|boolean',
            'canProvideAccommodation' => 'required_if:hasRelatives,false|boolean',
            'durationMonths' => 'required|integer|min:1',
        ]);

        $formationStudent = FormationStudent::where('formation_id', $formation_id)
                                           ->where('student_id', $student_id)
                                           ->first();

        if (!$formationStudent) {
            return response()->json([
                'status' => 'error',
                'message' => 'Aucune association trouvée pour cette formation et cet étudiant'
            ], 404);
        }

        // Vérifier si la formation est terminée (progression = 100)
        if ($formationStudent->progression < 100) {
            return response()->json([
                'status' => 'error',
                'message' => 'Vous devez terminer la formation avant de soumettre une demande de stage'
            ], 403);
        }

        // Vérifier si une demande existe déjà
        if ($formationStudent->request_internership) {
            return response()->json([
                'status' => 'error',
                'message' => 'Une demande de stage a déjà été soumise pour cette formation'
            ], 400);
        }

        // Générer le PDF
        $data = $request->only([
            'name', 'surname', 'email', 'phone', 'address', 'birth_date', 'gender',
            'isInCountry', 'hasRelatives', 'canProvideAccommodation', 'durationMonths'
        ]);
        $data['formation_name'] = Formation::findOrFail($formation_id)->name;

        $pdf = Pdf::loadView('internship_request', $data);
        $pdfPath = "internship_requests/{$formation_id}_{$student_id}_" . time() . ".pdf";
        Storage::disk('public')->put($pdfPath, $pdf->output());

        // Mettre à jour la table formation_student
        $formationStudent->update([
            'request_internership' => $pdfPath,
            'request_status' => 'pending',
        ]);

        return response()->json([
            'status' => 'success',
            'message' => 'Demande de stage soumise avec succès',
            'data' => $formationStudent
        ], 201);
    }














}