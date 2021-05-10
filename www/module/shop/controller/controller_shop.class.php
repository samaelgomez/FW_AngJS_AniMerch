<?php

class controller_shop {
    function list() {
        common::loadView('topPageShop.php', VIEW_PATH_SHOP . 'shop.html');
    }

    function showProducts() {
        if ($_POST['petition']) {
            if ($_POST['petition'] == " ") {
                if ($_POST['username'] == "") {
                    $json = common::accessModel('shop_model', 'showProducts', "guest");
                } else {
                    $json = common::accessModel('shop_model', 'showProducts', $_POST['username']);
                }
            } else {
                if ($_POST['username'] == "") {
                    $json = common::accessModel('shop_model', 'showFilteredProducts', [$_POST['petition'], 'guest']);
                } else {
                    $json = common::accessModel('shop_model', 'showFilteredProducts', [$_POST['petition'], $_POST['username']]);
                }
            }
        }

        echo json_encode($json);
    }

    function showDetails() {
        $where = "figureName = '".$_POST['fname']."';";
        $json = common::accessModel('shop_model', 'showFilteredProducts', $where);

        echo json_encode($json);
    }

    function addVisit() {
        $where = "figureName = '".$_POST['upfname']."';";
        $json = common::accessModel('shop_model', 'addVisit', $where);

        echo json_encode($json);
    }

    function addLike() {
        $json = common::accessModel('shop_model', 'addLike', [$_POST['username'], $_POST['figureName']]);

        echo json_encode($json);
    }

    function removeLike() {
        $json = common::accessModel('shop_model', 'removeLike', [$_POST['username'], $_POST['figureName']]);

        echo json_encode($json);
    }
}


//         if ($_POST['query']) {
//             $inpText = $_POST['query'];
//             $query = "SELECT * FROM figures WHERE figureName LIKE '%$inpText%'";
//             echo json_encode($shopService->autocomplete($query));
//             die();
//         }

//         if ($_POST['order']) {
//             $order = "ORDER BY visits DESC";
//             echo json_encode($shopService->getOrderedProducts($order));
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