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

    public function loadCart($username) {
        return $this -> bll -> loadCart($username);
    }// end_loadCart

    public function addToCart($data) {
        return $this -> bll -> addToCart($data);
    }// end_addToCart

    public function removeFromCart($data) {
        return $this -> bll -> removeFromCart($data);
    }// end_removeFromCart

    public function substractStock($figures) {
        return $this -> bll -> substractStock($figures);
    }// end_substractStock

    public function purchase($data) {
        return $this -> bll -> purchase($data);
    }// end_purchase
}// end_cart_model