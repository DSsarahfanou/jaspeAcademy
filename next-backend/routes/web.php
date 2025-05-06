<?php
use App\Http\Controllers\Auth\AuthenticatedSessionController;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return ['Laravel' => app()->version()];
});

require __DIR__.'/auth.php';
Route::get('/admin-dashboard', function(){
    return ('dashboard');
});

//Route::middleware(['auth'])->group(function () {
  //  Route::get('/dashboard', [DashboardController::class, 'index']);
//});