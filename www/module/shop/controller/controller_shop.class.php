<?php

class controller_shop {
    function list() {
        common::loadView('topPageShop.php', VIEW_PATH_SHOP . 'shop.html');
    }

    function showProducts() {
        $json = common::accessModel('shop_model', 'showProducts');

        echo json_encode($json);
    }
}

// include (__DIR__ . '/../services/ShopService.php');
// $shopService = new ShopService();

// header('Content-type: application/json');
// switch($_SERVER['REQUEST_METHOD']){
//     case 'POST':
//         if ($_POST['query']) {
//             $inpText = $_POST['query'];
//             $query = "SELECT * FROM figures WHERE figureName LIKE '%$inpText%'";
//             echo json_encode($shopService->autocomplete($query));
//             die();
//         }

//         if ($_POST['fname']) {
//             $where = "figureName = '".$_POST['fname']."';";
//             echo json_encode($shopService->getFilteredProducts($where));
//             die();
//         }

//         if ($_POST['upfname']) {
//             $where = "figureName = '".$_POST['upfname']."';";
//             echo json_encode($shopService->addVisit($where));
//             die();
//         }

//         if ($_POST['order']) {
//             $order = "ORDER BY visits DESC";
//             echo json_encode($shopService->getOrderedProducts($order));
//             die();
//         }

//         if ($_POST['petition']) {
//             if ($_POST['petition'] == " ") {
//                 echo json_encode($shopService->getProducts($_POST['loggedUser'], $_POST['userType'], $_POST['username']));
//             } else {
//                 echo json_encode($shopService->getFilteredProducts($_POST['petition']));
//             }
            
//             die();
//         }

//         if ($_POST['heartState']) {
//             if ($_POST['heartState'] == 'true') {
//                 $shopService->addLikedProduct($_POST['username'], $_POST['figureName']);
//                 $shopService->addUserLikedProduct($_POST['username'], $_POST['figureName']);
//             } else {
//                 $shopService->removeLikedProduct($_POST['username'], $_POST['figureName']);
//                 $shopService->removeUserLikedProduct($_POST['username'], $_POST['figureName']);
//             }
//         }

//         if($_POST['category']=="All") {
//             echo json_encode($shopService->getProducts());
//         } elseif ($_POST['category']=="Standard") {
//             echo json_encode($shopService->getStandard());
//         } elseif ($_POST['category']=="Statue") {
//             echo json_encode($shopService->getStatue());
//         } elseif ($_POST['category']=="Nendoroid") {
//             echo json_encode($shopService->getNendoroid());
//         }
//         break;
//     default:
//         echo json_encode([
//             'status' => 400,
//             'message' => 'No request method specified',
//         ]);
//         break;
// }