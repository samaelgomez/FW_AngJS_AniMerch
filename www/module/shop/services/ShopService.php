<?php

include (__DIR__ . '/../services/DAOService.php');
include (__DIR__ . '/../exceptions/NoProductsFoundException.php');

class ShopService {

    private $daoService;

    public function __construct() {
        $this->daoService = new DAOService();
    }

    public function getProducts($token, $userType, $username): array
    {
        $products = $this->daoService->select_all_figures($token, $userType, $username);

        return $products;
    }

    public function getFilteredProducts($filters): array
    {
        $products = $this->daoService->select_filtered_figures($filters);

        return $products;
    }

    public function addVisit($filters): array
    {
        $products = $this->daoService->addVisits($filters);

        return $products;
    }

    public function getOrderedProducts($filters): array
    {
        $products = $this->daoService->select_ordered_figures($filters);

        return $products;
    }

    public function getStandard(): array
    {
        $products = $this->daoService->select_standard();

        return $products;
    }

    public function getStatue(): array
    {
        $products = $this->daoService->select_statue();

        return $products;
    }

    public function getNendoroid(): array
    {
        $products = $this->daoService->select_nendoroid();

        return $products;
    }

    public function getTypedFigure($type): array
    {
        $products = $this->daoService->select_typed_figure($type);

        return $products;
    }

    public function autocomplete($query): array
    {
        $products = $this->daoService->select_autocomplete($query);

        return $products;
    }

    public function getBanners(): array
    {
        $products = $this->daoService->select_all_banners();

        return $products;
    }

    public function addLikedProduct($username, $figureName)
    {
        $this->daoService->addLikedProduct($username, $figureName);
    }

    public function removeLikedProduct($username, $figureName)
    {
        $this->daoService->removeLikedProduct($username, $figureName);
    }

    public function addUserLikedProduct($username, $figureName)
    {
        $this->daoService->addUserLikedProduct($username, $figureName);
    }

    public function removeUserLikedProduct($username, $figureName)
    {
        $this->daoService->removeUserLikedProduct($username, $figureName);
    }
}