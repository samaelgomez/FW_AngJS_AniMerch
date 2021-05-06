<?php

class auth_model {
    private $bll;
    static $_instance;

    function __construct() {
        $this -> bll = auth_bll::getInstance();
    }// end_construct

    public static function getInstance() {
        if (!(self::$_instance instanceof self)) {
            self::$_instance = new self();
        }// end_if
        return self::$_instance;
    }// end_getInstance

    public function login($data) {
        return $this -> bll -> login($data);
    }// end_login

    public function createClient($data) {
        return $this -> bll -> createClient($data);
    }// end_createClient

    public function insertClient($data) {
        return $this -> bll -> insertClient($data);
    }// end_insertClient

    public function createShop($data) {
        return $this -> bll -> createShop($data);
    }// end_createShop

    public function insertShop($data) {
        return $this -> bll -> insertShop($data);
    }// end_insertShop
}// end_auth_model