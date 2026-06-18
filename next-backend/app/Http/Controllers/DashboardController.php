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
use App\Models\User;
use App\Models\Formation;
use App\Models\Equipment;
use App\Models\Order;

class DashboardController extends Controller
{
    public function index()
    {
        return redirect()->route('web.redirect');
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
            ->selectRaw("
                COUNT(
                    CASE 
                        WHEN meetings.progression_level <= formation_students.progression
                        AND meeting_student.meeting_id IS NULL
                        AND NOT EXISTS (
                            SELECT 1 FROM meeting_student ms
                            JOIN meetings m2 ON ms.meeting_id = m2.id
                            WHERE ms.student_id = ?
                            AND m2.formation_id = meetings.formation_id
                            AND m2.progression_level = meetings.progression_level
                        )
                        THEN 1
                    END
                ) as available
            ", [$user->id])
            ->selectRaw("
                COUNT(
                    CASE 
                        WHEN meeting_student.meeting_id IS NOT NULL
                        THEN 1
                    END
                ) as completed
            ")
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




    //Teachers
    public function teacherDashboard(Request $request)
    {
        $teacher = $request->user();

        // 1. Récupérer réunions + compter
        $meetings = Meeting::where('teacher_id', $teacher->id)
            ->with('formation')
            ->orderBy('scheduled_at', 'asc')
            ->get();

        $meetingsCount = $meetings->count();

        // Exemple d’évolution statique (tu peux remplacer par un vrai calcul si dispo)
        $meetingsTrend = "+12% ce mois-ci";

        // 2. Récupérer formations du teacher + compter
        $formations = Formation::where('user_id', $teacher->id)->get();
        $formationsCount = $formations->count();
        $formationsTrend = "Stable depuis 3 mois";

        // 3. Nombre d’apprenants distincts sur toutes ses formations
        // Approche : récupérer tous les étudiants liés aux formations du teacher
        $studentsCount = \DB::table('formation_students')
            ->whereIn('formation_id', $formations->pluck('id'))
            ->distinct('student_id')
            ->count('student_id');
        $studentsTrend = "+7% depuis la semaine dernière";

        // On peut envoyer les meetings et notifications (vide pour l’instant)
        return response()->json([
            'status' => 'success',
            'data' => [
                'meetingsCount' => $meetingsCount,
                'meetingsTrend' => $meetingsTrend,
                'formationsCount' => $formationsCount,
                'formationsTrend' => $formationsTrend,
                'studentsCount' => $studentsCount,
                'studentsTrend' => $studentsTrend,
                'meetings' => $meetings->map(function ($meeting) {
                    return [
                        'id' => $meeting->id,
                        'title' => $meeting->title ?? 'Réunion',
                        'datetime' => $meeting->datetime,
                        'formation' => [
                            'id' => $meeting->formation?->id,
                            'name' => $meeting->formation?->name,
                        ],
                    ];
                }),
                'notifications' => [], // plus tard
            ],
        ]);
    }

        //Administrateur
    // public function adminDashboard(Request $request)
    // {
    //     $admin = $request->user();

    //     // 1. Récupérer utilisateurs + compter
    //     $users = User::get();

    //     $usersCount = $users->count();
    //     // 1. Récupérer orders + compter
    //     $orders = Order::get();

    //     $ordersCount = $orders->count();

    //     // 1. Récupérer utilisateurs + compter
    //     $equipments = Equipment::get();

    //     $equipmentsCount = $equipments->count();



    //     return response()->json([
    //         'status' => 'success',
    //         'data' => [
    //             'equipmentsCount' => $equipmentsCount,
    //             'formationsCount' => $formationsCount,
    //             'UsersCount' => $usersCount,
    //             'OrdersCount' => $OrdersCount,

    //         ],
    //     ]);
    // }

    public function adminDashboard()
    {
        return response()->json([
            'orders_count' => Order::count(),
            'users_count' => User::count(),
            'students_count' => User::where('role', 'student')->count(),
            'teachers_count' => User::where('role', 'teacher')->count(),
            'equipments_count' => Equipment::count(),
            'recent_orders' => Order::latest()->take(5)->with('student')->get(),
        ]);
    }

}



