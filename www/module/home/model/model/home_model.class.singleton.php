<?php

class home_model {
    private $bll;
    static $_instance;

    function __construct() {
        $this -> bll = home_bll::getInstance();
    }// end_construct

    public static function getInstance() {
        if (!(self::$_instance instanceof self)) {
            self::$_instance = new self();
        }// end_if
        return self::$_instance;
    }// end_getInstance

    public function getBanners() {
        return $this -> bll -> getBanners();
    }// end_getBanners
}// end_home_model