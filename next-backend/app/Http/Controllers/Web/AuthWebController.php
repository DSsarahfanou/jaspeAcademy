<?php

namespace App\Http\Controllers\Web;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Password;
use Illuminate\Validation\ValidationException;
use Spatie\Permission\Models\Role;

class AuthWebController extends Controller
{
    public function showLogin()
    {
        return view('auth.login');
    }

    public function login(Request $request)
    {
        $request->validate([
            'email'    => ['required', 'email'],
            'password' => ['required'],
        ]);

        if (!Auth::attempt($request->only('email', 'password'), $request->boolean('remember'))) {
            throw ValidationException::withMessages([
                'email' => __('auth.failed'),
            ]);
        }

        $request->session()->regenerate();

        return redirect()->route('web.redirect');
    }

    public function redirectAfterLogin()
    {
        return match (auth()->user()->role) {
            'admin'   => redirect()->route('admin.dashboard'),
            'teacher' => redirect()->route('animateur.dashboard'),
            default   => redirect()->route('apprenant.dashboard'),
        };
    }

    public function showRegister()
    {
        return view('auth.register');
    }

    public function register(Request $request)
    {
        $request->validate([
            'name'                  => ['required', 'string', 'max:255'],
            'surname'               => ['required', 'string', 'max:255'],
            'gender'                => ['required', 'string', 'in:male,female'],
            'birth_date'            => ['required', 'date'],
            'address'               => ['required', 'string'],
            'phone'                 => ['required', 'string'],
            'email'                 => ['required', 'email', 'max:255', 'unique:users'],
            'password'              => ['required', 'string', 'min:8', 'confirmed'],
            'picture'               => ['nullable', 'image', 'max:2048'],
        ]);

        $picturePath = null;
        if ($request->hasFile('picture')) {
            $picturePath = $request->file('picture')->store('profile-pictures', 'public');
        }

        $user = User::create([
            'name'       => $request->name,
            'surname'    => $request->surname,
            'gender'     => $request->gender,
            'birth_date' => $request->birth_date,
            'address'    => $request->address,
            'phone'      => $request->phone,
            'email'      => $request->email,
            'password'   => Hash::make($request->password),
            'picture'    => $picturePath,
            'role'       => 'student',
        ]);

        if (!Role::where('name', 'student')->exists()) {
            Role::create(['name' => 'student']);
        }
        $user->assignRole('student');

        event(new Registered($user));
        Auth::login($user);

        return redirect()->route('apprenant.dashboard')
            ->with('success', 'Bienvenue sur JaspeAcademy ! Votre compte a été créé.');
    }

    public function showForgotPassword()
    {
        return view('auth.forgot-password');
    }

    public function sendResetLink(Request $request)
    {
        $request->validate(['email' => ['required', 'email']]);

        $status = Password::sendResetLink($request->only('email'));

        if ($status === Password::RESET_LINK_SENT) {
            return back()->with('success', 'Un lien de réinitialisation a été envoyé à votre adresse email.');
        }

        throw ValidationException::withMessages([
            'email' => __($status),
        ]);
    }

    public function logout(Request $request)
    {
        Auth::guard('web')->logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return redirect()->route('web.auth.login')
            ->with('success', 'Vous avez été déconnecté.');
    }
}
