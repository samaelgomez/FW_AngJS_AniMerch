<?php

class cart_model {
    private $bll;
    static $_instance;

    function __construct() {
        $this -> bll = cart_bll::getInstance();
    }// end_construct

    public static function getInstance() {
        if (!(self::$_instance instanceof self)) {
            self::$_instance = new self();
        }// end_if
        return self::$_instance;
    }// end_getInstance

    public function loadCart($figures) {
        return $this -> bll -> loadCart($figures);
    }// end_loadCart

    public function substractStock($figures) {
        return $this -> bll -> substractStock($figures);
    }// end_substractStock
}// end_cart_model