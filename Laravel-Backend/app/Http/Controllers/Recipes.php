<?php
namespace App\Http\Controllers;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use MongoDB\BSON\ObjectId;

use Illuminate\Http\Request;

class Recipes extends Controller
{
    public function create( Request $request )
    {
        $title = $request->title; //'john@example.com'

        $ingredient = DB::connection('mongodb')->collection('recipes')->where('name', $title)->first();
        if( !$ingredient )
        {
            $data = [
                'title' => $request->title,
                'description' => $request->description
            ];

            DB::connection('mongodb')->collection('recipes')->insert($data);

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
            ->where('_id', new ObjectId($request->id))
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
        DB::connection('mongodb')->collection('recipes')->where('_id', new ObjectId($request->id))->update($data);

        return response()->json(['message' => 'Recipe updated']);
    }

    public function destroy( Request $request )
    {
        // Delete a user from the 'users' collection based on ID
        DB::connection('mongodb')->collection('recipes')->where('_id', new ObjectId($request->id))->delete();

        return response()->json(['message' => 'Recipe deleted']);
    }
}
