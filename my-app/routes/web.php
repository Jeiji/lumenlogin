<?php

/** @var \Laravel\Lumen\Routing\Router $router */

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It is a breeze. Simply tell Lumen the URIs it should respond to
| and give it the Closure to call when that URI is requested.
|
*/

use Illuminate\Http\Response;



$router->group(['prefix' => 'api'], function() use ($router) {


    //認証ラウト
    $router->post('login', 'AuthController@Login');
    $router->post('register', 'AuthController@Register');
    $router->post('logout', 'AuthController@Logout');


    //多種多様のラウト
    $router->get('/api', function () use ($router) {
        return '<h1>Hello, Jeiji from PHP!</h1>';
    });
    
    $router->get('/api/welcome', function () use ($router) {
        return response()->json(['name' => 'Jeiji!']);
        // return response($content, $status)
        //               ->header('Content-Type', $value);
    });

});

$router->get('/api/info', function () use ($router) {
    return phpinfo();
});