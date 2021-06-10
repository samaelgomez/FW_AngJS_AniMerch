<?php

class controller_cart {
    function loadCart() {
        $json = common::accessModel('cart_model', 'loadCart', $_POST['username']);

        echo json_encode($json);
    }

    function addToCart() {
        $json = common::accessModel('cart_model', 'addToCart', [$_POST['username'], $_POST['figure']]);
    }

    function removeFromCart() {
        $json = common::accessModel('cart_model', 'removeFromCart', [$_POST['username'], $_POST['figure']]);
    }

    function substractStock() {
        common::accessModel('cart_model', 'substractStock', $_POST['cartFigures']);
    }

    function purchase() {
        common::accessModel('cart_model', 'purchase', [$_POST['username'], $_POST['cartFigures']]);
    }
}