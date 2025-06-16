        <?php
        //next-backend/routes/api.php
        use App\Http\Controllers\LessonController;
        use App\Http\Controllers\OrderController;
        use App\Http\Controllers\RequestCourseController;
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




        ?>