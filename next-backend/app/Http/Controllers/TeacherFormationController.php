<?php

// namespace App\Http\Controllers;

// use Illuminate\Http\Request;
// use App\Models\Formation;
// use App\Models\User;

// class TeacherFormationController extends Controller
// {
//     /**
//      * GET /teachers
//      * Liste tous les enseignants
//      */
//     public function index()
//     {
//         $teachers = User::where('role', 'teacher')->get();

//         return response()->json([
//             'status' => 'success',
//             'data' => $teachers,
//         ]);
//     }

//     /**
//      * GET /teachers/{id}
//      * Affiche les formations assignées à un enseignant
//      */
//     public function show($id)
//     {
//         $teacher = User::with(['formations' => function ($query) {
//             $query->with(['modules', 'equipments']);
//         }])->where('role', 'teacher')->findOrFail($id);

//         return response()->json([
//             'status' => 'success',
//             'data' => [
//                 'teacher' => $teacher,
//                 'formations' => $teacher->formations,
//             ],
//         ]);
//     }

//     /**
//      * GET /teachers/unassigned-formations
//      * Liste les formations non assignées à un enseignant
//      */
// public function unassignedFormations()
// {
//     $formations = Formation::whereNull('user_id')
//         ->with(['modules', 'equipments']) // si tu veux les relations associées
//         ->get();

//     return response()->json([
//         'status' => 'success',
//         'data' => $formations,
//     ]);
// }


//     /**
//      * POST /teachers/assign/{formationId}
//      * Assigne un enseignant à une formation
//      */
//     public function assignTeacher(Request $request, $formationId)
//     {
//         $request->validate([
//             'teacher_id' => 'required|exists:users,id',
//         ]);

//         $teacher = User::where('role', 'teacher')->findOrFail($request->teacher_id);
//         $formation = Formation::findOrFail($formationId);

//         $formation->update(['user_id' => $teacher->id]);

//         return response()->json([
//             'status' => 'success',
//             'message' => 'Enseignant assigné avec succès',
//             'data' => $formation->load(['user', 'modules.lessons']),
//         ]);
//     }

//     /**
//      * Summary of unassignedTeachers
//      *
//      */
//     public function unassignedTeachers()
// {
//     $teachers = User::where('role', 'teacher')
//         ->whereDoesntHave('formations') // enseignants sans formations
//         ->get();

//     return response()->json([
//         'status' => 'success',
//         'data' => $teachers
//     ]);
// }


//     /**
//      * DELETE /teachers/unassign/{formationId}
//      * Désassigne un enseignant d’une formation
//      */
//     public function unassignTeacher($formationId)
//     {
//         $formation = Formation::findOrFail($formationId);
//         $formation->update(['user_id' => null]);

//         return response()->json([
//             'status' => 'success',
//             'message' => 'Enseignant désassigné avec succès',
//             'data' => $formation,
//         ]);
//     }

//     /**
//      * POST /teachers (non implémenté)
//      */
//     public function store(Request $request)
//     {
//         return response()->json([
//             'status' => 'error',
//             'message' => 'Méthode non implémentée.',
//         ], 501);
//     }

//     /**
//      * PUT/PATCH /teachers/{id} (non implémenté)
//      */
//     public function update(Request $request, $id)
//     {
//         return response()->json([
//             'status' => 'error',
//             'message' => 'Méthode non implémentée.',
//         ], 501);
//     }

//     /**
//      * DELETE /teachers/{id} (non implémenté)
//      */
//     public function destroy($id)
//     {
//         return response()->json([
//             'status' => 'error',
//             'message' => 'Méthode non implémentée.',
//         ], 501);
//     }

//     public function countFormation($id){
//             $teachers = User::where('role', 'teacher')
//                 ->withCount('formations')
//                 ->get()
//                 ->map(fn($t) => [
//                     'teacher_id' => $t->id,
//                     'count' => $t->formations_count,
//                 ]);

//             return response()->json([
//                 'status' => 'success',
//                 'data' => $teachers,
//             ]);
//     }
// }



namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Formation;
use App\Models\User;

class TeacherFormationController extends Controller
{
    /**
     * GET /teachers
     * Liste tous les enseignants avec pagination
     */
    public function index()
    {
        $teachers = User::where('role', 'teacher')->paginate(10);

        return response()->json([
            'status' => 'success',
            'data' => $teachers,
        ]);
    }

    /**
     * GET /teachers/{id}
     * Affiche un enseignant avec ses formations, modules et équipements
     * @param int $id ID de l'enseignant
     * @return \Illuminate\Http\JsonResponse
     */
    public function show($id)
    {
        $teacher = User::with('teacherFormations.modules', 'teacherFormations.equipments')
                    ->where('role', 'teacher')
                    ->findOrFail($id);

        return response()->json([
            'status' => 'success',
            'data' => [
                'teacher' => $teacher->makeHidden('formations'), // Cache les formations du parent
                'formations' => $teacher->formations // Les formations avec relations
            ]
        ]);
    }

    /**
     * GET /teachers/unassigned-formations
     * Liste les formations non assignées à un enseignant
     */
    public function unassignedFormations()
    {
        $formations = Formation::whereNull('user_id')
            ->with(['modules', 'equipments'])
            ->get();

        return response()->json([
            'status' => 'success',
            'data' => $formations,
        ]);
    }

    /**
     * POST /teachers/assign/{formationId}
     * Assigne un enseignant à une formation
     * @param Request $request
     * @param int $formationId ID de la formation
     * @return \Illuminate\Http\JsonResponse
     */
    public function assignTeacher(Request $request, $formationId)
    {
        $request->validate([
            'teacher_id' => 'required|exists:users,id,role,teacher',
        ]);

        $formation = Formation::findOrFail($formationId);
        $formation->update(['user_id' => $request->teacher_id]);

        return response()->json([
            'status' => 'success',
            'message' => 'Enseignant assigné avec succès',
            'data' => $formation->load(['user', 'modules.lessons']),
        ]);
    }

    /**
     * GET /teachers/unassigned
     * Liste les enseignants sans formation assignée
     */
    public function unassignedTeachers()
    {
        $teachers = User::where('role', 'teacher')
            ->whereDoesntHave('teacherFormations')
            ->get();

        return response()->json([
            'status' => 'success',
            'data' => $teachers
        ]);
    }

    /**
     * DELETE /teachers/unassign/{formationId}
     * Désassigne un enseignant d'une formation
     * @param int $formationId ID de la formation
     * @return \Illuminate\Http\JsonResponse
     */
    public function unassignTeacher($formationId)
    {
        $formation = Formation::findOrFail($formationId);
        $formation->update(['user_id' => null]);

        return response()->json([
            'status' => 'success',
            'message' => 'Enseignant désassigné avec succès',
            'data' => $formation,
        ]);
    }

    public function countFormations(Request $request)
    {
        $request->validate([
            'teacher_id' => 'nullable|integer|exists:users,id,role,teacher'
        ]);

        $baseQuery = User::where('role', 'teacher')
            ->leftJoin('formations', 'users.id', '=', 'formations.user_id')
            ->select('users.id', 'users.name', 'users.surname', 'users.gender', 'users.email', 'users.picture')
            ->selectRaw('count(formations.id) as formations_count')
            ->groupBy('users.id', 'users.name', 'users.surname', 'users.gender', 'users.email', 'users.picture');

        if ($request->filled('teacher_id')) {
            $teacher = $baseQuery->where('users.id', $request->teacher_id)->firstOrFail();
            
            return response()->json([
                'status' => 'success',
                'data' => [
                    'teacher_id' => $teacher->id,
                    'teacher_name' => $teacher->name,
                    'teacher_surname' => $teacher->surname,
                    'teacher_email' => $teacher->email,
                    'teacher_picture' => $teacher->picture,
                    'formations_count' => (int)$teacher->formations_count,
                ]
            ]);
        }

        $teachers = $baseQuery->get();

        return response()->json([
            'status' => 'success',
            'data' => $teachers
        ]);
    }

    //La fonction qui permet à l"animateur de voir ses apprenants qui suivent les formations qui lui sont assignées
    public function teacherStudents()
    {
        $user = auth()->user();

        if ($user->role !== 'teacher') {
            return response()->json([
                'status' => 'error',
                'message' => 'Non autorisé'
            ], 403);
        }

        $formations = $user->teacherFormations()
            ->with(['students', 'modules.lessons'])
            ->get();

        // Table associative temporaire pour regrouper les apprenants
        $studentsGrouped = [];

        foreach ($formations as $formation) {
            foreach ($formation->students as $student) {
                // Clé unique par apprenant
                $key = $student->id;

                // Récupération de la progression et des leçons complétées
                $formationStudent = \App\Models\FormationStudent::where('formation_id', $formation->id)
                    ->where('student_id', $student->id)
                    ->first();

                if (!isset($studentsGrouped[$key])) {
                    $studentsGrouped[$key] = [
                        'id'                => $student->id,
                        'name'              => $student->name,
                        'surname'           => $student->surname,
                        'gender'            => $student->gender,
                        'picture'           => $student->picture,
                        'birth_date'        => $student->birth_date,
                        'address'           => $student->address,
                        'phone'             => $student->phone,
                        'email'             => $student->email,
                        'formations'        => [],
                    ];
                }

                // Ajouter la formation courante à la liste des formations de l'apprenant
                $studentsGrouped[$key]['formations'][] = [
                    'id'                => $formation->id,
                    'name'              => $formation->name,
                    'progression'       => $formationStudent->progression ?? 0,
                    'completed_lessons' => $formationStudent->completed_lessons ?? [],
                    'modules'           => $formation->modules->map(function ($module) {
                        return [
                            'id'       => $module->id,
                            'title'    => $module->title,
                            'lessons'  => $module->lessons->map(function ($lesson) {
                                return [
                                    'id'    => $lesson->id,
                                    'title' => $lesson->title,
                                ];
                            }),
                        ];
                    }),
                ];
            }
        }

        // Réindexer pour renvoyer un array simple
        $students = array_values($studentsGrouped);

        return response()->json([
            'status' => 'success',
            'data'   => $students
        ]);
    }


    //les détails d'un apprenants

    public function teacherStudentDetail($student_id)
    {
        $user = auth()->user();

        if ($user->role !== 'teacher') {
            return response()->json([
                'status' => 'error',
                'message' => 'Non autorisé'
            ], 403);
        }

        // Récupérer toutes les formations du formateur où l'étudiant est inscrit, avec modules/leçons
        $formations = $user->teacherFormations()
            ->whereHas('students', function ($query) use ($student_id) {
                $query->where('users.id', $student_id);
            })
            ->with(['modules.lessons'])
            ->get();

        if ($formations->isEmpty()) {
            return response()->json([
                'status' => 'error',
                'message' => 'Cet apprenant ne fait pas partie de vos formations'
            ], 404);
        }

        // Récupérer l'étudiant (infos générales) depuis la première formation (présumé identique partout)
        $student = $formations->first()->students->where('id', $student_id)->first();

        // Préparer les formations avec progression et leçons complétées pour chacune
        $formationsData = $formations->map(function ($formation) use ($student_id) {
            $formationStudent = \App\Models\FormationStudent::where('formation_id', $formation->id)
                ->where('student_id', $student_id)
                ->first();

            return [
                'id'                => $formation->id,
                'title'             => $formation->name,
                'progression'       => $formationStudent->progression ?? 0,
                'completed_lessons' => $formationStudent->completed_lessons ?? [],
                'modules'           => $formation->modules->map(function ($module) {
                    return [
                        'id'      => $module->id,
                        'title'   => $module->title,
                        'lessons' => $module->lessons->map(function ($lesson) {
                            return [
                                'id'    => $lesson->id,
                                'title' => $lesson->title,
                            ];
                        }),
                    ];
                }),
            ];
        });

        return response()->json([
            'status' => 'success',
            'data' => [
                'id'        => $student->id,
                'name'      => $student->name,
                'surname'   => $student->surname,
                'gender'    => $student->gender,
                'picture'   => $student->picture,
                'birth_date'=> $student->birth_date,
                'address'   => $student->address,
                'phone'     => $student->phone,
                'email'     => $student->email,
                'formations'=> $formationsData,
            ]
        ]);
    }



    
}