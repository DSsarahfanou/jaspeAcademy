<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreMeetingRequest;
use App\Http\Requests\UpdateMeetingRequest;
use App\Models\Meeting;
use App\Models\FormationStudent;
use Illuminate\Http\Request;

// MeetingController.php

class MeetingController extends Controller
{
    // Lister les réunions pour une formation
    public function index($formationId)
    {
        $teacher = auth()->user();

        $meetings = Meeting::where('formation_id', $formationId)
            ->where('teacher_id', $teacher->id)
            ->with('students')
            ->get();

        return response()->json($meetings);
    }

    // Créer une réunion pour un niveau
    public function store(Request $request, $formationId)
    {
        $teacher = auth()->user();
        $validated = $request->validate([
            'progression_level' => 'required|in:25,50,75',
            'scheduled_at' => 'required|date',
        ]);

        // Générer un nom de salle unique
        $roomName = 'formation_' . $formationId . '_progression_' . $validated['progression_level'] . '_meet_' . now()->timestamp;

        $meeting = Meeting::create([
            'formation_id' => $formationId,
            'teacher_id' => $teacher->id,
            'progression_level' => $validated['progression_level'],
            'scheduled_at' => $validated['scheduled_at'],
            'room_link' => $roomName,
        ]);

        // Ne pas attacher les étudiants ici !

        return response()->json($meeting);
    }


    // Marquer un participant comme ayant assisté
    // public function markAttendance(Request $request, $meetingId)
    // {
    //     $request->validate([
    //         'student_id' => 'required|exists:users,id',
    //     ]);

    //     $meeting = Meeting::findOrFail($meetingId);
    //     $meeting->students()->updateExistingPivot($request->student_id, [
    //         'has_attended' => true,
    //     ]);

    //     return response()->json(['message' => 'Attendance marked.']);
    // }

    public function joinMeeting(Request $request, $meetingId)
    {
        $student = $request->user();

        $meeting = Meeting::findOrFail($meetingId);

        // Vérifier que l'étudiant atteint le niveau requis
        $formationStudent = \App\Models\FormationStudent::where('student_id', $student->id)
            ->where('formation_id', $meeting->formation_id)
            ->firstOrFail();

        if ($formationStudent->progression < $meeting->progression_level) {
            return response()->json(['error' => 'Niveau insuffisant pour ce meeting'], 403);
        }

        // Vérifier qu'il n'a pas déjà rejoint un meeting de ce niveau
        $alreadyJoined = $student->meetings()
            ->where('meetings.formation_id', $meeting->formation_id)
            ->wherePivot('level', $meeting->progression_level)
            ->exists();

        if ($alreadyJoined) {
            return response()->json(['error' => 'Déjà inscrit à un meeting pour ce niveau'], 400);
        }

        // Lier l'étudiant au meeting et indiquer le niveau
        $meeting->students()->attach($student->id, [
            'level' => $meeting->progression_level,
        ]);

        return response()->json(['message' => 'Inscription réussie']);
    }




    //Listes des réunions d'un teacher
    public function teacherMeetings()
    {
        $teacher = auth()->user();

        $meetings = Meeting::where('teacher_id', $teacher->id)
            ->with('formation')
            ->get();

        return response()->json($meetings);
    }


    //Listes des meetings pour un student
    // public function studentMeetings(Request $request)
    // {
    //     $studentId = $request->user()->id;

    //     // Récupère les meetings où cet étudiant est inscrit
    //     $meetings = Meeting::whereHas('students', function($query) use ($studentId) {
    //         $query->where('student_id', $studentId);
    //     })
    //     ->with(['formation', 'teacher'])
    //     ->get();

    //     return response()->json($meetings);
    // }

    // public function studentMeetings(Request $request)
    // {
    //     $student = $request->user();

    //     // On récupère la progression de l'étudiant pour chaque formation
    //     $formationProgressions = \App\Models\FormationStudent::where('student_id', $student->id)->get();

    //     $meetings = collect();

    //     foreach ($formationProgressions as $fs) {
    //         // Pour cette formation, regarder si l'étudiant a déjà passé ce niveau
    //         $formationMeetings = Meeting::where('formation_id', $fs->formation_id)
    //             ->where('progression_level', '<=', $fs->progression)
    //             ->whereDoesntHave('students', function ($q) use ($student) {
    //                 $q->where('student_id', $student->id);
    //             })
    //             ->whereDoesntHave('students', function ($q) use ($student, $fs) {
    //                 $q->where('student_id', $student->id)
    //                 ->wherePivot('level', $fs->progression_level);
    //             })
    //             ->with(['formation', 'teacher'])
    //             ->get();

    //         $meetings = $meetings->merge($formationMeetings);
    //     }

    //     return response()->json($meetings);
    // }


//     public function studentMeetings(Request $request)
// {
//     $student = $request->user();

//     $formationProgressions = FormationStudent::where('student_id', $student->id)->get();

//     $meetings = collect();

//     foreach ($formationProgressions as $fs) {
//         $formationMeetings = Meeting::where('formation_id', $fs->formation_id)
//             // Meetings où le niveau requis est inférieur à la progression de l'étudiant
//             ->where('progression_level', '<=', $fs->progression)
            
//             // Exclure les meetings déjà complétés par l'étudiant
//             ->whereDoesntHave('students', function ($q) use ($student) {
//                 $q->where('student_id', $student->id);
//             })
            
//             // Exclure les meetings où l'étudiant a déjà atteint ce niveau
//             ->whereDoesntHave('students', function ($q) use ($student, $fs) {
//                 $q->where('student_id', $student->id)
//                   ->where('meeting_student.level', '>=', $fs->progression);
//             })
            
//             ->with(['formation', 'teacher'])
//             ->get();

//         $meetings = $meetings->merge($formationMeetings);
//     }

//     return response()->json($meetings);
// }



public function studentMeetings(Request $request)
{
    $student = $request->user();

    $formationProgressions = FormationStudent::where('student_id', $student->id)->get();

    $availableMeetings = collect();
    $pastMeetings = collect();

    foreach ($formationProgressions as $fs) {
        // Meetings disponibles (non complétés)
        $available = Meeting::where('formation_id', $fs->formation_id)
            ->where('progression_level', '<=', $fs->progression)
            ->whereDoesntHave('students', function ($q) use ($student) {
                $q->where('student_id', $student->id);
            })
            ->with(['formation', 'teacher'])
            ->get();

        // Meetings déjà complétés
        $completed = Meeting::where('formation_id', $fs->formation_id)
            ->whereHas('students', function ($q) use ($student) {
                $q->where('student_id', $student->id);
            })
            ->with(['formation', 'teacher'])
            ->get();

        $availableMeetings = $availableMeetings->merge($available);
        $pastMeetings = $pastMeetings->merge($completed);
    }

    return response()->json([
        'available' => $availableMeetings,
        'completed' => $pastMeetings
    ]);
}



    



}
