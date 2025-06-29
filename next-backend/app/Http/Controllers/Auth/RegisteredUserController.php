<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\Request;
// use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Spatie\Permission\Models\Role;
use Symfony\Component\HttpFoundation\Response;

class RegisteredUserController extends Controller
{
    /**
     * Handle an incoming registration request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request): Response
    {
        \Log::debug('Données reçues:', $request->all());
    
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'surname' => ['required', 'string', 'max:255'],
            'gender' => ['required', 'string'],
            'birth_date' => ['required', 'date'],
            'address' => ['required', 'string'],
            'picture' => ['nullable', 'image', 'max:2048'],
            'phone' => ['required', 'string'],
            'email' => ['required', 'string', 'lowercase', 'email', 'max:255', 'unique:' . User::class],
            'password' => ['required', 'confirmed'],
            'role' => ['nullable', 'string', 'in:student,teacher,admin'], // Rôle facultatif
        ]);
    
        // Gérer l'image si elle est présente
        $picturePath = null;
        if ($request->hasFile('picture')) {
            $picturePath = $request->file('picture')->store('profile-pictures', 'public');
        }
    
        // Création de l'utilisateur
        $user = User::create([
            'name' => $request->input('name'),
            'surname' => $request->input('surname'),
            'gender' => $request->input('gender'),
            'birth_date' => $request->input('birth_date'),
            'address' => $request->input('address'),
            'picture' => $picturePath, 
            'phone' => $request->input('phone'),
            'email' => $request->input('email'),
            'password' => Hash::make($request->input('password')),
            'role' => $request->input('role', 'student'), // Par défaut 'student'
        ]);
    
        // Assigner le rôle via Spatie
        $role = $request->input('role', 'student');
        if (!Role::where('name', $role)->exists()) {
            Role::create(['name' => $role]);
        }
        $user->assignRole($role);
    
        event(new Registered($user));
        Auth::login($user);
    
        // Générer un token Sanctum
        $token = $user->createToken('auth_token')->plainTextToken;
    
        return response()->json([
            'user' => $user->only(['id', 'name', 'email', 'role']),
            'token' => $token,
        ], 201);
    }
}