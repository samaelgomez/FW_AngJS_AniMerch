<?php

class controller_home {
    function getBanners() {
        $json = common::accessModel('home_model', 'getBanners');

        echo json_encode($json);
    }

    function getCategories() {
        $json = common::accessModel('home_model', 'getCategories');

        echo json_encode($json);
    }
}