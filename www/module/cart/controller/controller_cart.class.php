<?php

class controller_cart {
    function list() {
        common::loadView('topPageCart.php', VIEW_PATH_CART . 'cart.html');
    }

    function loadCart() {
        $json = common::accessModel('cart_model', 'loadCart', $_POST['cartFigures']);

        echo json_encode($json);
    }

    function substractStock() {
        common::accessModel('cart_model', 'substractStock', $_POST['cartFigures']);
    }
}