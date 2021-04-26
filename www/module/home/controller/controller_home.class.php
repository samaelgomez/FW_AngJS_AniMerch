<?php

class controller_home {
    function list() {
        common::loadView('topPageHome.php', VIEW_PATH_HOME . 'home.html');
    }

    function getBanners() {
        echo common::accessModel('home_model', 'getBanners') -> getResolve();
    }
}