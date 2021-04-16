<?php

include (__DIR__ . '/../../shop/services/DAOService.php');
include (__DIR__ . '/../services/DAOProfile.php');
include (__DIR__ . '/../../../utils/middleware.auth.php');

function updateProfileSentence($userType, $profileData) {
    $query = "";
    $query = "UPDATE ".$userType.$profileData[0]." SET email = '".$profileData[1]."', pass = '".$profileData[2]."' WHERE username = '".$profileData[0]."';";
    executorNoReturn($query);
}

function listProfileItems($userType, $token, $username) {
    $newToken = token('encode', $userType);
    if ($newToken == $token) {
        $DAO = new DAOService;
        switch ($userType) {
            case 'shop':
                $DAO->select_filtered_figures('brand = "Kadokawa"');
                break;
            
            default:
                $DAO->select_all_figures();
                break;
        }
    }
}

$headers = getAllHeaders();

switch ($_POST['action']) {
    case 'list':
        listProfileItems($_POST['userType'], $headers['authorization'], $_POST['username']);
        break;

    case 'edit':
        updateProfileSentence($_POST['userType'], $_POST['profileData']);
        break;
    
    default:
        break;
    }