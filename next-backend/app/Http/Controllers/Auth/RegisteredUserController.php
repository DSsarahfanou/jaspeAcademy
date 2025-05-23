<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;

class RegisteredUserController extends Controller
{
    /**
     * Handle an incoming registration request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request): Response
    {
        $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'surname' => 'required|string|max:255',
            'gender' => 'required|string',
            'address' => 'required|string',
            'email' => ['required', 'string', 'lowercase', 'email', 'max:255', 'unique:'.User::class],
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
            'role' => 'required|in:apprenant,formateur', // ← validation du rôle
        ]);

        $user = User::create([
            'name' => $request->name,
            'surname' => $request->surname,
            'gender' => $request->gender,
            'address' => $request->address,
            'email' => $request->email,
            'password' => Hash::make($request->string('password')),
            'role' => $request->role, // ← sauvegarde du rôle
        ]);

        event(new Registered($user));

        Auth::login($user);

        return response()->noContent();
    }
}
