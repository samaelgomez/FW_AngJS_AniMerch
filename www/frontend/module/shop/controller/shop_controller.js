AniMerch.controller('shop_controller', function($scope, products, brands, franchises) {

    $scope.allProducts = products;
    $scope.products = products;
    $scope.filteredProducts = [];
    $scope.brands = brands;
    $scope.franchises = franchises;

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
});


// function display_image(id, image_url){
//   document.getElementById(id).src = image_url;
// }

// function get_random_dog_image(id){
//   url = "https://dog.ceo/api/breeds/image/random";

//   fetch(url)
//   .then(function(response){
//     return response.json();
//   })
//   .then(function(data){
//     display_image(id, data.message);
//   })
//   .catch(function(error){
//     console.log("Error: " + error);
//   });
// }

// function renderDetails(figure) {
  
//   get_random_dog_image('image1');
//   get_random_dog_image('image2');
//   get_random_dog_image('image3');

//   let product = `
//   <div class="products" id="details_container">
//     <div class="container">
//       <div class="row">
//         <div class="col-md-4 col-xs-12">
//           <div>
//             <img src="${figure[0].image}" alt="" class="img-fluid wc-image">
//           </div>
//           <div class="row">
//             <div class="col-sm-4 col-xs-6">
//               <div>
//                 <img src="view/images/png.png" alt="" class="img-fluid">
//               </div>
//               <br>
//             </div>
//             <div class="col-sm-4 col-xs-6">
//               <div>
//                 <img src="view/images/png.png" alt="" class="img-fluid">
//               </div>
//               <br>
//             </div>
//             <div class="col-sm-4 col-xs-6">
//               <div>
//                 <img src="view/images/png.png" alt="" class="img-fluid">
//               </div>
//               <br>
//             </div>
//           </div>
//         </div>

//         <div class="col-md-8 col-xs-12">
//           <form action="#" method="post" class="form">
//             <h2>${figure[0].figureName}</h2>
//             <br>
//             <p class="lead">
//               <strong class="text-primary">${figure[0].price}€</strong>
//             </p>

//             <br>

//             <p class="lead">
//               Lorem ipsum dolor sit amet, consectetur adipisicing elit. Excepturi ratione molestias maxime odio. Provident ratione vero, corrupti, optio laborum aut!
//             </p>

//             <br> 

//             <div class="row">
//               <div class="col-sm-4">
//                 <label class="control-label">Extra 1</label>
//                 <div class="form-group">
//                   <select class="form-control">
//                     <option value="0">18 gears</option>
//                     <option value="1">21 gears</option>
//                     <option value="2">27 gears</option>
//                   </select>
//                 </div>
//               </div>
//               <div class="col-sm-8">
//                 <label class="control-label">Quantity</label>

//                 <div class="row">
//                   <div class="col-sm-6">
//                     <div class="form-group">
//                       <input type="text" class="form-control" placeholder="1">
//                     </div>
//                   </div>

//                   <div class="col-sm-6">
//                     <a href="#" class="btn btn-primary btn-block">Add to Cart</a>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   </div>
  
//   <div class="latest-products">
//     <div class="container">
//       <div class="row">
//         <div class="col-md-12">
//           <div class="section-heading">
//             <h2>Similar Products</h2>
//             <a href="products.html">view more <i class="fa fa-angle-right"></i></a>
//           </div>
//         </div>
//         <div class="col-md-4">
//           <div class="product-item">
//             <a href="product-details.html"></a>
//             <div class="down-content">
//                 <img id="image1"/>
//                 <h4>Random doggo 1</h4></a>
//                 <h6><small><del>$99.00</del></small> FREE :)</h6>
//             </div>
//           </div>
//         </div>

//         <div class="col-md-4">
//           <div class="product-item">
//             <a href="product-details.html"></a>
//             <div class="down-content">
//               <img id="image2"/>
//               <h4>Random doggo 2</h4></a>
//               <h6><small><del>$99.00</del></small> FREE :)</h6>
//             </div>
//           </div>
//         </div>

//         <div class="col-md-4">
//           <div class="product-item">
//             <a href="product-details.html"></a>
//             <div class="down-content">
//               <img id="image3"/>
//               <h4>Random doggo 3</h4></a>
//               <h6><small><del>$99.00</del></small> FREE :)</h6>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   </div>`;

//   $('<div></div>').html(product).appendTo('#loadedDetails');
// }

// function loadDetails(figureName) {
//   $('.variation').empty();
//   $('#loadedFilters').empty();
//   $('#loadedProducts').empty();
//   $('#most_visited').empty();

//   friendlyURL('?page=shop&op=showDetails').then(function(data) {
//     ajaxPromise(data, "POST", {fname: figureName})
//     .then((data)=>{
//       renderDetails(data);
//     })
//   })
// }

// function addVisit(figureName) {
//   friendlyURL('?page=shop&op=addVisit').then(function(data) {
//     ajaxPromise(data, "POST", {upfname: figureName})
//     .then((data)=>{
//     })
//   })
// }

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

// function makePetition() {
//   let petition = "";
//   filterArray.forEach((Tipos,index1) => {
//         Tipos.filters.forEach((filtro,index2)=>{
//             if (index2 === 0) {
//               petition += '(';
//             }

//             petition += ` ${Tipos.tipo} = '${filtro}' `
//             if (Tipos.filters.length-1 === index2) {
//               petition += ')';
//                 if (filterArray.length-1 === index1) {
//                     petition +=";"
//                 }else{
//                     petition +="AND"
//                 }
//             } else {
//                 petition +="OR"
//             }
//         })
//     });

//     return petition;

// }

// window.onload = () =>{
//   $("body").on("click", ".category", function() {
//     localStorage.setItem('category', this.getAttribute('id'));
//   });

//   $('<h2></h2>').html(localStorage.getItem("category")).appendTo('#figure_title');

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

//   $("body").on("click", ".profile__image", function() {
//     addVisit(this.getAttribute('id'));
//     loadDetails(this.getAttribute('id'));
//   });

//   document.getElementById("All").addEventListener("click",()=>{
//     localStorage.removeItem('petition');
//   })
  
//   let dbpetition = localStorage.getItem('petition') || " ";

//   if (document.getElementById('loadedProducts') != undefined) {
//     loadPage(dbpetition);
//   }

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