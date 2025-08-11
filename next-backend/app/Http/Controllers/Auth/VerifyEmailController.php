<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Auth\Events\Verified;
use Illuminate\Foundation\Auth\EmailVerificationRequest;
use Illuminate\Http\RedirectResponse;

class VerifyEmailController extends Controller
{
    /**
     * Mark the authenticated user's email address as verified.
     */
    public function __invoke(EmailVerificationRequest $request): RedirectResponse
    {
        if ($request->user()->hasVerifiedEmail()) {
            return redirect()->intended(
                config('app.frontend_url').'/dashboard?verified=1'
            );
        }

        if ($request->user()->markEmailAsVerified()) {
            event(new Verified($request->user()));
        }

        return redirect()->intended(
            config('app.frontend_url').'/dashboard?verified=1'
        );
    }

// App\Http\Controllers\Auth\VerifyEmailController.php
// public function __invoke(EmailVerificationRequest $request): RedirectResponse
// {
//     if ($request->user()->hasVerifiedEmail()) {
//         return redirect()->intended(
//             config('app.frontend_url').'/dashboard?verified=1'
//         );
//     }

//     if ($request->user()->markEmailAsVerified()) {
//         event(new Verified($request->user()));
        
//         // Créez un nouveau token après vérification
//         $token = $request->user()->createToken('auth_token')->plainTextToken;
        
//         return redirect()->intended(
//             config('app.frontend_url').'/dashboard?verified=1&token='.$token
//         );
//     }

//     return redirect()->intended(
//         config('app.frontend_url').'/dashboard?verified=0'
//     );
// }
}
