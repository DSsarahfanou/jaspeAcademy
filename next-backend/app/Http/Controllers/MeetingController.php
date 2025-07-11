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

        $meeting = Meeting::create([
            'formation_id' => $formationId,
            'teacher_id' => $teacher->id,
            'progression_level' => $validated['progression_level'],
            'scheduled_at' => $validated['scheduled_at'],
        ]);

        // Lier dynamiquement les étudiants qui ont le bon niveau
        $students = FormationStudent::where('formation_id', $formationId)
            ->where('progression', '>=', $validated['progression_level'])
            ->get();

        foreach ($students as $fs) {
            $meeting->students()->attach($fs->student_id);
        }

        return response()->json($meeting);
    }

    // Marquer un participant comme ayant assisté
    public function markAttendance(Request $request, $meetingId)
    {
        $request->validate([
            'student_id' => 'required|exists:users,id',
        ]);

        $meeting = Meeting::findOrFail($meetingId);
        $meeting->students()->updateExistingPivot($request->student_id, [
            'has_attended' => true,
        ]);

        return response()->json(['message' => 'Attendance marked.']);
    }
}
