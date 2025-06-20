        <?php
        //next-backend/routes/api.php
        use App\Http\Controllers\FormationStudentController;
        use App\Http\Controllers\LessonController;
        use App\Http\Controllers\OrderController;
        use App\Http\Controllers\RequestCourseController;
        use App\Http\Controllers\TeacherFormationController;
        use Illuminate\Http\Request;
        use Illuminate\Support\Facades\Route;   
        use App\Http\Controllers\ProfileController;
        use App\Http\Controllers\EquipmentController;
        use App\Http\Controllers\ModuleController;
        use App\Http\Controllers\FormationController;
        use App\Http\Controllers\UserController;



        require __DIR__ . '/auth.php';


        Route::middleware('auth:sanctum')->post('/profile/update', [ProfileController::class, 'update']);
        Route::middleware('auth:sanctum')->post('/profile/password', [ProfileController::class, 'updatePassword']);


        Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
            $user = $request->user();
            $role = $user->role;

            return response()->json([
                'id' => $user->id,
                'name' => $user->name,
                'surname' => $user->surname,
                'email' => $user->email,
                'role' => $user->role,
                'picture_url' => $user->picture_url,
            ]);
        });

        Route::post('/users', [UserController::class, 'store'])->withoutMiddleware(['auth:sanctum']);

        Route::apiResource('equipments', EquipmentController::class);
        Route::get('/equipments/{id}', [EquipmentController::class, 'show']);
        Route::apiResource('formations', FormationController::class);
        Route::apiResource('users', UserController::class);

        Route::apiResource('modules', ModuleController::class);
        Route::get('moduleSpeciales/{module}', [ModuleController::class, 'moduleSpeciale']);

        Route::apiResource('                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            ', LessonController::class);
        Route::apiResource('orders', OrderController::class);
        Route::apiResource('requests', RequestCourseController::class);

        // api.php

        Route::get('teachers-formations-count', function () {
            $teachers = User::where('role', 'teacher')
                ->withCount('formations')
                ->get()
                ->map(fn($t) => [
                    'teacher_id' => $t->id,
                    'count' => $t->formations_count,
                ]);

            return response()->json([
                'status' => 'success',
                'data' => $teachers,
            ]);
        });



        Route::get('teachers/unassigned-formations', [TeacherFormationController::class, 'unassignedFormations']);
        Route::get('/teachers/unassigned', [TeacherFormationController::class, 'unassignedTeachers']);


        Route::post('teachers/assign/{formationId}', [TeacherFormationController::class, 'assignTeacher']);
        Route::delete('teachers/unassign/{formationId}', [TeacherFormationController::class, 'unassignTeacher']);

        Route::apiResource('teachers', TeacherFormationController::class);






       

        Route::post('/formation-student', [FormationStudentController::class, 'store']);
        Route::get('/student/{id}/formations', [FormationStudentController::class, 'formationsByStudent']);
        Route::get('/formation/{id}/students', [FormationStudentController::class, 'studentsByFormation']);


                ?>