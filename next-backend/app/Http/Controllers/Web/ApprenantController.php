<?php

namespace App\Http\Controllers\Web;

use App\Http\Controllers\Controller;
use App\Models\Formation;
use App\Models\FormationStudent;
use App\Models\Meeting;
use App\Models\Order;
use App\Models\Quiz;
use App\Models\Option;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class ApprenantController extends Controller
{
    public function dashboard()
    {
        $user = auth()->user();

        $stats = FormationStudent::where('student_id', $user->id)
            ->selectRaw('COUNT(*) as total')
            ->selectRaw('SUM(CASE WHEN progression < 100 THEN 1 ELSE 0 END) as en_cours')
            ->selectRaw('SUM(CASE WHEN progression >= 100 THEN 1 ELSE 0 END) as terminees')
            ->selectRaw('SUM(CASE WHEN attestation IS NOT NULL AND progression = 100 THEN 1 ELSE 0 END) as attestations')
            ->selectRaw('SUM(CASE WHEN request_internership IS NOT NULL THEN 1 ELSE 0 END) as stages_soumis')
            ->first();

        $meetingsDispo = Meeting::whereHas('formation.students', fn ($q) => $q->where('student_id', $user->id))
            ->whereDoesntHave('students', fn ($q) => $q->where('student_id', $user->id))
            ->count();

        $recentFormations = FormationStudent::where('student_id', $user->id)
            ->with('formation')
            ->latest()
            ->take(4)
            ->get();

        return view('apprenant.dashboard', compact('stats', 'meetingsDispo', 'recentFormations'));
    }

    public function mesFormations()
    {
        $user = auth()->user();

        $all = FormationStudent::where('student_id', $user->id)
            ->with(['formation.teachers', 'formation.modules'])
            ->get();

        $enCours   = $all->filter(fn ($fs) => $fs->progression < 100)->values();
        $terminees = $all->filter(fn ($fs) => $fs->progression >= 100)->values();

        return view('apprenant.formations.index', compact('enCours', 'terminees'));
    }

    public function formationShow($id)
    {
        $user = auth()->user();

        $fs = FormationStudent::where('formation_id', $id)
            ->where('student_id', $user->id)
            ->with(['formation.modules.lessons', 'formation.equipments', 'formation.teachers', 'formation.quizzes'])
            ->firstOrFail();

        $completedLessons = $fs->completed_lessons ?? [];

        $meetings = Meeting::where('formation_id', $id)
            ->where('progression_level', '<=', $fs->progression)
            ->whereDoesntHave('students', fn ($q) => $q->where('student_id', $user->id))
            ->get();

        return view('apprenant.formations.show', compact('fs', 'meetings', 'completedLessons'));
    }

    public function quiz($id)
    {
        $user = auth()->user();

        $fs = FormationStudent::where('formation_id', $id)
            ->where('student_id', $user->id)
            ->firstOrFail();

        $quiz = Quiz::where('formation_id', $id)
            ->with('questions.options')
            ->inRandomOrder()
            ->first();

        if (!$quiz) {
            return back()->with('error', 'Aucun quiz disponible pour cette formation.');
        }

        return view('apprenant.formations.quiz', compact('quiz', 'fs', 'id'));
    }

    public function submitQuiz(Request $request, $id)
    {
        $request->validate([
            'answers' => 'required|array',
            'quiz_id' => 'required|exists:quizzes,id',
        ]);

        $user = auth()->user();
        $fs   = FormationStudent::where('formation_id', $id)
            ->where('student_id', $user->id)
            ->firstOrFail();

        $quiz  = Quiz::with('questions.options')->findOrFail($request->quiz_id);
        $score = 0;
        $total = $quiz->questions->count();

        foreach ($request->answers as $qId => $oId) {
            $question = $quiz->questions->firstWhere('id', $qId);
            $option   = $question?->options->firstWhere('id', $oId);
            if ($option && $option->answer) {
                $score++;
            }
        }

        $pct = $total > 0 ? round(($score / $total) * 100, 1) : 0;
        $fs->update(['score' => $pct, 'progression' => 100]);

        // Génération attestation PDF
        try {
            $formation = Formation::findOrFail($id);
            $pdf = \Barryvdh\DomPDF\Facade\Pdf::loadView('attestation', [
                'student_name'   => $user->name . ' ' . $user->surname,
                'formation_name' => $formation->name,
                'score'          => $pct,
                'date'           => now()->format('d/m/Y'),
            ]);
            $pdfPath = 'attestations/attestation_' . $user->id . '_' . $id . '_' . now()->timestamp . '.pdf';
            Storage::disk('public')->put($pdfPath, $pdf->output());
            $fs->update(['attestation' => $pdfPath]);
        } catch (\Throwable $e) {
            // DomPDF peut ne pas être configuré — on continue sans bloquer
        }

        return redirect()->route('apprenant.formations.show', $id)
            ->with('success', "Quiz terminé ! Votre score : {$pct}% — Attestation disponible dans Certificats.");
    }

    public function catalogue()
    {
        $user        = auth()->user();
        $inscriptions = FormationStudent::where('student_id', $user->id)->pluck('formation_id');
        $formations  = Formation::with(['teachers', 'modules'])
            ->whereNotIn('id', $inscriptions)
            ->get();

        return view('apprenant.catalogue.index', compact('formations'));
    }

    public function catalogueShow($id)
    {
        $user        = auth()->user();
        $formation   = Formation::with(['modules.lessons', 'equipments', 'teachers'])->findOrFail($id);
        $isSubscribed = FormationStudent::where('formation_id', $id)->where('student_id', $user->id)->exists();

        return view('apprenant.catalogue.show', compact('formation', 'isSubscribed'));
    }

    public function certificats()
    {
        $user       = auth()->user();
        $attestations = FormationStudent::where('student_id', $user->id)
            ->whereNotNull('attestation')
            ->with('formation')
            ->get();

        return view('apprenant.certificats.index', compact('attestations'));
    }

    public function orders()
    {
        $user   = auth()->user();
        $orders = Order::where('student_id', $user->id)
            ->with('equipment_orders.equipment')
            ->latest()
            ->get();

        return view('apprenant.orders.index', compact('orders'));
    }

    public function stage()
    {
        $user   = auth()->user();
        $stages = FormationStudent::where('student_id', $user->id)
            ->whereNotNull('request_internership')
            ->with('formation')
            ->get();

        return view('apprenant.stage.index', compact('stages'));
    }

    public function inscription($id)
    {
        $user      = auth()->user();
        $formation = Formation::with(['modules', 'teachers'])->findOrFail($id);

        $alreadySubscribed = FormationStudent::where('formation_id', $id)
            ->where('student_id', $user->id)
            ->exists();

        if ($alreadySubscribed) {
            return redirect()->route('apprenant.formations.show', $id)
                ->with('success', 'Vous êtes déjà inscrit à cette formation.');
        }

        $kkiapayKey = env('KKIAPAY_PUBLIC_KEY', '');

        return view('apprenant.catalogue.inscription', compact('formation', 'kkiapayKey'));
    }

    public function inscriptionConfirm(Request $request, $id)
    {
        $user = auth()->user();

        $request->validate([
            'transaction_id' => 'required|string',
        ]);

        $alreadyExists = FormationStudent::where('formation_id', $id)
            ->where('student_id', $user->id)
            ->exists();

        if (!$alreadyExists) {
            FormationStudent::create([
                'formation_id' => $id,
                'student_id'   => $user->id,
                'progression'  => 0,
            ]);
        }

        return redirect()->route('apprenant.formations.show', $id)
            ->with('success', 'Inscription confirmée ! Bonne formation.');
    }

    public function profil()
    {
        return view('apprenant.profil.index', ['user' => auth()->user()]);
    }

    public function updateProfil(Request $request)
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

        return back()->with('success', 'Profil mis à jour avec succès.');
    }

    // ── Meetings ──────────────────────────────────────

    public function meet()
    {
        $user     = auth()->user();
        $enrolled = FormationStudent::where('student_id', $user->id)
            ->with('formation')
            ->get();

        $available = collect();
        $completed = collect();

        foreach ($enrolled as $fs) {
            // Réunions disponibles : palier atteint ET pas encore faites (pas de N+1 grâce à whereDoesntHave)
            $available = $available->merge(
                Meeting::where('formation_id', $fs->formation_id)
                    ->where('progression_level', '<=', $fs->progression)
                    ->whereDoesntHave('students', fn ($q) => $q->where('student_id', $user->id))
                    ->with(['formation', 'teacher'])
                    ->get()
            );

            // Réunions complétées
            $completed = $completed->merge(
                Meeting::where('formation_id', $fs->formation_id)
                    ->whereHas('students', fn ($q) => $q->where('student_id', $user->id))
                    ->with(['formation', 'teacher'])
                    ->get()
            );
        }

        // Jalons par formation : statut (locked / pending / available / completed)
        $completedLevelsByFormation = $completed
            ->groupBy('formation_id')
            ->map(fn ($g) => $g->pluck('progression_level')->unique()->toArray());

        $milestones = $enrolled->map(function ($fs) use ($available, $completedLevelsByFormation) {
            $completedLevels = $completedLevelsByFormation->get($fs->formation_id, []);

            $levels = array_map(function ($level) use ($fs, $available, $completedLevels) {
                if (in_array($level, $completedLevels)) {
                    return ['level' => $level, 'status' => 'completed', 'meeting' => null];
                }
                $meeting = $available
                    ->where('formation_id', $fs->formation_id)
                    ->where('progression_level', $level)
                    ->first();

                if ($fs->progression >= $level && $meeting) {
                    return ['level' => $level, 'status' => 'available', 'meeting' => $meeting];
                }
                if ($fs->progression >= $level) {
                    // Palier atteint mais aucune réunion programmée
                    return ['level' => $level, 'status' => 'pending', 'meeting' => null];
                }
                return ['level' => $level, 'status' => 'locked', 'meeting' => null];
            }, [25, 50, 75]);

            return [
                'formation_id' => $fs->formation_id,
                'formation'    => $fs->formation,
                'progression'  => $fs->progression,
                'levels'       => $levels,
            ];
        });

        return view('apprenant.meet.index', compact('available', 'completed', 'milestones'));
    }

    public function meetRoom($roomLink)
    {
        $user    = auth()->user();
        $meeting = Meeting::where('room_link', $roomLink)
            ->with(['formation', 'teacher'])
            ->firstOrFail();

        // Vérifier l'éligibilité
        $fs = FormationStudent::where('student_id', $user->id)
            ->where('formation_id', $meeting->formation_id)
            ->first();

        if (!$fs || $fs->progression < $meeting->progression_level) {
            return redirect()->route('apprenant.meet.index')
                ->with('error', 'Niveau de progression insuffisant pour cette réunion.');
        }

        // Enregistrer la présence si pas encore fait
        $alreadyJoined = $user->meetings()
            ->where('meetings.formation_id', $meeting->formation_id)
            ->wherePivot('level', $meeting->progression_level)
            ->exists();

        if (!$alreadyJoined) {
            $meeting->students()->attach($user->id, ['level' => $meeting->progression_level]);
        }

        $token      = $this->generateLivekitToken($roomLink, 'student_' . $user->id . '_' . $user->name, false);
        $livekitUrl = env('LIVEKIT_URL', 'wss://localhost:7880');

        return view('apprenant.meet.room', compact('meeting', 'token', 'livekitUrl'));
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
}
