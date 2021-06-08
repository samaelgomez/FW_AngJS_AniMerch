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

    public function loadCart($figures) {
        return $this -> dao -> loadCart($figures);
    }// end_loadCart

    public function substractStock($figures) {
        return $this -> dao -> substractStock($figures);
    }// end_substractStock

    public function purchase($data) {
        return $this -> dao -> purchase($data);
    }// end_purchase
}// end_cart_bll