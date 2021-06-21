<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Log;

class AuthController extends Controller
{
    public function login(Request $request) {
        Log::info('Hey, just testing log', ['request' => $request]);
        $email = $request->email;
        $password = $request->password;

        // データ全部届いた？
        if (empty($email) or empty($password)) {
            return response()->json(['status' => 'error', 'message' => 'フィールドを全部入力してください']);
        }

        $credentials = request(['email', 'password']);

        if (! $token = auth()->attempt($credentials)) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }

        return $this->respondWithToken($token);
    }
    
    public function register(Request $request) {
        $name = $request->name;
        $email = $request->email;
        $password = $request->password;

        // データ全部届いた？
        if (empty($email) or empty($password)) {
            return response()->json(['status' => 'error', 'message' => 'フィールドを全部入力してください。']);
        }

        //メールアドレスが有効？
        if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
            return response()->json(['status' => 'error', 'message' => '有効的なメールアドレスを入力ください。']);
        }

         //パスワード字数が足りる？
         if (strlen($password < 6)) {
            return response()->json(['status' => 'error', 'message' => 'パスワードの字数の最小限は6文字です。']);
        }

        //このユーザーが固有的？
        if (User::where('email', '=', $email)->exists()) {
            return response()->json(['status' => 'error', 'message' => 'このユーザーのメールアドレスは既に登録されています。']);
        }

        //ユーザーを作成する
        try {
            $user = new User();
            $user->name = $name;
            $user->email = $email;
            $user->password = app('hash')->make($password);

            if ($user->save()) {
                return $this->login($request);
            }
        } catch (\Exception $e) {
            return response()->json(['status' => 'error', 'message' => $e->getMessage()]);
        }
    }


    /**
     * Log the user out (Invalidate the token).
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function logout()
    {
        auth()->logout();

        return response()->json(['message' => 'Successfully logged out']);
    }



    /**
     * Get the token array structure.
     *
     * @param  string $token
     *
     * @return \Illuminate\Http\JsonResponse
     */

    protected function respondWithToken($token)
    {
        return response()->json([
            'access_token' => $token,
            'token_type' => 'bearer',
            'expires_in' => auth()->factory()->getTTL() * 60
        ]);
    }
}
