<?php

namespace App\Http\Controllers\Web;

use App\Http\Controllers\Controller;
use App\Models\Equipment;
use App\Models\Formation;
use App\Models\User;

class PublicController extends Controller
{
    public function home()
    {
        $featured   = Formation::with('teachers')->withCount('students')->latest()->take(6)->get();
        $statsCount = [
            'formations' => Formation::count(),
            'students'   => User::where('role', 'student')->count(),
            'teachers'   => User::where('role', 'teacher')->count(),
        ];

        return view('public.home', compact('featured', 'statsCount'));
    }

    public function formations()
    {
        $formations = Formation::with(['teachers', 'modules'])
            ->withCount('students')
            ->latest()
            ->get();

        return view('public.formations', compact('formations'));
    }

    public function formationShow($id)
    {
        $formation = Formation::with(['modules.lessons', 'teachers', 'equipments'])->findOrFail($id);

        return view('public.formation', compact('formation'));
    }

    public function shop()
    {
        $equipments = Equipment::latest()->get();

        return view('public.shop', compact('equipments'));
    }

    public function about()
    {
        return view('public.about');
    }

    public function unauthorized()
    {
        return view('public.unauthorized');
    }
}
