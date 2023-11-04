<?php
namespace App\Http\Controllers;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use MongoDB\BSON\ObjectId;

use Illuminate\Http\Request;

class ApiController extends Controller
{
    
    public function getAllIngredients()
    {
        $users = DB::connection('mongodb')->collection('ingredients')->get();

        return response()->json($users);
    }
    
    public function getData()
    {
        $users = DB::connection('mongodb')->collection('ingredients')->get();

        return response()->json($users);
    }
    
    public function getAllUsers()
    {
        $users = DB::connection('mongodb')->collection('users')->get();

        return response()->json($users);
    }
    
    public function getAllRecipes()
    {
        $users = DB::connection('mongodb')->collection('recipes')->get();

        return response()->json($users);
    }
}