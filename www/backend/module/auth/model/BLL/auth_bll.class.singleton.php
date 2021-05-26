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

    public function insertClient($data) {
        return $this -> dao -> insertClient($data);
    }// end_insertClient

    public function insertShop($data) {
        return $this -> dao -> insertShop($data);
    }// end_insertShop

    public function activate($token) {
        return $this -> dao -> activate($token);
    }// end_activate

    public function tokenForRecover($email) {
        return $this -> dao -> tokenForRecover($email);
    }// end_tokenForRecover

    public function updatePass($data) {
        return $this -> dao -> updatePass($data);
    }// end_updatePass

    public function socialLogin($data) {
        return $this -> dao -> socialLogin($data);
    }// end_socialLogin

    public function insertSocialLogin($data) {
        return $this -> dao -> insertSocialLogin($data);
    }// end_insertSocialLogin
}// end_auth_bll