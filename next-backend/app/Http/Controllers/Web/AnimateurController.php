<?php

namespace App\Http\Controllers\Web;

use App\Http\Controllers\Controller;
use App\Models\Formation;
use App\Models\FormationStudent;
use App\Models\Meeting;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class AnimateurController extends Controller
{
    public function dashboard()
    {
        $teacher = auth()->user();

        $formations    = Formation::where('user_id', $teacher->id)->get();
        $formationIds  = $formations->pluck('id');

        $formationsCount = $formations->count();
        $meetingsCount   = Meeting::where('teacher_id', $teacher->id)->count();

        $studentsCount = DB::table('formation_students')
            ->whereIn('formation_id', $formationIds)
            ->distinct('student_id')
            ->count('student_id');

        $upcomingMeetings = Meeting::where('teacher_id', $teacher->id)
            ->where('scheduled_at', '>=', now())
            ->with('formation')
            ->orderBy('scheduled_at')
            ->take(5)
            ->get();

        return view('animateur.dashboard', compact(
            'formationsCount', 'meetingsCount', 'studentsCount', 'upcomingMeetings', 'formations'
        ));
    }

    public function formations()
    {
        $teacher    = auth()->user();
        $formations = Formation::where('user_id', $teacher->id)
            ->withCount('students')
            ->with('modules')
            ->get();

        return view('animateur.formations.index', compact('formations'));
    }

    public function formationShow($id)
    {
        $teacher   = auth()->user();
        $formation = Formation::where('user_id', $teacher->id)
            ->with(['modules.lessons', 'students', 'equipments'])
            ->findOrFail($id);

        $meetings = Meeting::where('formation_id', $id)
            ->where('teacher_id', $teacher->id)
            ->withCount('students')
            ->get();

        return view('animateur.formations.show', compact('formation', 'meetings'));
    }

    public function reunions()
    {
        $teacher  = auth()->user();
        $meetings = Meeting::where('teacher_id', $teacher->id)
            ->with(['formation', 'students'])
            ->orderBy('scheduled_at', 'desc')
            ->get();

        $formationsCount = Formation::where('user_id', $teacher->id)->count();

        return view('animateur.reunions.index', compact('meetings', 'formationsCount'));
    }

    public function reunionCreate()
    {
        $teacher    = auth()->user();
        $formations = Formation::where('user_id', $teacher->id)->get();

        return view('animateur.reunions.create', compact('formations'));
    }

    public function reunionStore(Request $request)
    {
        $teacher = auth()->user();
        $request->validate([
            'formation_id'      => 'required|exists:formations,id',
            'progression_level' => 'required|in:25,50,75',
            'scheduled_at'      => 'required|date|after:now',
        ]);

        $roomName = 'formation_' . $request->formation_id
            . '_prog_' . $request->progression_level
            . '_' . now()->timestamp;

        Meeting::create([
            'formation_id'      => $request->formation_id,
            'teacher_id'        => $teacher->id,
            'progression_level' => $request->progression_level,
            'scheduled_at'      => $request->scheduled_at,
            'room_link'         => $roomName,
        ]);

        return redirect()->route('animateur.reunions.index')
            ->with('success', 'Réunion créée avec succès.');
    }

    public function apprenants()
    {
        $teacher      = auth()->user();
        $formationIds = Formation::where('user_id', $teacher->id)->pluck('id');

        $apprenants = User::where('role', 'student')
            ->whereHas('studentFormations', fn ($q) => $q->whereIn('formation_id', $formationIds))
            ->with(['studentFormations' => fn ($q) => $q->whereIn('formation_id', $formationIds)])
            ->get();

        return view('animateur.apprenants.index', compact('apprenants'));
    }

    public function apprenantShow($id)
    {
        $teacher      = auth()->user();
        $formationIds = Formation::where('user_id', $teacher->id)->pluck('id');

        $apprenant = User::findOrFail($id);
        $progress  = FormationStudent::where('student_id', $id)
            ->whereIn('formation_id', $formationIds)
            ->with('formation')
            ->get();

        return view('animateur.apprenants.show', compact('apprenant', 'progress'));
    }

    public function reunionEdit($id)
    {
        $teacher = auth()->user();
        $meeting = Meeting::where('teacher_id', $teacher->id)->findOrFail($id);

        return view('animateur.reunions.edit', compact('meeting'));
    }

    public function reunionUpdate(Request $request, $id)
    {
        $teacher = auth()->user();
        $meeting = Meeting::where('teacher_id', $teacher->id)->findOrFail($id);

        $request->validate([
            'progression_level' => 'required|in:25,50,75',
            'scheduled_at'      => 'required|date',
        ]);

        $meeting->update($request->only('progression_level', 'scheduled_at'));

        return redirect()->route('animateur.reunions.index')
            ->with('success', 'Réunion mise à jour.');
    }

    public function meet($roomLink)
    {
        $teacher = auth()->user();
        $meeting = Meeting::where('room_link', $roomLink)
            ->where('teacher_id', $teacher->id)
            ->with('formation')
            ->firstOrFail();

        $token = $this->generateLivekitToken(
            $roomLink,
            'teacher_' . $teacher->id . '_' . $teacher->name,
            true
        );

        $livekitUrl = env('LIVEKIT_URL', 'wss://localhost:7880');

        return view('animateur.meet', compact('meeting', 'token', 'livekitUrl'));
    }

    private function generateLivekitToken(string $room, string $identity, bool $isHost = false): string
    {
        $apiKey    = env('LIVEKIT_API_KEY', '');
        $apiSecret = env('LIVEKIT_API_SECRET', '');
        $now       = time();

        $grants = [
            'roomJoin'       => true,
            'room'           => $room,
            'canPublish'     => true,
            'canSubscribe'   => true,
            'canPublishData' => true,
        ];
        if ($isHost) {
            $grants['roomCreate'] = true;
            $grants['roomAdmin']  = true;
        }

        $payload = [
            'iss'   => $apiKey,
            'sub'   => $identity,
            'iat'   => $now,
            'nbf'   => $now,
            'exp'   => $now + 14400,
            'video' => $grants,
        ];

        $b64 = fn ($d) => rtrim(strtr(base64_encode($d), '+/', '-_'), '=');
        $h   = $b64(json_encode(['alg' => 'HS256', 'typ' => 'JWT']));
        $p   = $b64(json_encode($payload));
        $sig = $b64(hash_hmac('sha256', "$h.$p", $apiSecret, true));

        return "$h.$p.$sig";
    }

    public function profil()
    {
        return view('animateur.profil.index', ['user' => auth()->user()]);
    }

    public function profilUpdate(Request $request)
    {
        $user = auth()->user();
        $request->validate([
            'name'    => 'required|string|max:255',
            'surname' => 'required|string|max:255',
            'phone'   => 'nullable|string',
            'address' => 'nullable|string',
            'picture' => 'nullable|image|max:2048',
        ]);

        $data = $request->only('name', 'surname', 'phone', 'address');
        if ($request->hasFile('picture')) {
            $data['picture'] = $request->file('picture')->store('profile-pictures', 'public');
        }
        $user->update($data);

        return back()->with('success', 'Profil mis à jour.');
    }
}
