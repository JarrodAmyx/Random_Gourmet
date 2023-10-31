<?php
namespace App\Http\Controllers;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

use Illuminate\Http\Request;

class ApiController extends Controller
{
    public function getData()
    {
        return response()->json(['message' => 'Hello from Laravel API']);
    }
    
    public function getAllIngredients()
    {
        $users = DB::connection('mongodb')->collection('ingredients')->get();

        return response()->json($users);
    }
    
    public function getAllUsers()
    {
        $users = DB::connection('mongodb')->collection('users')->get();

        return response()->json($users);
    }
    
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
    
    public function register( Request $request )
    {
        $userEmail = $request->email; //'john@example.com'
        $providedPassword = $request->password1; // 'hashed_password'

        $user = DB::connection('mongodb')->collection('users')->where('email', $userEmail)->first();
        if( !$user and !empty( $userEmail ) )
        {
            $data = [
                'email' => $request->email,
                'password' => $request->password1,
            ];

            $data['password'] = Hash::make($data['password']);

            // Create a new user document in the MongoDB collection
            DB::connection('mongodb')->collection('users')->insert($data);

            // You can return a success message or redirect to a login page
            return response()->json(['message' => 'User registered successfully']);
        }
        
        return response()->json( [ 'message' => 'Already Registered' ] );
    }
}