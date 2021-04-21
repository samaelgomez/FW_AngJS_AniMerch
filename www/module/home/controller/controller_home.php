<?php

include (__DIR__ . '/../services/HomeService.php');
$homeService = new HomeService();

header('Content-type: application/json');
switch($_SERVER['REQUEST_METHOD']){
    case 'GET':
        echo json_encode($homeService->getBanners());
        break;
    default:
    echo json_encode([
        'status' => 400,
        'message' => 'No request method specified',
    ]);
    break;
}