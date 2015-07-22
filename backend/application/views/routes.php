<?php

include_once(ROOT . DS . 'application' . DS . "Controllers" . DS . "home.php");

// validate login
$app->post(
    '/validate_login','home:validate_login'
)->setParams(array($app));

// Register new user
$app->post(
    '/register_user','home:register_user'
)->setParams(array($app));

// User Data
$app->post(
    '/user_data','home:user_data'
)->setParams(array($app));

$app->post(
    '/image_user','home:image_user'
)->setParams(array($app));

// All users
$app->post(
    '/users','home:users'
)->setParams(array($app));


// PUT route
$app->put('/put', function () {
        echo 'This is a PUT route';
    }
);

// PATCH route
$app->patch('/patch', function () {
    echo 'This is a PATCH route';
});

// DELETE route
$app->delete('/delete', function () {
        echo 'This is a DELETE route';
    }
);

$app->run();

?>