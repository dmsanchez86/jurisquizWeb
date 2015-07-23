<?php

include_once(ROOT . DS . 'application' . DS . "Controllers" . DS . "main.php");

// validate login
$app->post(
    '/validate_login','main:validate_login'
)->setParams(array($app));

// Register new user
$app->post(
    '/register_user','main:register_user'
)->setParams(array($app));

// User Data
$app->post(
    '/user_data','main:user_data'
)->setParams(array($app));

$app->post(
    '/image_user','main:image_user'
)->setParams(array($app));

$app->post(
    '/image_user_biography','main:image_user_biography'
)->setParams(array($app));

// All users
$app->post(
    '/users','main:users'
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