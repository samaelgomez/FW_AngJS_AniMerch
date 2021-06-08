AniMerch.controller('shop_controller', function($scope, $http, services, products, brands, franchises) {

    if (localStorage.searchFilter) {
        $scope.products = services.get('shop', 'searchProducts', {search: localStorage.searchFilter})
        .then((result)=>{
            if (result) {
                $scope.products = result;
            } else {
                reject("Search error");
            }
        })
    } else {
        $scope.products = products;
    }

    $scope.allProducts = products;
    $scope.filteredProducts = [];
    $scope.brands = brands;
    $scope.franchises = franchises;
    $scope.toggleShowDetails = false;

    if (!localStorage.category) {
        localStorage.category = 'All';
    } else if (localStorage.category !== 'All') {
        $scope.allProducts.forEach(element => {
            if (element.type == localStorage.category) {
                $scope.filteredProducts.push(element);
            }
        })
        $scope.products = $scope.filteredProducts;
    }

    $scope.category = localStorage.category;
    $scope.owlOptionsTestimonials = {
        autoPlay: 4000,
        stopOnHover: true,
        slideSpeed: 300,
        paginationSpeed: 600,
        items: 3
    }

    $scope.filterProducts = function() {
        localStorage.removeItem('searchFilter');
        $scope.category = 'All';
        $scope.filteredProducts = [];
        $scope.filteredBrands = [];
        $scope.filteredFranchises = [];
        angular.forEach($scope.brands, function(brand){
            if (brand.selected)
                $scope.filteredBrands.push(brand.brand);
        })
        angular.forEach($scope.franchises, function(franchise){
            if (franchise.selected)
                $scope.filteredFranchises.push(franchise.franchise);
        })
        $scope.allProducts.forEach(element => {
            if ($scope.filteredBrands.length == 0) {
                if ($scope.filteredFranchises.includes(element.franchise))
                    $scope.filteredProducts.push(element);
            } else {
                if ($scope.filteredFranchises.length == 0) {
                    if ($scope.filteredBrands.includes(element.brand))
                        $scope.filteredProducts.push(element);
                } else {
                    if ($scope.filteredBrands.includes(element.brand) && $scope.filteredFranchises.includes(element.franchise))
                        $scope.filteredProducts.push(element);
                }
            }
        });
        $scope.products = $scope.filteredProducts;
    };

    $scope.showDetails = function(product) {
        $scope.detailedProduct = product;

        for (let i = 0; i < 3; i++) {
            $http.get("https://dog.ceo/api/breeds/image/random")
            .then(function(response){
                if (i == 0) {
                    $scope.randomImage1 = response.data.message;
                } else if (i == 1) {
                    $scope.randomImage2 = response.data.message;
                } else {
                    $scope.randomImage3 = response.data.message;
                }
            });
        }
        
        services.get('shop', 'addVisit', {upfname: product.figureName});
        $scope.toggleShowDetails = true;
    };

    $scope.likeHandler = function(product, productLiked) {
        if (localStorage.username) {
            if (productLiked == '') {
                services.get('shop', 'addLike', {username: localStorage.getItem('username'), figureName: product.figureName});
                let likedFigure = angular.element(document.querySelector('#' + product.figureName));
                likedFigure.addClass('active');
            } else {
                services.get('shop', 'removeLike', {username: localStorage.getItem('username'), figureName: product.figureName});
                let likedFigure = angular.element(document.querySelector('#' + product.figureName));
                likedFigure.removeClass('active');
            }
        } else {
            location.replace('#/auth');
        }
    };

    $scope.addToCart = function(product) {
        localStorage.setItem('cart' + product.figureName, product.figureName);
    };

    AniMerch.directive("owlCarousel", function() {
        return {
            restrict: 'E',
            transclude: false,
            link: function(scope) {
                scope.initCarousel = function(element) {
                    var defaultOptions = {};
                    var customOptions = scope.$eval($(element).attr('data-options'));
                    for (var key in customOptions) {
                        defaultOptions[key] = customOptions[key];
                    }
                    var curOwl = $(element).data('owlCarousel');
                    if (!angular.isDefined(curOwl)) {
                        $(element).owlCarousel(defaultOptions);
                    }
                    scope.cnt++;
                };
            }
        };
    }).directive('owlCarouselItem', [
        function() {
            return {
                restrict: 'A',
                transclude: false,
                link: function(scope, element) {
                    if (scope.$last) {
                        scope.initCarousel(element.parent());
                    }
                }
            };
        }
    ]);
});