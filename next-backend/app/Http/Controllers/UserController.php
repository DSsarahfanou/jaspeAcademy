<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
Use Illuminate\Support\Facades\Log;


class UserController extends Controller
{
    // Lister les utilisateurs (admin)
    public function index()
    {
        return response()->json(User::all());
    }

    // Créer un utilisateur (admin)

// public function store(Request $request)
// {
//     try {
//         $validated = $request->validate([
//             'name' => 'required|string',
//             'surname' => 'required|string',
//             'email' => 'required|email|unique:users',
//             'password' => 'required|string|min:8',
//             'gender' => 'nullable|string',
//             'birth_date' => 'nullable|date',
//             'address' => 'nullable|string',
//             'phone' => 'nullable|string',
//             'role' => 'nullable|string',
//         ]);

//         $validated['password'] = Hash::make($validated['password']);
//         $user = User::create($validated);

//         if (isset($validated['role'])) {
//             $user->assignRole($validated['role']);
//         }

//         return response()->json([
//             'status' => 'success',
//             'user' => $user
//         ], 201);
//     } catch (\Exception $e) {
//         Log::error('Erreur création utilisateur : ' . $e->getMessage());
//         return response()->json([
//             'status' => 'error',
//             'message' => 'Une erreur est survenue lors de la création de l\'utilisateur.'
//         ], 500);
//     }
// }
    public function store(Request $request)
    {
        try {
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

            $validated['password'] = bcrypt($validated['password']);
            $user = User::create($validated);

            return response()->json([
                'status' => 'success',
                'message' => 'Utilisateur créé avec succès.',
                'user' => $user
            ]);
        } catch (\Exception $e) {
            // 👇 Affiche le message d’erreur pour débogage
            return response()->json([
                'status' => 'error',
                'message' => $e->getMessage()
            ], 500);
        }
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
    public function update(Request $request, $id)
    {
        try {
            $user = User::findOrFail($id);

            $validated = $request->validate([
                'name' => 'required|string',
                'surname' => 'required|string',
                'email' => 'required|email|unique:users,email,' . $user->id,
                'password' => 'nullable|string|min:8|confirmed',
                'gender' => 'nullable|string',
                'birth_date' => 'nullable|date',
                'address' => 'nullable|string',
                'phone' => 'nullable|string',
                'role' => 'nullable|string',
            ]);

            if (!empty($validated['password'])) {
                $validated['password'] = bcrypt($validated['password']);
            } else {
                unset($validated['password']); // On ne met pas à jour si vide
            }

            $user->update($validated);

            return response()->json([
                'status' => 'success',
                'message' => 'Utilisateur mis à jour avec succès',
                'user' => $user
            ]);
        } catch (\Exception $e) {
            \Log::error('Erreur update user: ' . $e->getMessage());
            return response()->json([
                'status' => 'error',
                'message' => 'Erreur lors de la mise à jour de l\'utilisateur.',
                'debug' => $e->getMessage()
            ], 500);
        }
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
