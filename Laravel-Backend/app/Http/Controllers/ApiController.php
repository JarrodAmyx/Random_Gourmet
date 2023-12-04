<?php
namespace App\Http\Controllers;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use MongoDB\BSON\ObjectId;
use App\Http\Controllers\Recipes;

use Illuminate\Http\Request;

class ApiController extends Controller
{
    
    public function getAllIngredients()
    {
        $ingredients = DB::connection('mongodb')->collection('ingredients')->get();

        return response()->json($ingredients);
    }
    
    public function getData()
    {
        $ingredients = DB::connection('mongodb')->collection('ingredients')->get();

        return response()->json($ingredients);
    }
    
    public function getAllUsers()
    {
        $users = DB::connection('mongodb')->collection('users')->get();

        return response()->json($users);
    }
    
    public function getAllRecipes()
    {
        $recipes = DB::connection('mongodb')->collection('recipes')->get();

        return response()->json($recipes);
    }
    
    public function getAllUserRecipes()
    {
        $recipes = DB::connection('mongodb')->collection('userRecipes')->get();

        return response()->json($recipes);
    }
    
    public function getAllUserIngredients()
    {
        $recipes = DB::connection('mongodb')->collection('userIngredients')->get();

        return response()->json($recipes);
    }
    
    public function getAPIRecipies( Request $request )
    {
        $curl = curl_init();
        curl_setopt_array($curl, [
            //CURLOPT_URL => "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/random?number=0",
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_ENCODING => "",
            CURLOPT_MAXREDIRS => 10,
            CURLOPT_TIMEOUT => 30,
            CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
            CURLOPT_CUSTOMREQUEST => "GET",
            CURLOPT_HTTPHEADER => [
                "X-RapidAPI-Host: spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
                "X-RapidAPI-Key: 2685366d4cmshbf587d1a8086269p165433jsn9e400cd19841"
            ],
        ]);

        $response = curl_exec($curl);
        $err = curl_error($curl);

        curl_close($curl);

        if ($err or empty( json_decode( $response ) )) {

        } else {
            foreach( json_decode( $response )->recipes as $recipe )
            {
                Recipes::create( $recipe );
            }
        }
    }
}