<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class EnsureIsAdmin
{
    public function handle(Request $request, Closure $next)
    {
        if (!Auth::user() || Auth::user()->role !== 'admin') {
            return response()->json(['message' => 'Accès non autorisé. Réservé aux administrateurs.'], 403);
        }

        return $next($request);
    }
}