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
use Illuminate\Support\Facades\Mail;
use App\Mail\InternshipRequestResponse;


class FormationStudentController extends Controller
{
    // 1. Enregistrer l'association formation ↔ étudiant
    // public function store(Request $request)
    // {
    //     $request->validate([
    //         'formation_id' => 'required|exists:formations,id',
    //         'student_id' => 'required|exists:users,id',
    //         'paymentData' => 'required|array',
    //     ]);

    //     // Vérifie que l'utilisateur a bien le rôle "student"
    //     $student = User::where('id', $request->student_id)
    //                    ->where('role', 'student')
    //                    ->first();

    //     if (!$student) {
    //         return response()->json(['message' => 'L\'utilisateur n\'est pas un étudiant.'], 403);
    //     }

    //     //vérifier si l'utilisateur est déjà inscrit à cette formation
    //     $exists = FormationStudent::where('formation_id', $request->formation_id)
    //         ->where('student_id', $request->student_id)
    //         ->exists();

    //     if ($exists) {
    //         return response()->json(['message' => 'Étudiant déjà inscrit.'], 409);
    //     }


        
    //     $student = User::findOrFail($request->student_id);
    //     $formation = Formation::findOrFail($request->formation_id);
    //     $transactionId = $request->paymentData['transactionId'] ?? uniqid('txn_');

    //     // Générer PDF
    //     $pdf = Pdf::loadView('invoices.receipt', [
    //         'student' => $student,
    //         'formation' => $formation,
    //         'transactionId' => $transactionId,
    //     ]);

    //     $fileName = 'facture_' . $student->id . '_' . time() . '.pdf';
    //     $filePath = 'invoices/' . $fileName;

    //     $association = FormationStudent::create([
    //         'formation_id' => $request->formation_id,
    //         'student_id' => $request->student_id,
    //         'progression' => 0, // Initialisation à 0
    //         'completed_lessons' => [], // Initialisation avec un tableau vide
    //         'path_paiement' => $filePath,
    //     ]);

    //     return response()->json([
    //         'success' => true,
    //         'message' => 'Étudiant inscrit à la formation avec succès.',
    //         'data' => $association,
    //     ], 201);
    // }


    public function store(Request $request)
    {
        $request->validate([
            'formation_id' => 'required|exists:formations,id',
            'student_id' => 'required|exists:users,id',
            'paymentData' => 'required|array',
        ]);

        // Vérification du rôle
        $student = User::where('id', $request->student_id)
                    ->where('role', 'student')
                    ->firstOrFail();

        // Vérification de l'inscription existante
        if (FormationStudent::where('formation_id', $request->formation_id)
                            ->where('student_id', $request->student_id)
                            ->exists()) {
            return response()->json(['message' => 'Étudiant déjà inscrit.'], 409);
        }

        // Création du dossier si inexistant
        Storage::disk('public')->makeDirectory('invoices');

        // Génération du PDF
        $pdf = Pdf::loadView('invoices.receipt', [
            'student' => $student,
            'formation' => Formation::find($request->formation_id),
            'transactionId' => $request->paymentData['transactionId'] ?? uniqid('txn_'),
        ]);

        $fileName = 'facture_'.$student->id.'_'.time().'.pdf';
        $filePath = 'invoices/'.$fileName;

        // Sauvegarde du PDF
        Storage::disk('public')->put($filePath, $pdf->output());

        // Création de l'association
        $association = FormationStudent::create([
            'formation_id' => $request->formation_id,
            'student_id' => $request->student_id,
            'progression' => 0,
            'completed_lessons' => [],
            'path_paiement' => $filePath,
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Étudiant inscrit avec succès.',
            'data' => $association,
            'invoice_url' => $filePath,
        ], 201);
    }



    // 1. 1 Télécharger la facture de paiement de la formation
    public function downloadInvoice($id)
    {
        $record = FormationStudent::findOrFail($id);

        if (!Storage::disk('public')->exists($record->path_paiement)) {
            abort(404, 'Facture non trouvée.');
        }

        return Storage::download($record->path_paiement);
    }



    // 2. Afficher toutes les formations suivies par un étudiant
    // public function formationsByStudent($student_id)
    // {
    //     $student = User::where('id', $student_id)
    //                    ->where('role', 'student')
    //                    ->firstOrFail();

    //     $formations = $student->studentFormations()->with('teachers')->get();

    //     return response()->json([
    //         'formations' => $formations
    //     ]);
    // }

public function formationsByStudent($student_id)
{
    $student = User::where('id', $student_id)
                   ->where('role', 'student')
                   ->firstOrFail();

    // Chargez les formations avec les données du pivot et des enseignants
    $formations = FormationStudent::where('student_id', $student_id)
        ->with(['formation.teachers', 'formation.meetings'])
        ->get()
        ->map(function($formationStudent) {
            // Ajoutez les données du pivot à l'objet formation pour un accès facile
            $formation = $formationStudent->formation;
            $formation->pivot_data = [
                'progression' => $formationStudent->progression,
                'completed_lessons' => $formationStudent->completed_lessons,
                'attestation' => $formationStudent->attestation
            ];
            return $formation;
        })
        ->groupBy(function($formation) {
            return $formation->pivot_data['progression'] >= 100 ? 'completed' : 'in_progress';
        });

    return response()->json([
        'completed_formations' => $formations->get('completed', []),
        'in_progress_formations' => $formations->get('in_progress', []),
        'student_progress' => $formations->mapWithKeys(function($group, $key) {
            return [$key => $group->map(function($formation) {
                return $formation->pivot_data['progression'];
            })];
        })
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
        $pdfPath = "internship_requests/internship_{$formation_id}_{$student_id}_" . time() . ".pdf";
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


    // 7. Lister toutes les demandes de stage (admin)
    public function listInternshipRequests(Request $request)
    {
        $status = $request->query('status'); // Filtre optionnel par statut

        $query = FormationStudent::whereNotNull('request_internership')
                                ->with(['student', 'formation']);

        if ($status) {
            $query->where('request_status', $status);
        }

        $requests = $query->get()->map(function ($request) {
            return [
                'id' => $request->id,
                'student_name' => $request->student->name . ' ' . $request->student->surname,
                'student_email' => $request->student->email,
                'formation_name' => $request->formation->name,
                'request_status' => $request->request_status,
                'request_internership' => $request->request_internership,
                'created_at' => $request->created_at,
            ];
        });

        return response()->json([
            'status' => 'success',
            'data' => $requests
        ]);
    }

    // 8. Télécharger le PDF d'une demande (admin)
    public function downloadInternshipRequest($id)
    {
        $formationStudent = FormationStudent::findOrFail($id);

        if (!$formationStudent->request_internership) {
            return response()->json([
                'status' => 'error',
                'message' => 'Aucune demande de stage trouvée'
            ], 404);
        }

        $filePath = storage_path('app/public/'. $formationStudent->request_internership);
        if (!file_exists($filePath)) {
            return response()->json([
                'status' => 'error',
                'message' => 'Fichier PDF introuvable'
            ], 404);
        }

        return response()->download($filePath, 'demande_stage_' . $id . '.pdf');
    }

    // 9. Approuver ou rejeter une demande (admin)
    public function updateInternshipRequest(Request $request, $id)
    {
        $request->validate([
            'status' => 'required|in:approved,rejected',
            'message' => 'nullable|string',
        ]);

        $formationStudent = FormationStudent::findOrFail($id);

        if (!$formationStudent->request_internership) {
            return response()->json([
                'status' => 'error',
                'message' => 'Aucune demande de stage trouvée'
            ], 404);
        }

        $formationStudent->update([
            'request_status' => $request->status,
        ]);

        // Envoyer un email à l'étudiant
        $student = $formationStudent->student;
        $formation = $formationStudent->formation;
        Mail::to($student->email)->send(new InternshipRequestResponse(
            $student,
            $formation,
            $request->status,
            $request->message
        ));

        return response()->json([
            'status' => 'success',
            'message' => 'Demande mise à jour avec succès et email envoyé'
        ]);
    }

    // 10. Lister les demandes de stage de l'étudiant authentifié
    public function listStudentInternshipRequests(Request $request)
    {
        $student_id = $request->user()->id;

        $requests = FormationStudent::where('student_id', $student_id)
                                   ->whereNotNull('request_internership')
                                   ->with(['formation'])
                                   ->get()
                                   ->map(function ($request) {
                                       return [
                                           'id' => $request->id,
                                           'formation_name' => $request->formation->name,
                                           'request_status' => $request->request_status,
                                           'request_internership' => $request->request_internership,
                                           'created_at' => $request->created_at,
                                       ];
                                   });

        return response()->json([
            'status' => 'success',
            'data' => $requests
        ]);
    }

    // 11. Lister les attestations de l'étudiant authentifié
    public function listStudentAttestations(Request $request)
    {
        $student_id = $request->user()->id;

        $attestations = FormationStudent::where('student_id', $student_id)
                                       ->whereNotNull('attestation') 
                                       ->where('progression', 100)
                                       ->with(['formation'])
                                       ->get()
                                       ->map(function ($attestation) {
                                           return [
                                               'id' => $attestation->id,
                                               'formation_name' => $attestation->formation->name,
                                               'attestation' => $attestation->attestation,
                                               'created_at' => $attestation->created_at,
                                           ];
                                       });

        return response()->json([
            'status' => 'success',
            'data' => $attestations
        ]);
    }



        // 12. Télécharger une attestation


    public function downloadAttestation($id)
    {
        $formationStudent = FormationStudent::findOrFail($id);

        $filePath = storage_path('app/public/'. $formationStudent->attestation);

        if (!file_exists($filePath)) {
            return response()->json([
                'status' => 'error',
                'message' => 'Fichier PDF introuvable'
            ], 404);
        }

        return Storage::disk('public')->download($formationStudent->attestation, 'attestation_' . $id . '.pdf');
    }


        // 13. Récuppérer une demande de stage d'une formation
    public function getStudentInternshipRequests($formation_id, Request $request)
    {
        $student_id = $request->user()->id;

        $requests = FormationStudent::where('formation_id', $formation_id)
                                    ->where('student_id', $student_id)
                                   ->with(['formation'])
                                   ->get()
                                   ->map(function ($request) {
                                       return [
                                           'id' => $request->id,
                                           'formation_name' => $request->formation->name,
                                           'request_status' => $request->request_status,
                                           'request_internership' => $request->request_internership,
                                           'created_at' => $request->created_at,
                                       ];
                                   });

        return response()->json([
            'status' => 'success',
            'data' => $requests
        ]);
    }




    
    // 14. Récupérer le score pour une formation et un étudiant
    public function showScore($formation_id, Request $request)
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
                'score' => $formationStudent->score,
                'completed_lessons' => $formationStudent->completed_lessons ?? [],
            ]
        ]);
    }


    // 15. Récupérer l'attestation pour une formation et un étudiant
    public function showAttestation($formation_id, Request $request)
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
                'attestation' => $formationStudent->attestation,
            ]
        ]);
    }









}