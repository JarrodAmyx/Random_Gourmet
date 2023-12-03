<?php
namespace App\Http\Controllers;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use MongoDB\BSON\ObjectId;

use Illuminate\Http\Request;

class UserRecipes extends Controller
{
    public function create( Request $request )
    {
        $userId = $request->userId; //'john@example.com'
        $recipeId = $request->recipeId;

        $userRecipe =
            DB::connection('mongodb')
                ->collection('userRecipes')
                ->where('userId', $userId)
                ->where('recipeId', $recipeId)
                ->first()
        ;

        //if user recipe is not found
        if( !$userRecipe )
        {
            $data = [
                'userId' => $userId,
                'recipeId' => $recipeId
            ];

            DB::connection('mongodb')->collection('userRecipes')->insert($data);

            return response()->json(['message' => 'Recipe Successfully Added To User', 'recipe' => $recipeId]);
        }
        
        return response()->json(['message' => 'User recipe already exists', 'recipe' => $recipeId]);
    }

    public function read( Request $request )
    {
        // gets user id and returns all recipeid that the user saved
        $idList = DB::connection('mongodb')
            ->collection('userRecipes')
            ->where('userId', $request->userId)
            ->pluck('recipeId')
            ->toArray();

        return response()->json(['message' => $idList]);

        // $userRecipe = DB::connection('mongodb')
        //     ->collection('userRecipes')
        //     ->where('userId', $request->userId)
        //     ->get();

        // // Ensure you have retrieved the userRecipe record with the _id field.

        // if ($userRecipe) {
        //     // Use the aggregation framework to join the userRecipe with the recipes table.
        //     $result = DB::connection('mongodb')
        //         ->collection('recipes')
        //         ->raw(function ($collection) use ($userRecipe) {
        //             return $collection->aggregate([
        //                 [
        //                     '$match' => [
        //                         'recipeId' => $userRecipe->_id
        //                     ]
        //                 ],
        //                 [
        //                     '$lookup' => [
        //                         'from' => 'userRecipes',
        //                         'localField' => '_id',
        //                         'foreignField' => 'recipeId',
        //                         'as' => 'userRecipes'
        //                     ]
        //                 ]
        //             ]);
        //         })
        //     ;
        //     return response()->json($result);
        // }

        // return response()->json(['message' => 'User Recipes not found'], 404);
    }

    public function search( Request $request )
    {
        // gets userid and search query, returns recipe that user saved
        //query from sidebar
        $ingredientsToSearch = json_decode($request->ingredients, true);
        $ingredientsToSearch = array_map('strtolower', $ingredientsToSearch);
        //query from searchbar
        $searchTerm = $request->search;

        $idList = DB::connection('mongodb')
            ->collection('userRecipes')
            ->where('userId', $request->userId)
            ->pluck('recipeId')
            ->toArray();

        if(count($ingredientsToSearch)==0){
            $results = DB::collection('recipes')
                ->whereIn('recipeId', $idList)
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
                ->whereIn('recipeId', $idList)
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

    public function destroy( Request $request )
    {
        $userId = $request->userId; //'john@example.com'
        $recipeId = $request->recipeId;
        // Delete a user from the 'users' collection based on ID
        $userRecipe =
            DB::connection('mongodb')
                ->collection('userRecipes')
                ->where('userId', $userId)
                ->where('recipeId', $recipeId)
                ->delete();

        return response()->json(['message' => 'Recipe removed successfully', 'recipe' => $recipeId]);
    }

    
}
