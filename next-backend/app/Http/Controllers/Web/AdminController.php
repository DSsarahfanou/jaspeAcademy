<?php

namespace App\Http\Controllers\Web;

use App\Http\Controllers\Controller;
use App\Models\Equipment;
use App\Models\Formation;
use App\Models\FormationStudent;
use App\Models\Meeting;
use App\Models\Module;
use App\Models\Order;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class AdminController extends Controller
{
    public function dashboard()
    {
        $stats = [
            'formations' => Formation::count(),
            'users'      => User::count(),
            'students'   => User::where('role', 'student')->count(),
            'teachers'   => User::where('role', 'teacher')->count(),
            'orders'     => Order::count(),
            'equipments' => Equipment::count(),
        ];

        $recentOrders = Order::latest()->take(5)->with(['student', 'equipment_orders'])->get();
        $recentUsers  = User::latest()->take(6)->get();

        return view('admin.dashboard', compact('stats', 'recentOrders', 'recentUsers'));
    }

    // ── Formations ──────────────────────────────────────

    public function formations()
    {
        $formations = Formation::with('teachers')
            ->withCount('students')
            ->latest()
            ->get();

        return view('admin.formations.index', compact('formations'));
    }

    public function formationShow($id)
    {
        $formation = Formation::with([
            'modules.lessons', 'equipments', 'teachers',
            'quizzes.questions.options', 'students',
        ])->findOrFail($id);

        return view('admin.formations.show', compact('formation'));
    }

    public function formationCreate()
    {
        $teachers   = User::where('role', 'teacher')->get();
        $equipments = Equipment::all();

        return view('admin.formations.create', compact('teachers', 'equipments'));
    }

    public function formationStore(Request $request)
    {
        $request->validate([
            'name'              => 'required|string|max:255',
            'prerequisites'     => 'required|string',
            'price'             => 'required|numeric|min:0',
            'formation_details' => 'required|string',
            'teacher_id'        => 'required|exists:users,id',
            'picture'           => 'nullable|image|max:10240',
        ]);

        $picturePath = null;
        if ($request->hasFile('picture')) {
            $picturePath = $request->file('picture')->store('formations', 'public');
        }

        $formation = Formation::create([
            'user_id'           => $request->teacher_id,
            'name'              => $request->name,
            'prerequisites'     => $request->prerequisites,
            'price'             => $request->price,
            'formation_details' => $request->formation_details,
            'picture'           => $picturePath,
        ]);

        return redirect()->route('admin.formations.show', $formation->id)
            ->with('success', 'Formation créée avec succès.');
    }

    public function formationEdit($id)
    {
        $formation  = Formation::with(['modules.lessons', 'equipments'])->findOrFail($id);
        $teachers   = User::where('role', 'teacher')->get();
        $equipments = Equipment::all();

        return view('admin.formations.edit', compact('formation', 'teachers', 'equipments'));
    }

    public function formationUpdate(Request $request, $id)
    {
        $formation = Formation::findOrFail($id);
        $request->validate([
            'name'              => 'sometimes|string|max:255',
            'prerequisites'     => 'sometimes|string',
            'price'             => 'sometimes|numeric|min:0',
            'formation_details' => 'sometimes|string',
            'picture'           => 'nullable|image|max:10240',
            'teacher_id'        => 'sometimes|exists:users,id',
        ]);

        $data = $request->only('name', 'prerequisites', 'price', 'formation_details');
        if ($request->filled('teacher_id')) {
            $data['user_id'] = $request->teacher_id;
        }
        if ($request->hasFile('picture')) {
            if ($formation->picture) Storage::disk('public')->delete($formation->picture);
            $data['picture'] = $request->file('picture')->store('formations', 'public');
        }
        $formation->update($data);

        return redirect()->route('admin.formations.show', $id)
            ->with('success', 'Formation mise à jour.');
    }

    public function formationDestroy($id)
    {
        $formation = Formation::findOrFail($id);
        if ($formation->picture) Storage::disk('public')->delete($formation->picture);
        $formation->delete();

        return redirect()->route('admin.formations.index')
            ->with('success', 'Formation supprimée.');
    }

    // ── Équipements ──────────────────────────────────────

    public function equipments()
    {
        $equipments = Equipment::withCount('formations')->latest()->get();

        return view('admin.equipments.index', compact('equipments'));
    }

    public function equipmentShow($id)
    {
        $equipment = Equipment::with('formations')->findOrFail($id);

        return view('admin.equipments.show', compact('equipment'));
    }

    // ── Enseignants ──────────────────────────────────────

    public function teachers()
    {
        $teachers    = User::where('role', 'teacher')->withCount('teacherFormations')->get();
        $unassigned  = Formation::whereNull('user_id')->orWhere('user_id', 0)->get();

        return view('admin.teachers.index', compact('teachers', 'unassigned'));
    }

    public function teacherShow($id)
    {
        $teacher    = User::findOrFail($id);
        $formations = Formation::where('user_id', $id)->withCount('students')->get();

        return view('admin.teachers.show', compact('teacher', 'formations'));
    }

    // ── Commandes ──────────────────────────────────────

    public function orders()
    {
        $orders = Order::with(['student', 'equipment_orders'])->latest()->get();

        return view('admin.orders.index', compact('orders'));
    }

    // ── Demandes de stage ──────────────────────────────────────

    public function internshipRequests()
    {
        $requests = FormationStudent::whereNotNull('request_internership')
            ->with(['student', 'formation'])
            ->latest()
            ->get();

        return view('admin.internship.index', compact('requests'));
    }

    public function internshipShow($id)
    {
        $internship = FormationStudent::with(['student', 'formation'])->findOrFail($id);

        return view('admin.internship.show', compact('internship'));
    }

    public function internshipUpdate(Request $request, $id)
    {
        $fs = FormationStudent::findOrFail($id);
        $request->validate(['status' => 'required|in:approved,rejected,pending']);
        $fs->update(['request_status' => $request->status]);

        return back()->with('success', 'Statut de la demande mis à jour.');
    }

    // ── Gestion des comptes ──────────────────────────────────────

    public function accounts()
    {
        $users = User::latest()->paginate(20);

        return view('admin.accounts.index', compact('users'));
    }

    public function accountUpdate(Request $request, $id)
    {
        $user = User::findOrFail($id);
        $request->validate(['role' => 'required|in:student,teacher,admin']);
        $user->update(['role' => $request->role]);

        return back()->with('success', 'Rôle mis à jour.');
    }

    public function accountDestroy($id)
    {
        User::findOrFail($id)->delete();

        return back()->with('success', 'Compte supprimé.');
    }

    // ── Profil ──────────────────────────────────────

    public function profil()
    {
        return view('admin.profil.index', ['user' => auth()->user()]);
    }

    public function profilUpdate(Request $request)
    {
        $user = auth()->user();
        $request->validate([
            'name'    => 'required|string|max:255',
            'surname' => 'required|string|max:255',
            'phone'   => 'nullable|string',
            'picture' => 'nullable|image|max:2048',
        ]);
        $data = $request->only('name', 'surname', 'phone');
        if ($request->hasFile('picture')) {
            $data['picture'] = $request->file('picture')->store('profile-pictures', 'public');
        }
        $user->update($data);

        return back()->with('success', 'Profil administrateur mis à jour.');
    }
}
