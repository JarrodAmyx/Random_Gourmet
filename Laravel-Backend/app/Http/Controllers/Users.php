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
        $userEmail = $request->Email; //'john@example.com'
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
                $loggedIn = true;
            }
        }
        
        return response()->json( [ 'message' => $loggedIn ] );
    }
    
    public function create( Request $request )
    {
        $userEmail = $request->email; //'john@example.com'
        $providedPassword = $request->password1; // 'hashed_password'

        $user = DB::connection('mongodb')->collection('users')->where('email', $userEmail)->first();
        if( !$user and !empty( $userEmail ) )
        {
            $data = [
                'email' => $userEmail,
                'password' => $providedPassword,
            ];

            $data['password'] = Hash::make($data['password']);

            // Create a new user document in the MongoDB collection
            DB::connection('mongodb')->collection('users')->insert($data);

            // You can return a success message or redirect to a login page
            return response()->json(['message' => 'User registered successfully']);
        }
        
        return response()->json( [ 'message' => 'Already Registered' ] );
    }

    public function read( Request $request )
    {
        // Retrieve a single user from the 'users' collection based on ID
        $user =
            DB::connection('mongodb')
            ->collection('users')
            ->where('_id', new ObjectId($request->id))
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
}