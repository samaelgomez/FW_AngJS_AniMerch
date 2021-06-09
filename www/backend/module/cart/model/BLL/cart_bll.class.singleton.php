<?php

class cart_bll {
    private $dao;
    static $_instance;

    function __construct() {
        $this -> dao = cart_dao::getInstance();
    }// end_construct

    public static function getInstance() {
        if (!(self::$_instance instanceof self)) {
            self::$_instance = new self();
        }// end_if
        return self::$_instance;
    }// end_getInstance

    public function loadCart($username) {
        return $this -> dao -> loadCart($username);
    }// end_loadCart

    public function addToCart($data) {
        return $this -> dao -> addToCart($data);
    }// end_addToCart

    public function removeFromCart($data) {
        return $this -> dao -> removeFromCart($data);
    }// end_removeFromCart

    public function substractStock($figures) {
        return $this -> dao -> substractStock($figures);
    }// end_substractStock

    public function purchase($data) {
        return $this -> dao -> purchase($data);
    }// end_purchase
}// end_cart_bll