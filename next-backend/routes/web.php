<?php
use App\Http\Controllers\Auth\AuthenticatedSessionController;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Str;
use Illuminate\Http\Request;

Route::get('/', function () {
    return ['Laravel' => app()->version()];
});

require __DIR__.'/auth.php';
//Route::get('/admin-dashboard', function(){
//   return ('dashboard');
//});

//Route::middleware(['auth'])->group(function () {
  //  Route::get('/dashboard', [DashboardController::class, 'index']);
//});




Route::post('/send-2fa-code', function(Request $request) {
    $request->validate(['email' => 'required|email']);

    // Générer un code à 6 chiffres
    $code = rand(100000, 999999);

    // Stocker le code dans la session (valable 5 min)
    session(['2fa_code' => $code, '2fa_email' => $request->email, '2fa_expire' => now()->addMinutes(5)]);

    // Envoyer l’email
    Mail::raw("Votre code de vérification est : $code", function($message) use ($request) {
        $message->to($request->email)
                ->subject('Code de vérification 2FA');
    });

    return response()->json(['status' => 'success', 'message' => 'Code envoyé !']);
});


Route::post('/verify-2fa-code', function(Request $request) {
    $request->validate([
        'email' => 'required|email',
        'code' => 'required|digits:6',
    ]);

    $code = session('2fa_code');
    $email = session('2fa_email');
    $expire = session('2fa_expire');

    if(!$code || !$email || now()->greaterThan($expire)) {
        return response()->json(['status' => 'error', 'message' => 'Code expiré ou invalide'], 400);
    }

    if($request->email === $email && $request->code == $code) {
        // Supprimer le code après vérification
        session()->forget(['2fa_code', '2fa_email', '2fa_expire']);
        return response()->json(['status' => 'success', 'message' => 'Code validé !']);
    }

    return response()->json(['status' => 'error', 'message' => 'Code invalide'], 400);
});