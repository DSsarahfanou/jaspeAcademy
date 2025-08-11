<?php
// namespace App\Http\Controllers;

// use Illuminate\Http\Request;

// class DashboardController extends Controller
// {
//     public function index()
//     {
//         return view('dashboard'); // ou autre logique
//     }

//     public function getStats(Request $request)
// {
//     $user = $request->user();

//     $formationsEnCours = $user->studentFormations()->wherePivot('progression', '<', 100)->count();
//     $formationsTerminees = $user->studentFormations()->wherePivot('progression', '>=', 100)->count();

//     $meetingsEnCours = $user->meetings()->where('scheduled_at', '>', now())->count();
//     $meetingsPasses = $user->meetings()->where('scheduled_at', '<=', now())->count();

//     $demandesSoumises = $user->studentFormations()->whereNotNull('request_internership')->count();
//     $demandesApprouvees = $user->studentFormations()->where('request_status', 'approved')->count();

//     $attestations = $user->studentFormations()->whereNotNull('attestation')->count();

//     return response()->json([
//         'formations_en_cours' => $formationsEnCours,
//         'formations_terminees' => $formationsTerminees,
//         'meetings_en_cours' => $meetingsEnCours,
//         'meetings_passes' => $meetingsPasses,
//         'demandes_soumises' => $demandesSoumises,
//         'demandes_approuvees' => $demandesApprouvees,
//         'attestations' => $attestations,
//     ]);
// }

// }




namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\FormationStudent;
use App\Models\Meeting;

class DashboardController extends Controller
{
    public function index()
    {
        return view('dashboard');
    }

public function getStats(Request $request)
{
    $user = $request->user();

    // 1. Stats des formations
    $formationsStats = FormationStudent::where('student_id', $user->id)
        ->selectRaw('COUNT(*) as total')
        ->selectRaw('SUM(CASE WHEN progression < 100 THEN 1 ELSE 0 END) as formations_en_cours')
        ->selectRaw('SUM(CASE WHEN progression >= 100 THEN 1 ELSE 0 END) as formations_terminees')
        ->selectRaw('SUM(CASE WHEN request_internership IS NOT NULL THEN 1 ELSE 0 END) as demandes_soumises')
        ->selectRaw('SUM(CASE WHEN request_status = "approved" THEN 1 ELSE 0 END) as demandes_approuvees')
        ->selectRaw('SUM(CASE WHEN attestation IS NOT NULL AND progression = 100  THEN 1 ELSE 0 END) as attestations')
        ->first();

    // 2. Stats des meetings
    $meetings = Meeting::query()
        ->selectRaw('COUNT(CASE WHEN meetings.progression_level <= formation_students.progression AND meeting_student.meeting_id IS NULL THEN 1 END) as available')
        ->selectRaw('COUNT(CASE WHEN meeting_student.meeting_id IS NOT NULL THEN 1 END) as completed')
        ->join('formation_students', 'meetings.formation_id', '=', 'formation_students.formation_id')
        ->leftJoin('meeting_student', function($join) use ($user) {
            $join->on('meetings.id', '=', 'meeting_student.meeting_id')
                 ->where('meeting_student.student_id', $user->id);
        })
        ->where('formation_students.student_id', $user->id)
        ->first();

    return response()->json([
        'formations_en_cours' => $formationsStats->formations_en_cours ?? 0,
        'formations_terminees' => $formationsStats->formations_terminees ?? 0,
        'meetings_disponibles' => $meetings->available ?? 0,
        'meetings_completes' => $meetings->completed ?? 0,
        'demandes_soumises' => $formationsStats->demandes_soumises ?? 0,
        'demandes_approuvees' => $formationsStats->demandes_approuvees ?? 0,
        'attestations' => $formationsStats->attestations ?? 0,
    ]);
}
}



