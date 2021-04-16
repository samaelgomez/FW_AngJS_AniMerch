<?php

include (__DIR__ . '/../services/DAOAuth.php');
include (__DIR__ . '/../../../utils/middleware.auth.php');

header('Content-type: application/json');

function makeCreateSentence($type, $username) {
    $query = "";
    if ($type == "client") {
        $query = "CREATE TABLE if not exists client".$username." (
            email       varchar(40) Primary Key not null,
            username    varchar(25) not null,
            pass        longtext    not null,
            avatar      varchar(500)   DEFAULT 'https://i.imgur.com/XiyeGgN.jpeg',
            money       varchar(12)    DEFAULT 0
        );";
    } elseif ($type == "shop") {
        $query = "CREATE TABLE if not exists shop".$username." (
            email       varchar(40) Primary Key not null,
            brand_name  varchar(200) DEFAULT 'Kadokawa',
            username    varchar(25),
            pass        longtext,
            avatar      varchar(500) DEFAULT 'https://i.imgur.com/XiyeGgN.jpeg',
            FOREIGN KEY (brand_name) REFERENCES shops(shopName)
       )";
    }
    return $query;
}

function makeCreateFavoritesSentence($type, $username) {
    $query = "";
    if ($type == "client") {
        $query = "CREATE TABLE if not exists client".$username."Favorites (
            id INT auto_increment,
            figureName VARCHAR(200),
            PRIMARY KEY (id)
        );";
    }
    return $query;
}

function makeInsertSentence($type, $name, $data) {
    $query = "";
    $columns = "";

    if ($type == "client") {
        $columns = "email, username, pass";
    } elseif ($type == "shop") {
        $columns = "email, username, pass";
    }

    $arrayCount = count($data);
    $query = "INSERT INTO ".$type.$name." (".$columns.") VALUES (";

    for ($i=0; $i < $arrayCount; $i++) {
        $query = $query."'".$data[$i]."'";
        if($i+1 === $arrayCount) {
            $query = $query.");";
        } else {
            $query = $query.",";
        }
    }

    return $query;
}

function makeSelectSentence($type, $name, $column=" * ", $where=false) {
    $query = "";
    
    $query = "SELECT".$column."FROM ".$type.$name;
    if($where) {
        $query = $query.' WHERE '.$where.'";';
    }

    return $query;
}

function registerUser($data) {
    $exists = executor(makeSelectSentence($data[0], $data[1][0]));

    if ($exists == null) {
        $createOK = executorNoReturn(makeCreateSentence($data[0], $data[1][1]));
        if (!$createOK) {
            echo json_encode("That user could not be created...");
            die();
        }
        $insertOK = executorNoReturn(makeInsertSentence($data[0], $data[1][1], $data[1]));
        if (!$insertOK) {
            echo json_encode("That user could not be inserted...");
            die();
        }
        executorNoReturn(makeCreateFavoritesSentence($data[0], $data[1][1]));
        return [$data[0], $data];
    } else {
        echo json_encode("That user already exists...");
        die();
    }
        
}

function loginUser($data) {
    $exists = executor(makeSelectSentence($data[0], $data[1][1], ' * ', 'username = "'.$data[1][1].'" AND pass = "'.$data[1][2]));
    if (count($exists[0]) == 0) {
        return 'Username or password not entered correctly';
    } else {
        $userType = (explode('.', explode('@', $data[1][0])[1])[0]);
        $token = token('encode', $userType);
        return [$data[0], $exists[0], $token];
    }
}

switch($_SERVER['REQUEST_METHOD']) {
    case 'POST':
        if ($_POST['authPetition'] == 'register') {
            echo json_encode(registerUser($_POST['data']));
            die();
        }
        if ($_POST['authPetition'] == 'login') {
            echo json_encode(loginUser($_POST['data']));
            die();
        }
        break;
    }