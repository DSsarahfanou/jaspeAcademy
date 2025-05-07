<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    $user = $request->user();
    $role = $user->role;

    return response()->json([
        ...$user->only(['id', 'name', 'email']),
        'role' => $role
    ]);
});

?>