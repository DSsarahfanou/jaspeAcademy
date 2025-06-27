<?php

namespace App\Http\Controllers;

use App\Models\Formation;
use App\Models\FormationStudent;
use App\Models\Quiz;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Support\Facades\Storage;

class QuizController extends Controller
{
    /**
     * Afficher un quiz aléatoire pour une formation donnée.
     */
    public function showRandomQuiz($formationId)
    {
        // Vérifier que l'utilisateur est authentifié et est un étudiant
        if (!   Auth::check() || !Auth::user()->hasRole('student')) {
            return response()->json(['error' => 'Non autorisé'], 403);
        }

        // Vérifier que l'étudiant est inscrit à la formation
        $formationStudent = FormationStudent::where('formation_id', $formationId)
            ->where('student_id', Auth::id())
            ->first();

        if (!$formationStudent) {
            return response()->json(['error' => 'Vous n\'êtes pas inscrit à cette formation'], 403);
        }

        // Récupérer un quiz aléatoire pour la formation
        $quiz = Quiz::where('formation_id', $formationId)
            ->with('questions.options') // Charger les questions et leurs options
            ->inRandomOrder()
            ->first();

        if (!$quiz) {
            return response()->json(['error' => 'Aucun quiz disponible pour cette formation'], 404);
        }

        return response()->json([
            'quiz' => $quiz,
            'formation_id' => $formationId,
        ], 200);
    }

    /**
     * Soumettre les réponses au quiz et générer l'attestation.
     */
    public function submitQuiz(Request $request, $formationId)
    {
        // Valider les données envoyées
        $request->validate([
            'answers' => 'required|array', // Tableau des réponses (question_id => option_id)
        ]);

        // Vérifier que l'utilisateur est authentifié et est un étudiant
        if (!Auth::check() || !Auth::user()->hasRole('student')) {
            return response()->json(['error' => 'Non autorisé'], 403);
        }

        // Vérifier que l'étudiant est inscrit à la formation
        $formationStudent = FormationStudent::where('formation_id', $formationId)
            ->where('student_id', Auth::id())
            ->first();

        if (!$formationStudent) {
            return response()->json(['error' => 'Vous n\'êtes pas inscrit à cette formation'], 403);
        }

        // Récupérer le quiz (on suppose que l'ID du quiz est envoyé dans les données)
        $quizId = $request->input('quiz_id');
        $quiz = Quiz::where('id', $quizId)->with('questions.options')->first();

        if (!$quiz || $quiz->formation_id != $formationId) {
            return response()->json(['error' => 'Quiz invalide'], 404);
        }

        // Calculer la note
        $score = 0;
        $totalQuestions = $quiz->questions->count();
        foreach ($request->answers as $questionId => $optionId) {
            $option = \App\Models\Option::where('id', $optionId)
                ->where('question_id', $questionId)
                ->first();
            if ($option && $option->answer) {
                $score++;
            }
        }
        $percentageScore = ($totalQuestions > 0) ? ($score / $totalQuestions) * 100 : 0;

        // Mettre à jour la note dans formation_students
        $formationStudent->update([
            'score' => $percentageScore,
            'progression' => 100, // Formation terminée après le quiz
        ]);

        // Générer l'attestation PDF
        $formation = Formation::findOrFail($formationId);
        $student = Auth::user();
        $pdf = Pdf::loadView('pdf.attestation', [
            'student_name' => $student->name . ' ' . $student->surname,
            'formation_name' => $formation->name,
            'score' => $percentageScore,
            'date' => now()->format('d/m/Y'),
        ]);

        // Enregistrer le PDF
        $pdfPath = 'attestations/attestation_' . $student->id . '_' . $formationId . '_' . now()->timestamp . '.pdf';
        Storage::disk('public')->put($pdfPath, $pdf->output());

        // Mettre à jour le champ attestation dans formation_students
        $formationStudent->update([
            'attestation' => true,
            'path_paiement' => $formationStudent->path_paiement ?? $pdfPath, // Réutiliser le champ pour stocker le chemin de l'attestation
        ]);

        return response()->json([
            'message' => 'Quiz soumis avec succès, attestation générée',
            'score' => $percentageScore,
            'attestation_path' => Storage::url($pdfPath),
        ], 200);
    }
}