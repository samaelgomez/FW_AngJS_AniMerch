<?php

class controller_auth {
    function list() {
        common::loadView('topPageAuth.php', VIEW_PATH_AUTH . 'auth.html');
    }

    function auth() {
        if ($_POST['authPetition'] == 'register') {
            $json = common::accessModel('auth_model', 'login', $_POST['data']);
            if ($json == null) {
                if ($_POST['data'][0] == "client") {
                    $token = middleware::token('encode', $_POST['data'][1][1]);
                    $insertOK = common::accessModel('auth_model', 'insertClient', [$_POST['data'], $token]);
                    if (!$insertOK) {
                        echo json_encode("That user could not be inserted...");
                        die();
                    }
                    $user = common::accessModel('auth_model', 'login', $_POST['data']);
                    $email = ['type' => 'validate', 'token' => $token, 'toEmail' => $_POST['data'][1][0]];
                    mail::setEmail($email);
                    echo json_encode([$_POST['data'][0], $user, $token]);
                } else {
                    $token = middleware::token('encode', $_POST['data'][1][1]);
                    $insertOK = common::accessModel('auth_model', 'insertShop', [$_POST['data'], $token]);
                    if (!$insertOK) {
                        echo json_encode("That user could not be inserted...");
                        die();
                    }
                    $user = common::accessModel('auth_model', 'login', $_POST['data']);
                    $email = ['type' => 'validate', 'token' => $token, 'toEmail' => $_POST['data'][1][0]];
                    mail::setEmail($email);
                    echo json_encode([$_POST['data'][0], $user, $token]);
                }
            } else {
                echo json_encode("That user already exists...");
                die();
            }
        } else {
            $json = common::accessModel('auth_model', 'login', $_POST['data']);
            if (count($json[0]) == 0) {
                echo json_encode('Username or password not entered correctly');
            } else {
                $userType = (explode('.', explode('@', $_POST['data'][1][0])[1])[0]);
                $token = middleware::token('encode', $userType);
            }
            echo json_encode([$_POST['data'][0], $json, $token]);
        }
    }

    function activate() {
        $json = common::accessModel('auth_model', 'activate', $_POST['token']);
    }

    function recover() {
        $token = common::accessModel('auth_model', 'tokenForRecover', $_POST['email']);
        if ($token !== '') {
            $email = ['type' => 'recover', 'token' => $token, 'toEmail' => $_POST['email']];
            mail::setEmail($email);
        }
        echo $token;
    }

    function recoverPass() {
        $token = $_GET['param'];
        common::loadView('topPageAuth.php', VIEW_PATH_AUTH . 'auth.html');
    }

    function updatePass() {
        common::accessModel('auth_model', 'updatePass', [$_POST['pass'], $_POST['token']]);
    }

    function socialLogin() {
        $json = common::accessModel('auth_model', 'socialLogin', $_POST['data']);
        if ($json == "") {
            $token = middleware::token('encode', $_POST['data'][1]);
            $insertOK = common::accessModel('auth_model', 'insertSocialLogin', [$_POST['data'], $token]);
            if ($insertOK == null) {
                echo json_encode("That user could not be inserted...");
                die();
            }
        }
        $user = common::accessModel('auth_model', 'socialLogin', $_POST['data']);
        echo json_encode($user);
    }
}