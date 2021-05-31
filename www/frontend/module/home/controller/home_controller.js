AniMerch.controller('home_controller', function($scope, $window, banners) {

    $scope.slides = banners;
    $scope.owlOptionsTestimonials = {
        autoPlay: 4000,
        stopOnHover: true,
        slideSpeed: 300,
        paginationSpeed: 600,
        items: 1
    }

});

AniMerch.directive("owlCarousel", function() {
    return {
        restrict: 'E',
        transclude: false,
        link: function(scope) {
            scope.initCarousel = function(element) {
                // provide any default options you want
                var defaultOptions = {};
                var customOptions = scope.$eval($(element).attr('data-options'));
                // combine the two options objects
                for (var key in customOptions) {
                    defaultOptions[key] = customOptions[key];
                }
                // init carousel
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
                // wait for the last item in the ng-repeat then call init
                if (scope.$last) {
                    scope.initCarousel(element.parent());
                }
            }
        };
    }
]);

// $(document).ready(function () {
//     $("#category2").hide();
//     $("#category3").hide();
//     $("#show_even_more").hide();
//     $("body").on("click", "#show_more", function() {
//         $("#category2").show();
//         $("#show_more").hide();
//         $("#show_even_more").show();
//     });
//     $("body").on("click", "#show_even_more", function() {
//         $("#category3").show();
//         $("#show_even_more").hide();
//     });

//     printHeaderButton();
//     loadCarousel();
// });