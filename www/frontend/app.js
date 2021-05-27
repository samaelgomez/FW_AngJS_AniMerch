var AniMerch = angular.module('AniMerch', ['ngRoute']);

AniMerch.config(['$routeProvider', '$locationProvider',
    function ($routeProvider, $locationProvider) {
        $routeProvider
                .when("/home", {
                    templateUrl: "frontend/module/home/view/view_home.html", 
                    controller: "home_controller",
                }).otherwise("/home", {
                    templateUrl: "frontend/module/home/view/view_home.html", 
                    controller: "home_controller"
                });
    }]);