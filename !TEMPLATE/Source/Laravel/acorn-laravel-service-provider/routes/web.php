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
Route::redirect('/', '/Dashboard/GettingStarted');

Route::view('/Blog', 'blog');
Route::view('/Community', 'community');
Route::view('/CommunityList', 'community_list');
Route::view('/Upgrade', 'upgrade');

Route::prefix('Dashboard')->group(function () {
    Route::redirect('/', '/Dashboard/GettingStarted');
    Route::view('/GettingStarted', 'dashboard/getting_started');
    Route::view('/Analysis', 'dashboard/analysis');
});

Route::prefix('Services')->group(function () {
    Route::redirect('/', '/Services/Database');
    Route::view('/Database', 'services/database');
    Route::view('/DatabaseAdd', 'services/database_add');
    Route::view('/DatabaseDetail', 'services/database_detail');
    Route::view('/Hosting', 'services/hosting');
    Route::view('/Storage', 'services/storage');
    Route::view('/StorageFolder', 'services/storage_folder');
    Route::view('/Users', 'services/users');
});

Route::prefix('Account')->group(function () {
    Route::redirect('/', '/Account/Settings');
    Route::view('/Settings', 'account/settings');
    Route::view('/Billing', 'account/billing');
    Route::view('/Security', 'account/security');
});

Route::prefix('Support')->group(function () {
    Route::redirect('/', '/Support/Docs');
    Route::view('/Docs', 'support/docs');
    Route::view('/DocsDetail', 'support/docs_detail');
    Route::view('/KnowledgeBase', 'support/knowledge_base');
    Route::view('/Tickets', 'support/tickets');
    Route::view('/TicketsDetail', 'support/tickets_detail');
});
