<?php

class home_bll {
    private $dao;
    static $_instance;

    function __construct() {
        $this -> dao = home_dao::getInstance();
    }// end_construct

    public static function getInstance() {
        if (!(self::$_instance instanceof self)) {
            self::$_instance = new self();
        }// end_if
        return self::$_instance;
    }// end_getInstance

    public function getBanners() {
        return $this -> dao -> select_all_banners();
    }// end_getBanners

    public function getCategories() {
        return $this -> dao -> select_all_categories();
    }// end_getCategories
}// end_home_bll