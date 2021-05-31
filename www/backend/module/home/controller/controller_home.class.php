<?php

class controller_home {
    function list() {
        common::loadView('topPageHome.php', VIEW_PATH_HOME . 'home.html');
    }

    function getBanners() {
        $json = common::accessModel('home_model', 'getBanners');

        echo json_encode($json);
    }

    function getCategories() {
        $json = common::accessModel('home_model', 'getCategories');

        echo json_encode($json);
    }
}