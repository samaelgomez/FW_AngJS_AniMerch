<?php

class controller_shop {
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

    function searchProducts() {
        $json = common::accessModel('shop_model', 'searchProducts', $_POST['search']);

        echo json_encode($json);
    }

    function getBrands() {
        $json = common::accessModel('shop_model', 'getBrands');

        echo json_encode($json);
    }

    function getFranchises() {
        $json = common::accessModel('shop_model', 'getFranchises');

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