<?php
use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\Web\AuthWebController;
use App\Http\Controllers\Web\ApprenantController;
use App\Http\Controllers\Web\AnimateurController;
use App\Http\Controllers\Web\AdminController;
use App\Http\Controllers\Web\PublicController;
use App\Http\Controllers\Web\ShopController;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Str;
use Illuminate\Http\Request;

// ═══════════════════════════════════════════════════
// PUBLIC ROUTES (no auth required)
// ═══════════════════════════════════════════════════
Route::get('/',              [PublicController::class, 'home'])          ->name('public.home');
Route::get('/formations',    [PublicController::class, 'formations'])    ->name('public.formations');
Route::get('/formations/{id}', [PublicController::class, 'formationShow'])->name('public.formations.show');
Route::get('/shop',          [PublicController::class, 'shop'])          ->name('public.shop');
Route::get('/about',         [PublicController::class, 'about'])         ->name('public.about');
Route::get('/unauthorized',  [PublicController::class, 'unauthorized'])  ->name('public.unauthorized');

// ═══════════════════════════════════════════════════
// WEB AUTH ROUTES (forms + processing)
// Les routes API existantes (/login POST, /register POST) restent INTACTES
// ═══════════════════════════════════════════════════
Route::middleware('guest')->group(function () {
    Route::get('/login',          [AuthWebController::class, 'showLogin'])        ->name('web.auth.login');
    Route::post('/web/login',     [AuthWebController::class, 'login'])            ->name('web.auth.login.post');
    Route::get('/register',       [AuthWebController::class, 'showRegister'])     ->name('web.auth.register');
    Route::post('/web/register',  [AuthWebController::class, 'register'])         ->name('web.auth.register.post');
    Route::get('/forgot-password',[AuthWebController::class, 'showForgotPassword'])->name('web.auth.forgot-password');
    Route::post('/web/forgot-password', [AuthWebController::class, 'sendResetLink'])->name('web.auth.forgot-password.post');
});

Route::middleware('auth')->group(function () {
    Route::get('/redirect',  [AuthWebController::class, 'redirectAfterLogin'])->name('web.redirect');
    Route::post('/web/logout', [AuthWebController::class, 'logout'])->name('web.logout');
});

// ═══════════════════════════════════════════════════
// APPRENANT ROUTES — middleware: auth + role:student
// ═══════════════════════════════════════════════════
Route::middleware(['auth', 'role:student'])->prefix('apprenant')->name('apprenant.')->group(function () {
    Route::get('/dashboard',                       [ApprenantController::class, 'dashboard'])       ->name('dashboard');
    Route::get('/mes-formations',                  [ApprenantController::class, 'mesFormations'])   ->name('formations.index');
    Route::get('/mes-formations/{id}',             [ApprenantController::class, 'formationShow'])   ->name('formations.show');
    Route::get('/mes-formations/{id}/quiz',        [ApprenantController::class, 'quiz'])            ->name('formations.quiz');
    Route::post('/mes-formations/{id}/quiz',       [ApprenantController::class, 'submitQuiz'])      ->name('formations.quiz.submit');
    Route::get('/catalogue',                         [ApprenantController::class, 'catalogue'])             ->name('catalogue.index');
    Route::get('/catalogue/{id}',                    [ApprenantController::class, 'catalogueShow'])         ->name('catalogue.show');
    Route::get('/catalogue/{id}/inscription',        [ApprenantController::class, 'inscription'])           ->name('catalogue.inscription');
    Route::post('/catalogue/{id}/inscription',       [ApprenantController::class, 'inscriptionConfirm'])    ->name('catalogue.inscription.confirm');
    Route::get('/certificats',                     [ApprenantController::class, 'certificats'])     ->name('certificats.index');
    Route::get('/orders',                          [ApprenantController::class, 'orders'])          ->name('orders.index');
    Route::get('/stage',                           [ApprenantController::class, 'stage'])           ->name('stage.index');
    Route::get('/meet',                            [ApprenantController::class, 'meet'])            ->name('meet.index');
    Route::get('/meet/{room_link}',               [ApprenantController::class, 'meetRoom'])        ->name('meet.room');
    Route::get('/shop',                            [ShopController::class, 'index'])                ->name('shop.index');
    Route::get('/shop/checkout',                   [ShopController::class, 'checkout'])             ->name('shop.checkout');
    Route::post('/shop/checkout',                  [ShopController::class, 'checkoutConfirm'])      ->name('shop.checkout.confirm');
    Route::get('/profil',                          [ApprenantController::class, 'profil'])          ->name('profil.index');
    Route::put('/profil',                          [ApprenantController::class, 'updateProfil'])    ->name('profil.update');
});

// ═══════════════════════════════════════════════════
// ANIMATEUR ROUTES — middleware: auth + role:teacher
// ═══════════════════════════════════════════════════
Route::middleware(['auth', 'role:teacher'])->prefix('animateur')->name('animateur.')->group(function () {
    Route::get('/dashboard',           [AnimateurController::class, 'dashboard'])      ->name('dashboard');
    Route::get('/formations',          [AnimateurController::class, 'formations'])     ->name('formations.index');
    Route::get('/formations/{id}',     [AnimateurController::class, 'formationShow'])  ->name('formations.show');
    Route::get('/reunions',            [AnimateurController::class, 'reunions'])       ->name('reunions.index');
    Route::get('/reunions/create',     [AnimateurController::class, 'reunionCreate'])  ->name('reunions.create');
    Route::post('/reunions',           [AnimateurController::class, 'reunionStore'])   ->name('reunions.store');
    Route::get('/apprenants',                [AnimateurController::class, 'apprenants'])     ->name('apprenants.index');
    Route::get('/apprenants/{id}',           [AnimateurController::class, 'apprenantShow'])  ->name('apprenants.show');
    Route::get('/reunions/{id}/edit',        [AnimateurController::class, 'reunionEdit'])    ->name('reunions.edit');
    Route::put('/reunions/{id}',             [AnimateurController::class, 'reunionUpdate'])  ->name('reunions.update');
    Route::get('/meet/{room_link}',          [AnimateurController::class, 'meet'])           ->name('meet');
    Route::get('/profil',                    [AnimateurController::class, 'profil'])         ->name('profil.index');
    Route::put('/profil',                    [AnimateurController::class, 'profilUpdate'])   ->name('profil.update');
});

// ═══════════════════════════════════════════════════
// ADMIN ROUTES — middleware: auth + role:admin
// ═══════════════════════════════════════════════════
Route::middleware(['auth', 'role:admin'])->prefix('admin')->name('admin.')->group(function () {
    Route::get('/dashboard',                       [AdminController::class, 'dashboard'])            ->name('dashboard');

    // Formations
    Route::get('/formations',                      [AdminController::class, 'formations'])           ->name('formations.index');
    Route::get('/formations/create',               [AdminController::class, 'formationCreate'])      ->name('formations.create');
    Route::post('/formations',                     [AdminController::class, 'formationStore'])       ->name('formations.store');
    Route::get('/formations/{id}',                 [AdminController::class, 'formationShow'])        ->name('formations.show');
    Route::get('/formations/{id}/edit',            [AdminController::class, 'formationEdit'])        ->name('formations.edit');
    Route::put('/formations/{id}',                 [AdminController::class, 'formationUpdate'])      ->name('formations.update');
    Route::delete('/formations/{id}',              [AdminController::class, 'formationDestroy'])     ->name('formations.destroy');

    // Équipements
    Route::get('/equipments',                      [AdminController::class, 'equipments'])           ->name('equipments.index');
    Route::get('/equipments/{id}',                 [AdminController::class, 'equipmentShow'])        ->name('equipments.show');

    // Enseignants
    Route::get('/teachers',                        [AdminController::class, 'teachers'])             ->name('teachers.index');
    Route::get('/teachers/{id}',                   [AdminController::class, 'teacherShow'])          ->name('teachers.show');

    // Commandes
    Route::get('/orders',                          [AdminController::class, 'orders'])               ->name('orders.index');

    // Demandes de stage
    Route::get('/internship-requests',             [AdminController::class, 'internshipRequests'])   ->name('internship.index');
    Route::get('/internship-requests/{id}',        [AdminController::class, 'internshipShow'])       ->name('internship.show');
    Route::patch('/internship-requests/{id}',      [AdminController::class, 'internshipUpdate'])     ->name('internship.update');

    // Gestion des comptes
    Route::get('/accounts',                        [AdminController::class, 'accounts'])             ->name('accounts.index');
    Route::patch('/accounts/{id}',                 [AdminController::class, 'accountUpdate'])        ->name('accounts.update');
    Route::delete('/accounts/{id}',                [AdminController::class, 'accountDestroy'])       ->name('accounts.destroy');

    // Profil
    Route::get('/profil',                          [AdminController::class, 'profil'])               ->name('profil.index');
    Route::put('/profil',                          [AdminController::class, 'profilUpdate'])         ->name('profil.update');
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