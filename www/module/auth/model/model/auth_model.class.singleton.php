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

    public function insertClient($data) {
        return $this -> bll -> insertClient($data);
    }// end_insertClient

    public function insertShop($data) {
        return $this -> bll -> insertShop($data);
    }// end_insertShop

    public function activate($token) {
        return $this -> bll -> activate($token);
    }// end_activate

    public function tokenForRecover($email) {
        return $this -> bll -> tokenForRecover($email);
    }// end_tokenForRecover

    public function updatePass($data) {
        return $this -> bll -> updatePass($data);
    }// end_updatePass

    public function socialLogin($data) {
        return $this -> bll -> socialLogin($data);
    }// end_socialLogin

    public function insertSocialLogin($data) {
        return $this -> bll -> insertSocialLogin($data);
    }// end_insertSocialLogin
}// end_auth_model