<?php

class shop_bll {
    private $dao;
    static $_instance;

    function __construct() {
        $this -> dao = shop_dao::getInstance();
    }// end_construct

    public static function getInstance() {
        if (!(self::$_instance instanceof self)) {
            self::$_instance = new self();
        }// end_if
        return self::$_instance;
    }// end_getInstance

    public function showProducts() {
        return $this -> dao -> select_all_figures();
    }// end_showProducts
}// end_shop_bll