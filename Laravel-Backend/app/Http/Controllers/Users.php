<?php
namespace App\Http\Controllers;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use MongoDB\BSON\ObjectId;

use Illuminate\Http\Request;

class Users extends Controller
{
    public function login( Request $request )
    {
        $userEmail = $request->email; //'john@example.com'
        $providedPassword = $request->password; // 'hashed_password'
        $loggedIn = false;
        

        $user = DB::connection('mongodb')->collection('users')->where('email', $userEmail)->first();
        if( $user )
        {
            $hashedPassword = $user['password'];
            if(
                Hash::check( $providedPassword, $hashedPassword )
                or $hashedPassword == $providedPassword
            )
            {
                $loggedIn = json_decode( json_encode( $user['_id'] ), true )['$oid'];
            }
        }
        
        return response()->json( [ 'message' => $loggedIn ] );
    }
    
    public function create( Request $request )
    {
        $userEmail = $request->email; //'john@example.com'
        $providedPassword = $request->password; // 'hashed_password'
        $user = DB::connection('mongodb')->collection('users')->where('email', $userEmail)->first();
        if( !$user and !empty( $userEmail ) and !empty( $providedPassword ) )
        {
            $data = [
                'userId' => (string)( ( DB::connection('mongodb')->collection('users')->count() ) + 1 ),
                'email' => $userEmail,
                'name' => $userEmail,
                'password' => Hash::make($providedPassword),
            ];

            // Create a new user document in the MongoDB collection
            DB::connection('mongodb')->collection('users')->insert($data);

            // You can return a success message or redirect to a login page
            return response()->json(['message' => true]);
        }
        
        return response()->json( [ 'message' => false ] );
    }

    public function read( Request $request )
    {
        // Retrieve a single user from the 'users' collection based on ID
        $user =
            DB::connection('mongodb')
            ->collection('users')
            ->where('_id', new ObjectId($request->userId))
            ->first()
        ;

        if (!$user) {
            return response()->json(['message' => 'User not found'], 404);
        }
        
        return response()->json($user);
    }

    public function update( Request $request )
    {
        $data = $request->all();

        // Update the user in the 'users' collection based on ID
        DB::connection('mongodb')->collection('users')->where('_id', $request->id)->update($data);

        return response()->json(['message' => 'User updated']);
    }

    public function destroy( Request $request )
    {
        // Delete a user from the 'users' collection based on ID
        DB::connection('mongodb')->collection('users')->where('_id', $request->id)->delete();

        return response()->json(['message' => 'User deleted']);
    }

    public function updatePassword(Request $request )
    {
        $userId = new ObjectId($request->userId);
        $oldPassword = $request->oldPass;
        $newPassword = $request->newPass;

        $user = DB::connection('mongodb')
            ->collection('users')
            ->where('_id', $userId)
            ->first()
        ;

        if (!$user) {
            return response()->json(['message' => 'User not found'], 404);
        }
        
        // Check if the old password matches the current password
        if (!Hash::check($oldPassword, $user['password'])){
            return response()->json(['message' => 'Old password is incorrect'], 422);
        }

        DB::connection('mongodb')
        ->collection('users')
        ->where('_id', $userId)
        ->update(['password' => Hash::make($newPassword)]);

        $updatedUser = DB::connection('mongodb')
        ->collection('users')
        ->where('_id', $userId)
        ->first();

        return response()->json(['message' => 'Password updated successfully', 'user' => $updatedUser]);
    }
}