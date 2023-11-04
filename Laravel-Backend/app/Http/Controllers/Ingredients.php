<?php
namespace App\Http\Controllers;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use MongoDB\BSON\ObjectId;

use Illuminate\Http\Request;

class Ingredients extends Controller
{
    public function create( Request $request )
    {
        $name = $request->name; //'john@example.com'
        $category = $request->category; // 'hashed_password'

        $ingredient = DB::connection('mongodb')->collection('ingredients')->where('name', $name)->first();
        if( !$ingredient and !empty( $name ) )
        {
            $data = [
                'name' => $name,
                'category' => $category,
            ];

            DB::connection('mongodb')->collection('ingredients')->insert($data);

            return response()->json(['message' => 'Ingredient Successfully Added']);
        }
        
        return response()->json( [ 'message' => 'Ingredient already exists' ] );
    }

    public function read( Request $request )
    {
        // Retrieve a single user from the 'users' collection based on ID
        $ingredient =
            DB::connection('mongodb')
            ->collection('ingredients')
            ->where('_id', new ObjectId($request->id))
            ->first()
        ;

        if (!$ingredient) {
            return response()->json(['message' => 'Ingredient not found'], 404);
        }

        return response()->json($ingredient);
    }

    public function update( Request $request )
    {
        $ingredient = $request->all();

        // Update the user in the 'users' collection based on ID
        DB::connection('mongodb')->collection('ingredients')->where('_id', new ObjectId($request->id))->update($data);

        return response()->json(['message' => 'Ingredient updated']);
    }

    public function destroy( Request $request )
    {
        // Delete a user from the 'users' collection based on ID
        DB::connection('mongodb')->collection('ingredients')->where('_id', new ObjectId($request->id))->delete();

        return response()->json(['message' => 'Ingredient deleted']);
    }
}
