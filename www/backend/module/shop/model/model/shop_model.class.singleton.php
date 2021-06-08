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

    public function showProducts($username) {
        return $this -> bll -> showProducts($username);
    }// end_showProducts

    public function searchProducts($search) {
        return $this -> bll -> searchProducts($search);
    }// end_searchProducts

    public function getBrands() {
        return $this -> bll -> getBrands();
    }// end_getBrands

    public function getFranchises() {
        return $this -> bll -> getFranchises();
    }// end_getFranchises

    public function showFilteredProducts($filters) {
        return $this -> bll -> showFilteredProducts($filters);
    }// end_showFilteredProducts

    public function addVisit($filters) {
        return $this -> bll -> addVisit($filters);
    }// end_addVisit

    public function addLike($data) {
        return $this -> bll -> addLike($data);
    }// end_addLike

    public function removeLike($data) {
        return $this -> bll -> removeLike($data);
    }// end_removeLike
}// end_shop_model