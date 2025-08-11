        <?php
        // //next-backend/routes/api.php
        // use App\Http\Controllers\FormationStudentController;
        // use App\Http\Controllers\LessonController;
        // use App\Http\Controllers\OrderController;
        // use App\Http\Controllers\RequestCourseController;
        // use App\Http\Controllers\TeacherFormationController;
        // use Illuminate\Http\Request;
        // use Illuminate\Support\Facades\Route;   
        // use App\Http\Controllers\ProfileController;
        // use App\Http\Controllers\EquipmentController;
        // use App\Http\Controllers\ModuleController;
        // use App\Http\Controllers\FormationController;
        // use App\Http\Controllers\UserController;
        // use App\Http\Controllers\QuizController;
        



        // require __DIR__ . '/auth.php';


        // Route::middleware('auth:sanctum')->post('/profile/update', [ProfileController::class, 'update']);
        // Route::middleware('auth:sanctum')->post('/profile/password', [ProfileController::class, 'updatePassword']);


        // Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
        //     $user = $request->user();
        //     $role = $user->role;

        //     return response()->json([
        //         'id' => $user->id,
        //         'name' => $user->name,
        //         'surname' => $user->surname,
        //         'email' => $user->email,
        //         'role' => $user->role,
        //         'picture_url' => $user->picture_url,
        //     ]);
        // });

        // Route::post('/login', [AuthenticatedSessionController::class, 'store']);

        // Route::post('/users', [UserController::class, 'store'])->withoutMiddleware(['auth:sanctum']);

        // Route::apiResource('equipments', EquipmentController::class);
        // Route::get('/equipments/{id}', [EquipmentController::class, 'show']);
        // Route::apiResource('formations', FormationController::class);
        // Route::apiResource('users', UserController::class);

        // Route::apiResource('modules', ModuleController::class);
        // Route::get('moduleSpeciales/{module}', [ModuleController::class, 'moduleSpeciale']);//sallai

        // Route::apiResource('     /api/                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      ', LessonController::class);
        // Route::apiResource('orders', OrderController::class);
        // Route::apiResource('requests', RequestCourseController::class);


        // Route::get('teachers/count-formations', [TeacherFormationController::class, 'countFormations']);

        // Route::get('teachers/unassigned-formations', [TeacherFormationController::class, 'unassignedFormations']);
        // Route::get('/teachers/unassigned', [TeacherFormationController::class, 'unassignedTeachers']);


        // Route::post('teachers/assign/{formationId}', [TeacherFormationController::class, 'assignTeacher']);
        // Route::delete('teachers/unassign/{formationId}', [TeacherFormationController::class, 'unassignTeacher']);

        // Route::apiResource('teachers', TeacherFormationController::class);

        // Route::get('teachers/{id} ', [TeacherFormationController::class, 'show($id)']);




        // // Routes protégées par l'authentification
        // Route::middleware('auth:sanctum')->group(function () {
        //     Route::get('/formations/{formationId}/quiz', [QuizController::class, 'showRandomQuiz']);
        //     Route::post('/formations/{formationId}/quiz/submit', [QuizController::class, 'submitQuiz']);
        //     Route::post('/formation-student', [FormationStudentController::class, 'store']);
        // });




       


        // Route::get('/student/{id}/formations', [FormationStudentController::class, 'formationsByStudent']);
        // Route::get('/formation/{id}/students', [FormationStudentController::class, 'studentsByFormation']);








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
        use App\Http\Controllers\LiveKitController;
        use App\Http\Controllers\MeetingController;
        use App\Http\Controllers\DashboardController;



        require __DIR__ . '/auth.php';


        Route::middleware('auth:sanctum')->post('/profile/update', [UserController::class, 'update']);
        Route::middleware('auth:sanctum')->post('/profile/password', [ProfileController::class, 'updatePassword']);


        Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
            $user = $request->user();
            $role = $user->role;

            return response()->json([
                'id' => $user->id,
                'name' => $user->name,
                'surname' => $user->surname,
                'email' => $user->email,
                'phone' => $user->phone,
                'address' => $user->address,
                'birth_date' => $user->birth_date,
                'gender' => $user->gender,
                'role' => $user->role,
                'picture_url' => $user->picture_url,
            ]);
        });

        Route::post('/login', [AuthenticatedSessionController::class, 'store']);

        Route::post('/users', [UserController::class, 'store'])->withoutMiddleware(['auth:sanctum']);

        Route::apiResource('equipments', EquipmentController::class);
        Route::get('/equipments/{id}', [EquipmentController::class, 'show']);
        Route::apiResource('formations', FormationController::class);
        Route::apiResource('users', UserController::class);

        Route::apiResource('modules', ModuleController::class);
        Route::get('moduleSpeciales/{module}', [ModuleController::class, 'moduleSpeciale']);//sallai

        Route::apiResource('     /api/                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      ', LessonController::class);
        Route::apiResource('orders', OrderController::class);
         Route::post('/orders', [OrderController::class, 'store']);
         Route::get('/orders/{order}', [OrderController::class, 'show'])->name('orders.show');   
        Route::get('/orders_student/', [OrderController::class, 'showOrderStudent']);    
        Route::apiResource('requests', RequestCourseController::class);


        Route::get('teachers/count-formations', [TeacherFormationController::class, 'countFormations']);

        Route::get('teachers/unassigned-formations', [TeacherFormationController::class, 'unassignedFormations']);
        Route::get('/teachers/unassigned', [TeacherFormationController::class, 'unassignedTeachers']);


        Route::post('teachers/assign/{formationId}', [TeacherFormationController::class, 'assignTeacher']);
        Route::delete('teachers/unassign/{formationId}', [TeacherFormationController::class, 'unassignTeacher']);

        Route::apiResource('teachers', TeacherFormationController::class);

        Route::get('teachers/{id} ', [TeacherFormationController::class, 'show($id)']);




        // Routes protégées par l'authentification
        Route::middleware('auth:sanctum')->group(function () {
            Route::get('/formations/{formationId}/quiz', [QuizController::class, 'showRandomQuiz']);
            Route::post('/formations/{formationId}/quiz/submit', [QuizController::class, 'submitQuiz']);
            Route::post('/formation-student', [FormationStudentController::class, 'store']);

            Route::post('/formation_student', [FormationStudentController::class, 'store']);
            Route::get('/formation_student/{student_id}/formations', [FormationStudentController::class, 'formationsByStudent']);
            Route::get('/formation_student/{formation_id}/students', [FormationStudentController::class, 'studentsByFormation']);
            Route::get('/formation_student/{formation_id}/progression', [FormationStudentController::class, 'showProgression']);
            Route::get('/formation_student/{formation_id}/score', [FormationStudentController::class, 'showScore']);
            Route::get('/formation_student/{formation_id}/attestation', [FormationStudentController::class, 'showAttestation']);
            Route::patch('/formation_student/{formation_id}/progression', [FormationStudentController::class, 'updateProgression']);
            Route::post('/formation_student/{formation_id}/internship-request', [FormationStudentController::class, 'storeInternshipRequest']);



            // Routes pour les étudiants
            Route::get('/student/internship-requests', [FormationStudentController::class, 'listStudentInternshipRequests']);
            Route::get('/student/attestations', [FormationStudentController::class, 'listStudentAttestations']);
            Route::get('/student/attestations/{id}/download', [FormationStudentController::class, 'downloadAttestation']);
            Route::get('/formation_student/{formationId}/internship-requests', [FormationStudentController::class, 'getStudentInternshipRequests']);
            Route::get('/student/dashboard', [DashboardController::class, 'getStats']);



            // Routes admin
            Route::middleware('admin')->group(function () {
                Route::get('/internship-requests', [FormationStudentController::class, 'listInternshipRequests']);
                Route::get('/internship-requests/{id}/download', [FormationStudentController::class, 'downloadInternshipRequest']);
                Route::patch('/internship-requests/{id}', [FormationStudentController::class, 'updateInternshipRequest']);
            });
                                                                
     
        });
        Route::get('/student/attestations/{id}/download', [FormationStudentController::class, 'downloadAttestation']);



    
       


        Route::get('/student/{id}/formations', [FormationStudentController::class, 'formationsByStudent']);
        Route::get('/formation/{id}/students', [FormationStudentController::class, 'studentsByFormation']);










    Route::post('/formation_student', [FormationStudentController::class, 'store']);
    Route::get('/student/invoice/{id}/download', [FormationStudentController::class, 'downloadInvoice'])->name('download.invoice');;
    Route::get('/formation_student/{student_id}/formations', [FormationStudentController::class, 'formationsByStudent']);
    Route::get('/formation_student/{formation_id}/students', [FormationStudentController::class, 'studentsByFormation']);
    Route::get('/formation_student/{formation_id}/progression', [FormationStudentController::class, 'showProgression']);
    Route::patch('/formation_student/{formation_id}/progression', [FormationStudentController::class, 'updateProgression']);








    Route::get('/user', function (Request $request) {
        return $request->user();
    })->middleware('auth:sanctum');



    Route::middleware('auth:sanctum')->post('/livekit/token', [LiveKitController::class, 'generateToken']);







    //Route pour meetings
    Route::middleware(['auth:sanctum'])->group(function () {
        Route::get('/formations/{formation}/meetings', [MeetingController::class, 'index']);
        Route::post('/formations/{formation}/meetings', [MeetingController::class, 'store']);
        Route::post('/meetings/{meeting}/attendance', [MeetingController::class, 'joinMeeting']);
        Route::get('/teacher/meetings', [MeetingController::class, 'teacherMeetings']);
        Route::get('/student/meetings', [MeetingController::class, 'studentMeetings']);
        

    });


    //Route pour teacher et formations 

    Route::get('/teacher/formations', [FormationController::class, 'indexForTeacher']);
    Route::get('/teacher/formations/{id}', [FormationController::class, 'showToTeacher']);

                ?>