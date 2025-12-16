<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

// index routing via Route feature
Route::redirect('/', '/Dashboards/Patient');


/*
|--------------------------------------------------------------------------
| Pages
|--------------------------------------------------------------------------
|
*/
Route::prefix('Dashboards')->group(function () {
    Route::redirect('/', '/Dashboards/Patient');
    Route::view('Patient', 'dashboards/patient');
    Route::view('Doctor', 'dashboards/doctor');
});

Route::prefix('Appointments')->group(function () {
    Route::view('/', 'appointments/index');
    Route::view('New', 'appointments/new');
});
Route::prefix('Results')->group(function () {
    Route::view('/', 'results/index');
    Route::view('Detail', 'results/detail');
});
Route::view('Prescriptions', 'prescriptions');
Route::prefix('Doctors')->group(function () {
    Route::view('/', 'doctors/index');
    Route::view('Detail', 'doctors/detail');
});
Route::view('Consult', 'consult');
Route::view('Guidebook', 'guidebook');
Route::prefix('Articles')->group(function () {
    Route::view('/', 'articles/index');
    Route::view('Detail', 'articles/detail');
});
Route::view('Settings', 'settings');