<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;

class ProfileController extends Controller
{
    public function update(Request $request)
    {
        $user = Auth::user();
    
        $rules = [
            'picture' => 'nullable|image|max:2048',
        ];
    
        // Seul l'admin peut modifier ces champs
        if ($user->role === 'admin') {
            $rules = array_merge($rules, [
                'name' => 'required|string|max:255',
                'surname' => 'required|string|max:255',
                'email' => 'required|email|max:255|unique:users,email,' . $user->id,
                'phone' => 'nullable|string|max:30',
            ]);
        }
    
        $validated = $request->validate($rules);
    
        if ($request->hasFile('picture')) {
            $validated['picture'] = $request->file('picture')->store('profile-pictures', 'public');
        }
    
        $user->update($validated);
    
        return response()->json(['message' => 'Profil mis à jour.']);
    }
    
    public function updatePassword(Request $request)
        {
            $user = Auth::user();

            $request->validate([
                'current_password' => 'required',
                'new_password' => 'required|confirmed|min:6',
            ]);

            if (!Hash::check($request->current_password, $user->password)) {
                return response()->json(['message' => 'Mot de passe actuel incorrect.'], 422);
            }

            $user->update([
                'password' => Hash::make($request->new_password),
            ]);

            return response()->json(['message' => 'Mot de passe changé avec succès.']);
        }






    
}
