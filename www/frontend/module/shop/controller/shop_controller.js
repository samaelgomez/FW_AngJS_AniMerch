AniMerch.controller('shop_controller', function($scope, $http, services, products, brands, franchises) {

    $scope.allProducts = products;
    $scope.products = products;
    $scope.visits = $scope.allProducts.visits;
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

    console.log($scope.allProducts);

    $scope.filterProducts = function() {
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

// function renderProduct(figure) {
//   let product = `
//   <div class="profile">
//     <div class="profile__image" id="${figure.figureName}"><img src="${figure.image}"></div>
//     <div class="profile__info">
//       <h4>${figure.figureName}</h4>
//     </div>
//     <div class="profile__stats">
//       <p class="profile__stats__title"></p>
//       <h5 class="profile__stats__info"></h5>
//     </div>
//     <div class="profile__stats">
//       <h4 class="profile__stats__info">${figure.price}€</h4>
//     </div>
//     <div class="profile__cta"><a class="button cartButton" id="${figure.figureName}">Add to your cart</a></div>`;
//     if (figure.liked == 0 || figure.liked == undefined) {
//       product +=`<div class='heartButton heart' id="${figure.figureName}"></div>
//                 </div>`;
//     } else {
//       product +=`<div class='heartButton heart active' id="${figure.figureName}"></div>
//                 </div>`;
//     }
//   $('<section></section>').attr({'class':'results-section results--grid'}).html(product).appendTo('#loadedProducts');
// }

// window.onload = () =>{
//   $("body").on("click", ".heartButton", function() {
//     figureNameID = this.getAttribute('id');
//     if ($(this).hasClass('active')){
//       $(this).removeClass('active');
//       friendlyURL('?page=shop&op=removeLike').then(function(data) {
//         ajaxPromise(data, "POST", {username: localStorage.getItem('username'), figureName: figureNameID});
//       });
//     } else {
//       $(this).addClass('active');
//       friendlyURL('?page=shop&op=addLike').then(function(data) {
//         ajaxPromise(data, "POST", {username: localStorage.getItem('username'), figureName: figureNameID});
//       });
//     }
//   });

//   $("body").on("click", ".cartButton", function() {
//     localStorage.setItem('cart' + this.id, this.id);
//   });

//   let url = window.location.href.split('/');
//     if (url[3] == 'auth') {
//         $("#formRecover").hide();
//         $("#formRecoverPass").hide();
//         if (url[4] == 'recoverPass') {
//             $('.authForms').empty();
//             $("#reg").hide();
//             $("#log").hide();
//             $("#formRecoverPass").show();
//         }
//     }
// }