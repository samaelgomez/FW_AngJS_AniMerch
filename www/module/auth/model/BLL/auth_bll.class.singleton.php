<?php

class auth_bll {
    private $dao;
    static $_instance;

    function __construct() {
        $this -> dao = auth_dao::getInstance();
    }// end_construct

    public static function getInstance() {
        if (!(self::$_instance instanceof self)) {
            self::$_instance = new self();
        }// end_if
        return self::$_instance;
    }// end_getInstance

    public function login($data) {
        return $this -> dao -> login($data);
    }// end_login

    public function createClient($data) {
        return $this -> dao -> createClient($data);
    }// end_createClient

    public function insertClient($data) {
        return $this -> dao -> insertClient($data);
    }// end_insertClient

    public function createShop($data) {
        return $this -> dao -> createShop($data);
    }// end_createShop

    public function insertShop($data) {
        return $this -> dao -> insertShop($data);
    }// end_insertShop
}// end_auth_bll