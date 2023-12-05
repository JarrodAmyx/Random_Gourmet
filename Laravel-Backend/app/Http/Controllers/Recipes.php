<?php
namespace App\Http\Controllers;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use MongoDB\BSON\ObjectId;

use Illuminate\Http\Request;

class Recipes extends Controller
{
    public static function create( $recipe )
    {
        $title = $recipe->title; //'john@example.com'

        $recipeExists = DB::connection('mongodb')->collection('recipes')->where('title', $title)->first();
        if( !$recipeExists and !empty($recipe->image) )
        {
            $ingredients = [];
            foreach( $recipe->extendedIngredients as $missingIngredient )
            {
                $ingredients[] = $missingIngredient->name;
            }

            DB::collection('recipes')->insert([
                'recipeId' => (string) $recipe->id,
                'title' => $title,
                'description' => $recipe->summary,
                'requiredIngredients' => $ingredients,
                'recipeImage' => $recipe->image,
            ]);

            return response()->json(['message' => 'Recipe Successfully Added']);
        }
        
        return response()->json( [ 'message' => 'Recipe already exists' ] );
    }

    public function read( Request $request )
    {
        // Retrieve a single user from the 'users' collection based on ID
        $recipe =
            DB::connection('mongodb')
            ->collection('recipes')
            ->where('recipeId', $request->recipeId)
            ->first()
        ;

        if (!$recipe) {
            return response()->json(['message' => 'Recipe not found'], 404);
        }

        return response()->json($recipe);
    }

    public function update( Request $request )
    {
        $recipe = $request->all();

        // Update the user in the 'users' collection based on ID
        DB::connection('mongodb')->collection('recipes')->where('recipeId', $request->id)->update($recipe);

        return response()->json(['message' => 'Recipe updated']);
    }

    public function destroy( Request $request )
    {
        // Delete a user from the 'users' collection based on ID
        DB::connection('mongodb')->collection('recipes')->where('_id', new ObjectId($request->id))->delete();

        return response()->json(['message' => 'Recipe deleted']);
    }
    
    public function findByIngredients( Request $request )
    {
        $ingredientsToSearch = ["Ingredient 1", "Ingredient 2"]; // Replace with the ingredients you want to search for

        $results = DB::collection('recipes')
            ->where('requiredIngredients', '$elemMatch', ['$in' => $ingredientsToSearch])
            ->get();
    }

    public function search(Request $request )
    {
        //query from sidebar
        $ingredientsToSearch = json_decode($request->ingredients, true);
        $ingredientsToSearch = array_map('strtolower', $ingredientsToSearch);
        //query from searchbar
        $searchTerm = $request->search;

        if(count($ingredientsToSearch)==0){
            $results = DB::collection('recipes')
                ->where(function ($query) use ($searchTerm) {
                    $query->orWhere('title', 'like', '%' . $searchTerm . '%')
                    ->orWhere('description', 'like', '%' . $searchTerm . '%')
                    ->orWhere('requiredIngredients', 'like', '%' . $searchTerm . '%');
                })
                ->get()
            ;
        }
        else{
            $results = DB::collection('recipes')
                ->where('requiredIngredients', '$elemMatch', ['$in' => $ingredientsToSearch])
                ->where(function ($query) use ($searchTerm) {
                    $query->orWhere('title', 'like', '%' . $searchTerm . '%')
                    ->orWhere('description', 'like', '%' . $searchTerm . '%')
                    ->orWhere('requiredIngredients', 'like', '%' . $searchTerm . '%');
                })
                ->get()
            ;
        }

        return response()->json(['message' => $results]);
    }
}