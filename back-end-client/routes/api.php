<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

use App\Http\Controllers\Api\ClientController;

Route::get('clients', [ClientController::class, 'index']);
Route::post('/add-client', [ClientController::class, 'store']);
Route::get('/edit-client/{id}', [ClientController::class, 'edit']);
Route::put('update-client/{id}', [ClientController::class, 'update']);
Route::delete('delete-client/{id}', [ClientController::class, 'destroy']);