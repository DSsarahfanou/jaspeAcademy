<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use Illuminate\Http\Request;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;

class AuthenticatedSessionController extends Controller
{
    /**
     * Handle an incoming authentication request.
     */


    public function store(LoginRequest $request)
    {
        $request->authenticate();
        $request->session()->regenerate();
    
        $user = $request->user();
        $role = $user->role;
        
    
        return response()->json([
            'user' => $user->only(['id', 'name', 'email']),
            'role' => $role
        ]);
    }

    public function destroy(Request $request): Response
    {
        Auth::guard('web')->logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return response()->noContent();
    }
}
