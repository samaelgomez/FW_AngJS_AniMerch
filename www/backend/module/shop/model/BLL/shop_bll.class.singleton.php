<?php

class shop_bll {
    private $dao;
    static $_instance;

    function __construct() {
        $this -> dao = shop_dao::getInstance();
    }// end_construct

    public static function getInstance() {
        if (!(self::$_instance instanceof self)) {
            self::$_instance = new self();
        }// end_if
        return self::$_instance;
    }// end_getInstance

    public function showProducts($username) {
        return $this -> dao -> select_all_figures($username);
    }// end_showProducts

    public function searchProducts($search) {
        return $this -> dao -> searchProducts($search);
    }// end_searchProducts

    public function getBrands() {
        return $this -> dao -> getBrands();
    }// end_getBrands

    public function getFranchises() {
        return $this -> dao -> getFranchises();
    }// end_getFranchises

    public function showFilteredProducts($filters) {
        return $this -> dao -> select_filtered_figures($filters);
    }// end_showFilteredProducts

    public function addVisit($filters) {
        return $this -> dao -> addVisit($filters);
    }// end_addVisit

    public function addLike($data) {
        return $this -> dao -> addLike($data);
    }// end_addLike

    public function removeLike($data) {
        return $this -> dao -> removeLike($data);
    }// end_removeLike
}// end_shop_bll