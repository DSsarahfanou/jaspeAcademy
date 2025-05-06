<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::middleware('auth:sanctum')->get('/user-role', function (Request $request) {
    $user = $request->user();

    $role = $user->getRoleNames()->first(); // peut retourner null si aucun rôle

    return response()->json([
        'role' => $role ?? 'guest', // Valeur par défaut si aucun rôle
    ]);
});

?>