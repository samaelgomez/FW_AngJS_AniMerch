<?php

include (__DIR__ . '/../services/DAOCart.php');

function listCartItems($cartFigures) {
    $query = "";
    $ans = "";

    $query = "SELECT * FROM figures WHERE";
    foreach ($cartFigures as $key => $value) {
        $query .= " figureName = '".$value."' OR";
    }

    $query = substr($query, 0, -3);
    $ans = executor($query);

    return $ans;
}

switch ($_POST['action']) {
    case 'list':
        echo json_encode(listCartItems($_POST['cartFigures']));
        break;
    
    default:
        break;
    }