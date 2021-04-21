<?php

include (__DIR__ . '/../services/DAOService.php');

class HomeService {

    private $daoService;

    public function __construct() {
        $this->daoService = new DAOService();
    }

    public function getBanners(): array
    {
        $products = $this->daoService->select_all_banners();

        return $products;
    }
}