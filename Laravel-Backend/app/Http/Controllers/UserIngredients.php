<?php
namespace App\Http\Controllers;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use MongoDB\BSON\ObjectId;

use Illuminate\Http\Request;

class UserIngredients extends Controller
{
    public function create( Request $request )
    {
        $userId = $request->userId;
        $ingredientId = $request->ingredientId;

        $userIngredient =
            DB::connection('mongodb')
                ->collection('userIngredients')
                ->where('userId', $userId)
                ->where('ingredientId', $ingredientId)
                ->first()
        ;

        if( !$userIngredient )
        {
            $data = [
                'userId' => $userId,
                'ingredientId' => $ingredientId
            ];

            DB::connection('mongodb')->collection('userIngredients')->insert($data);

            return response()->json(['message' => 'Ingredient Successfully Added To User']);
        }
        
        return response()->json( [ 'message' => 'User already has this Ingredient' ] );
    }

    public function read( Request $request )
    {
        $idList = DB::connection('mongodb')
            ->collection('userIngredients')
            ->where('userId', $request->userId)
            ->pluck('ingredientId')
            ->toArray();

        return response()->json([$idList]);

        // $userIngredient = DB::connection('mongodb')
        //     ->collection('userIngredients')
        //     ->where('userId', $request->userId)
        //     ->get();

        // Ensure you have retrieved the userIngredient record with the _id field.

        // if ($userIngredient) {
            // Use the aggregation framework to join the userIngredient with the ingredients table.
        //     $result = DB::connection('mongodb')
        //         ->collection('ingredients')
        //         ->raw(function ($collection) use ($userIngredient) {
        //             return $collection->aggregate([
        //                 [
        //                     '$match' => [
        //                         'ingredientId' => $userIngredient->_id
        //                     ]
        //                 ],
        //                 [
        //                     '$lookup' => [
        //                         'from' => 'userIngredients',
        //                         'localField' => '_id',
        //                         'foreignField' => 'ingredientId',
        //                         'as' => 'userIngredients'
        //                     ]
        //                 ]
        //             ]);
        //         })
        //     ;
        //     return response()->json($result);
        // }

        // return response()->json(['message' => 'User Ingredients not found'], 404);
    }

    public function destroy( Request $request )
    {
        $userId = $request->userId;
        $ingredientId = $request->ingredientId;

        //checks if ingredient is in user's list
        $userIngredient =
            DB::connection('mongodb')
                ->collection('userIngredients')
                ->where('userId', $userId)
                ->where('ingredientId', $ingredientId)
                ->first()
        ;
        if( $userIngredient )
        {
            $userIngredient =
            DB::connection('mongodb')
                ->collection('userIngredients')
                ->where('userId', $userId)
                ->where('ingredientId', $ingredientId)
                ->delete()
            ;
            return response()->json(['message' => 'User Ingredient Deleted']);
        }
        
        return response()->json(['message' => 'User Ingredients not found'], 404);
    }
}
