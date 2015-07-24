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

// Route to upload profile image
$app->post(
    '/image_user','main:image_user'
)->setParams(array($app));

// Route to upload biography image
$app->post(
    '/image_user_biography','main:image_user_biography'
)->setParams(array($app));

// All users
$app->post(
    '/users','main:users'
)->setParams(array($app));

// Route for change password
$app->post(
    '/change_password','main:change_password'
)->setParams(array($app));

// Route for change name user
$app->post(
    '/change_name_user','main:change_name_user'
)->setParams(array($app));

// Route for change username user
$app->post(
    '/change_username_user','main:change_username_user'
)->setParams(array($app));

// Route for verify username user
$app->post(
    '/verify_username_user','main:verify_username_user'
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