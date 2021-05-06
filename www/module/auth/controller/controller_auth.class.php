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
                    $createOK = common::accessModel('auth_model', 'createClient', $_POST['data'][1][1]);
                    if (!$createOK) {
                        echo json_encode("That user could not be created...");
                        die();
                    } else {
                        $insertOK = common::accessModel('auth_model', 'insertClient', $_POST['data']);
                        if (!$insertOK) {
                            echo json_encode("That user could not be inserted...");
                            die();
                        }
                        $user = common::accessModel('auth_model', 'login', $_POST['data']);
                        $token = middleware::token('encode', 'client');
                        echo json_encode(['client', $user, $token]);
                    }
                } else {
                    $createOK = common::accessModel('auth_model', 'createShop', $_POST['data'][1][1]);
                    if (!$createOK) {
                        echo json_encode("That user could not be created...");
                        die();
                    } else {
                        $insertOK = common::accessModel('auth_model', 'insertShop', $_POST['data']);
                        if (!$insertOK) {
                            echo json_encode("That user could not be inserted...");
                            die();
                        }
                        $user = common::accessModel('auth_model', 'login', $_POST['data']);
                        $token = middleware::token('encode', 'shop');
                        echo json_encode(['shop', $user, $token]);
                    }
                }
            } else {
                echo json_encode("That user already exists...");
                die();
            }
                //         executorNoReturn(makeCreateFavoritesSentence($data[0], $data[1][1]));
                //         return [$data[0], $data];
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
    
    // function makeCreateFavoritesSentence($type, $username) {
    //     $query = "";
    //     if ($type == "client") {
    //         $query = "CREATE TABLE if not exists client".$username."Favorites (
    //             id INT auto_increment,
    //             figureName VARCHAR(200),
    //             PRIMARY KEY (id)
    //         );";
    //     }
    //     return $query;
    // }
    
    // function makeInsertSentence($type, $name, $data) {
    //     $query = "";
    //     $columns = "";
    
    //     if ($type == "client") {
    //         $columns = "email, username, pass";
    //     } elseif ($type == "shop") {
    //         $columns = "email, username, pass";
    //     }
    
    //     $arrayCount = count($data);
    //     $query = "INSERT INTO ".$type.$name." (".$columns.") VALUES (";
    
    //     for ($i=0; $i < $arrayCount; $i++) {
    //         $query = $query."'".$data[$i]."'";
    //         if($i+1 === $arrayCount) {
    //             $query = $query.");";
    //         } else {
    //             $query = $query.",";
    //         }
    //     }
    
    //     return $query;
    // }
    
    // function registerUser($data) {
    //     $exists = executor(makeSelectSentence($data[0], $data[1][0]));
    
    //     if ($exists == null) {
    //         $createOK = executorNoReturn(makeCreateSentence($data[0], $data[1][1]));
    //         if (!$createOK) {
    //             echo json_encode("That user could not be created...");
    //             die();
    //         }
    //         $insertOK = executorNoReturn(makeInsertSentence($data[0], $data[1][1], $data[1]));
    //         if (!$insertOK) {
    //             echo json_encode("That user could not be inserted...");
    //             die();
    //         }
    //         executorNoReturn(makeCreateFavoritesSentence($data[0], $data[1][1]));
    //         return [$data[0], $data];
    //     } else {
    //         echo json_encode("That user already exists...");
    //         die();
    //     }
    // }
}