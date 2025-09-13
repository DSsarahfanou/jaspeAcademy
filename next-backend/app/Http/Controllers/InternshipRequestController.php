<?php

namespace App\Http\Controllers;

use App\Models\FormationStudent;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use App\Mail\InternshipRequestResponse;
use Symfony\Component\HttpFoundation\Response;

class InternshipRequestController extends Controller
{
    // 7. Liste 
    public function listInternshipRequests(Request $request)
    {
        $status = $request->query('status');

        $query = FormationStudent::whereNotNull('request_internership')
            ->with(['student', 'formation']);

        if ($status) {
            $query->where('request_status', $status);
        }

        $requests = $query->get()->map(function ($r) {
            return [
                'id' => $r->id,
                'student_name' => $r->student->name . ' ' . $r->student->surname,
                'student_email' => $r->student->email,
                'formation_name' => $r->formation->name,
                'request_status' => $r->request_status,
                'request_internership' => $r->request_internership, // <— IMPORTANT
                'created_at' => $r->created_at,
            ];
        });

        return response()->json([
            'status' => 'success',
            'data' => $requests
        ]);
    }

    // 9. Update + email 
    public function updateInternshipRequest(Request $request, $id)
    {
        $validated = $request->validate([
            'status' => 'required|in:approved,rejected',
            'message' => 'nullable|string',
        ]);

        $fs = FormationStudent::with(['student','formation'])->findOrFail($id);

        if (!$fs->request_internership) {
            return response()->json([
                'status' => 'error',
                'message' => 'Aucune demande de stage trouvée'
            ], 404);
        }

        $fs->update(['request_status' => $validated['status']]);

        $student = $fs->student;
        $formation = $fs->formation;

        Mail::to($student->email)->send(new InternshipRequestResponse(
            $student,
            $formation,
            $validated['status'],
            $validated['message'] ?? ''
        ));

        return response()->json([
            'status' => 'success',
            'message' => 'Demande mise à jour avec succès et email envoyé'
        ]);
    }

    // 8. Prévisualisation (inline)
    public function previewInternshipRequest($id)
    {
        $fs = FormationStudent::findOrFail($id);

        if (!$fs->request_internership) {
            return response()->json([
                'status' => 'error',
                'message' => 'Aucune demande de stage trouvée'
            ], 404);
        }

        $filePath = storage_path('app/public/' . $fs->request_internership);
        if (!file_exists($filePath)) {
            return response()->json([
                'status' => 'error',
                'message' => 'Fichier PDF introuvable'
            ], 404);
        }

        return response()->file($filePath, [
            'Content-Type' => 'application/pdf',
            'Content-Disposition' => 'inline; filename="demande_stage_' . $id . '.pdf"'
        ]);
    }

    // Vérifier existence fichier
    public function existsInternshipRequest($id)
    {
        $fs = FormationStudent::find($id);
        if (!$fs || !$fs->request_internership) {
            return response()->json(['exists' => false], 404);
        }

        $filePath = storage_path('app/public/' . $fs->request_internership);
        if (!file_exists($filePath)) {
            return response()->json(['exists' => false], 404);
        }

        return response()->json(['exists' => true], 200);
    }
}
