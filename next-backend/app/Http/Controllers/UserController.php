<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    // Lister les utilisateurs (admin)
    public function index()
    {
        return response()->json(User::all());
    }

    // Créer un utilisateur (admin)
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string',
            'surname' => 'required|string',
            'email' => 'required|email|unique:users',
            'password' => 'required|string|min:8',
            'gender' => 'nullable|string',
            'birth_date' => 'nullable|date',
            'address' => 'nullable|string',
            'phone' => 'nullable|string',
            'role' => 'nullable|string',
        ]);

        $validated['password'] = Hash::make($validated['password']);

        $user = User::create($validated);

        if (isset($validated['role'])) {
            $user->assignRole($validated['role']);
        }

        return response()->json([
            'status' => 'success',
            'user' => $user
        ], 201);
    }

    // Afficher un utilisateur
    public function show(string $id)
    {
        $user = User::find($id);

        if (!$user) {
            return response()->json(['message' => 'Utilisateur non trouvé'], 404);
        }

        return response()->json($user);
    }

    // Mettre à jour un utilisateur
    public function update(Request $request, string $id)
    {
        $user = User::find($id);

        if (!$user) {
            return response()->json(['message' => 'Utilisateur non trouvé'], 404);
        }

        $validated = $request->validate([
            'name' => 'sometimes|string',
            'surname' => 'sometimes|string',
            'email' => 'sometimes|email|unique:users,email,' . $user->id,
            'password' => 'sometimes|string|min:8',
            'gender' => 'sometimes|string',
            'birth_date' => 'sometimes|date',
            'address' => 'sometimes|string',
            'phone' => 'sometimes|string',
            'role' => 'sometimes|string',
        ]);

        if (isset($validated['password'])) {
            $validated['password'] = Hash::make($validated['password']);
        }

        $user->update($validated);

        if (isset($validated['role'])) {
            $user->syncRoles($validated['role']);
        }

        return response()->json([
            'status' => 'success',
            'user' => $user
        ]);
    }

    // Supprimer un utilisateur
    public function destroy(string $id)
    {
        $user = User::find($id);

        if (!$user) {
            return response()->json(['message' => 'Utilisateur non trouvé'], 404);
        }

        $user->delete();

        return response()->json(['message' => 'Utilisateur supprimé avec succès']);
    }
}
