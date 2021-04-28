<?php

class shop_model {
    private $bll;
    static $_instance;

    function __construct() {
        $this -> bll = shop_bll::getInstance();
    }// end_construct

    public static function getInstance() {
        if (!(self::$_instance instanceof self)) {
            self::$_instance = new self();
        }// end_if
        return self::$_instance;
    }// end_getInstance

    public function showProducts() {
        return $this -> bll -> showProducts();
    }// end_showProducts
}// end_shop_model