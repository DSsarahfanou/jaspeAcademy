<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ProfileController;
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


?>