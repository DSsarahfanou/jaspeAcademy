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
        use App\Http\Controllers\QuizController;



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
        Route::get('moduleSpeciales/{module}', [ModuleController::class, 'moduleSpeciale']);//sallai

        Route::apiResource('     /api/                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      ', LessonController::class);
        Route::apiResource('orders', OrderController::class);
        Route::apiResource('requests', RequestCourseController::class);


        Route::get('teachers/count-formations', [TeacherFormationController::class, 'countFormations']);

        Route::get('teachers/unassigned-formations', [TeacherFormationController::class, 'unassignedFormations']);
        Route::get('/teachers/unassigned', [TeacherFormationController::class, 'unassignedTeachers']);


        Route::post('teachers/assign/{formationId}', [TeacherFormationController::class, 'assignTeacher']);
        Route::delete('teachers/unassign/{formationId}', [TeacherFormationController::class, 'unassignTeacher']);

        Route::apiResource('teachers', TeacherFormationController::class);

        Route::get('teachers/{id} ', [TeacherFormationController::class, 'show($id)']);




        // Routes protégées par l'authentification
        //Route::middleware('auth:sanctum')->group(function () {
            Route::get('/formations/{formationId}/quiz', [QuizController::class, 'showRandomQuiz']);
            Route::post('/formations/{formationId}/quiz/submit', [QuizController::class, 'submitQuiz']);
        //});



       

        Route::post('/formation-student', [FormationStudentController::class, 'store']);
        Route::get('/student/{id}/formations', [FormationStudentController::class, 'formationsByStudent']);
        Route::get('/formation/{id}/students', [FormationStudentController::class, 'studentsByFormation']);


                ?>