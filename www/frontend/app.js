var AniMerch = angular.module('AniMerch', ['ngRoute', 'ngTouch', 'angularUtils.directives.dirPagination']);

AniMerch.run(function($rootScope) {
    $rootScope.toggleLoginButton = true;
    $rootScope.searchFigures = '';
    $rootScope.logout = function() {
        localStorage.removeItem('username');
        localStorage.removeItem('userType');
        localStorage.removeItem('userEmail');
        localStorage.removeItem('userImage');
        localStorage.removeItem('token');
    }
});

AniMerch.config(['$routeProvider', '$locationProvider',
    function ($routeProvider, $locationProvider) {
        $routeProvider
            .when("/home", {
                templateUrl: "frontend/module/home/view/view_home.html", 
                controller: "home_controller",
                resolve: {
                    banners: function (services) {
                        return services.get('home', 'getBanners');
                    },
                    categories: function (services) {
                        return services.get('home', 'getCategories');
                    }
                }
            }).when("/shop", {
                templateUrl: "frontend/module/shop/view/view_shop.html", 
                controller: "shop_controller",
                resolve: {
                    products: function (services) {
                        return services.get('shop', 'showProducts', {petition: ' ', username: localStorage.getItem('username')});
                    },
                    brands: function(services) {
                        return services.post('shop', 'getBrands');
                    },
                    franchises: function(services) {
                        return services.post('shop', 'getFranchises');
                    }
                }
            }).when("/auth", {
                templateUrl: "frontend/module/auth/view/view_auth.html", 
                controller: "auth_controller",
                resolve: {
                }
            }).when("/auth/activate/:token", {
                resolve: {
                    activate: function (services, $route) {
                        return services.get('auth', 'activate', {'token': $route.current.params.token});
                    }
                }
            }).when("/auth/:token", {
                templateUrl: "frontend/module/auth/view/view_auth.html", 
                controller: "auth_controller",
                resolve: {
                    update: function () {
                        localStorage.setItem('updatePass', 'updatePass');
                    }
                }
            }).when("/cart", {
                templateUrl: "frontend/module/cart/view/view_cart.html", 
                controller: "cart_controller",
                resolve: {
                    cartProducts: function (services) {
                        var LSvalues = [],
                        keys = Object.keys(localStorage),
                        i = keys.length;

                        while ( i-- ) {
                            if (keys[i].startsWith("cart")) {
                                LSvalues.push(localStorage.getItem(keys[i]));
                            }
                        }

                        return services.get('cart', 'loadCart', {cartFigures: LSvalues});
                    }
                }
            }).otherwise("/home", {
                templateUrl: "frontend/module/home/view/view_home.html", 
                controller: "home_controller"
            });
    }]);