<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ApiController;
use App\Http\Controllers\Users;
use App\Http\Controllers\Ingredients;
use App\Http\Controllers\Recipes;
use App\Http\Controllers\UserRecipes;
use App\Http\Controllers\UserIngredients;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/
Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('/token', function (Request $request)
{
    return response()->json(['token' => csrf_token()]);
});

Route::get('/add-recipes', [ApiController::class, 'getAPIRecipies']);

Route::get('/login', [Users::class, 'login']);
Route::post('/login', [Users::class, 'login']);

Route::get('/user-create', [Users::class, 'create']);
Route::get('/user-read', [Users::class, 'read']);
Route::get('/user-update', [Users::class, 'update']);
Route::get('/user-destroy', [Users::class, 'destroy']);
Route::get('/update-password', [Users::class, 'updatePassword']);

Route::post('/user-create', [Users::class, 'create']);
Route::post('/user-read', [Users::class, 'read']);
Route::post('/user-update', [Users::class, 'update']);
Route::post('/user-destroy', [Users::class, 'destroy']);
Route::post('/update-password', [Users::class, 'updatePassword']);

Route::get('/ingredient-create', [Ingredients::class, 'create']);
Route::get('/ingredient-read', [Ingredients::class, 'read']);
Route::get('/ingredient-update', [Ingredients::class, 'update']);
Route::get('/ingredient-destroy', [Ingredients::class, 'destroy']);

Route::post('/ingredient-create', [Ingredients::class, 'create']);
Route::post('/ingredient-read', [Ingredients::class, 'read']);
Route::post('/ingredient-update', [Ingredients::class, 'update']);
Route::post('/ingredient-destroy', [Users::class, 'destroy']);

Route::get('/recipe-create', [Recipes::class, 'create']);
Route::get('/recipe-read', [Recipes::class, 'read']);
Route::get('/recipe-update', [Recipes::class, 'update']);
Route::get('/recipe-destroy', [Recipes::class, 'destroy']);
Route::get('/recipe-search', [Recipes::class, 'search']);

Route::post('/recipe-create', [Recipes::class, 'create']);
Route::post('/recipe-read', [Recipes::class, 'read']);
Route::post('/recipe-update', [Recipes::class, 'update']);
Route::post('/recipe-destroy', [Recipes::class, 'destroy']);
Route::post('/recipe-search', [Recipes::class, 'search']);

Route::get('/user-recipe-create', [UserRecipes::class, 'create']);
Route::get('/user-recipe-read', [UserRecipes::class, 'read']);
Route::get('/user-recipe-update', [UserRecipes::class, 'update']);
Route::get('/user-recipe-destroy', [UserRecipes::class, 'destroy']);

Route::post('/user-recipe-create', [UserRecipes::class, 'create']);
Route::post('/user-recipe-read', [UserRecipes::class, 'read']);
Route::post('/user-recipe-update', [UserRecipes::class, 'update']);
Route::post('/user-recipe-destroy', [UserRecipes::class, 'destroy']);


Route::get('/user-ingredient-create', [UserIngredients::class, 'create']);
Route::get('/user-ingredient-read', [UserIngredients::class, 'read']);
Route::get('/user-ingredient-update', [UserIngredients::class, 'update']);
Route::get('/user-ingredient-destroy', [UserIngredients::class, 'destroy']);

Route::post('/user-ingredient-create', [UserIngredients::class, 'create']);
Route::post('/user-ingredient-read', [UserIngredients::class, 'read']);
Route::post('/user-ingredient-update', [UserIngredients::class, 'update']);
Route::post('/user-ingredient-destroy', [UserIngredients::class, 'destroy']);


Route::get('/data', [ApiController::class, 'getData']);
Route::get('/allIngredients', [ApiController::class, 'getAllIngredients']);
Route::get('/allUsers', [ApiController::class, 'getAllUsers']);
Route::get('/allRecipes', [ApiController::class, 'getAllRecipes']);
Route::get('/getAPIRecipies', [ApiController::class, 'getAPIRecipies']);
