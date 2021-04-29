let filterArray=[];
let filtros = [{categoria:"brand", contenido:["Alter","Aniplex","GoodSmile", "Kadokawa"]},{categoria:"franchise", contenido:["Bleach","BNHA", "Naruto", "Nier", "OnePiece", "Vocaloid"]}]

function display_image(id, image_url){
  document.getElementById(id).src = image_url;
}

function get_random_dog_image(id){
  url = "https://dog.ceo/api/breeds/image/random";

  fetch(url)
  .then(function(response){
    return response.json();
  })
  .then(function(data){
    display_image(id, data.message);
  })
  .catch(function(error){
    console.log("Error: " + error);
  });
}

function renderDetails(figure) {
  
  get_random_dog_image('image1');
  get_random_dog_image('image2');
  get_random_dog_image('image3');

  let product = `
  <div class="products" id="details_container">
    <div class="container">
      <div class="row">
        <div class="col-md-4 col-xs-12">
          <div>
            <img src="${figure[0].image}" alt="" class="img-fluid wc-image">
          </div>
          <div class="row">
            <div class="col-sm-4 col-xs-6">
              <div>
                <img src="view/images/png.png" alt="" class="img-fluid">
              </div>
              <br>
            </div>
            <div class="col-sm-4 col-xs-6">
              <div>
                <img src="view/images/png.png" alt="" class="img-fluid">
              </div>
              <br>
            </div>
            <div class="col-sm-4 col-xs-6">
              <div>
                <img src="view/images/png.png" alt="" class="img-fluid">
              </div>
              <br>
            </div>
          </div>
        </div>

        <div class="col-md-8 col-xs-12">
          <form action="#" method="post" class="form">
            <h2>${figure[0].figureName}</h2>
            <br>
            <p class="lead">
              <strong class="text-primary">${figure[0].price}€</strong>
            </p>

            <br>

            <p class="lead">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Excepturi ratione molestias maxime odio. Provident ratione vero, corrupti, optio laborum aut!
            </p>

            <br> 

            <div class="row">
              <div class="col-sm-4">
                <label class="control-label">Extra 1</label>
                <div class="form-group">
                  <select class="form-control">
                    <option value="0">18 gears</option>
                    <option value="1">21 gears</option>
                    <option value="2">27 gears</option>
                  </select>
                </div>
              </div>
              <div class="col-sm-8">
                <label class="control-label">Quantity</label>

                <div class="row">
                  <div class="col-sm-6">
                    <div class="form-group">
                      <input type="text" class="form-control" placeholder="1">
                    </div>
                  </div>

                  <div class="col-sm-6">
                    <a href="#" class="btn btn-primary btn-block">Add to Cart</a>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
  
  <div class="latest-products">
    <div class="container">
      <div class="row">
        <div class="col-md-12">
          <div class="section-heading">
            <h2>Similar Products</h2>
            <a href="products.html">view more <i class="fa fa-angle-right"></i></a>
          </div>
        </div>
        <div class="col-md-4">
          <div class="product-item">
            <a href="product-details.html"></a>
            <div class="down-content">
                <img id="image1"/>
                <h4>Random doggo 1</h4></a>
                <h6><small><del>$99.00</del></small> FREE :)</h6>
            </div>
          </div>
        </div>

        <div class="col-md-4">
          <div class="product-item">
            <a href="product-details.html"></a>
            <div class="down-content">
              <img id="image2"/>
              <h4>Random doggo 2</h4></a>
              <h6><small><del>$99.00</del></small> FREE :)</h6>
            </div>
          </div>
        </div>

        <div class="col-md-4">
          <div class="product-item">
            <a href="product-details.html"></a>
            <div class="down-content">
              <img id="image3"/>
              <h4>Random doggo 3</h4></a>
              <h6><small><del>$99.00</del></small> FREE :)</h6>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>`;

  $('<div></div>').html(product).appendTo('#loadedDetails');
}

function loadDetails(figureName) {
  $('.variation').empty();
  $('#loadedFilters').empty();
  $('#loadedProducts').empty();
  $('#most_visited').empty();

  friendlyURL('?page=shop&op=showDetails').then(function(data) {
    ajaxPromise(data, "POST", {fname: figureName})
    .then((data)=>{
      renderDetails(data);
    })
  })
}

function addVisit(figureName) {
  friendlyURL('?page=shop&op=addVisit').then(function(data) {
    ajaxPromise(data, "POST", {upfname: figureName})
    .then((data)=>{
    })
  })
}

function renderProduct(figure) {
  let product = `
  <div class="profile">
    <div class="profile__image" id="${figure.figureName}"><img src="${figure.image}"></div>
    <div class="profile__info">
      <h4>${figure.figureName}</h4>
    </div>
    <div class="profile__stats">
      <p class="profile__stats__title"></p>
      <h5 class="profile__stats__info"></h5>
    </div>
    <div class="profile__stats">
      <h4 class="profile__stats__info">${figure.price}€</h4>
    </div>
    <div class="profile__cta"><a class="button cartButton" id="${figure.figureName}">Add to your cart</a></div>`;
    if (figure.liked == 0 || figure.liked == undefined) {
      product +=`<div class='heartButton heart' id="${figure.figureName}"></div>
                </div>`;
    } else {
      product +=`<div class='heartButton heart active' id="${figure.figureName}"></div>
                </div>`;
    }
  $('<section></section>').attr({'class':'results-section results--grid'}).html(product).appendTo('#loadedProducts');
}

function deleteFromArray(array,to_delete,tipo) {
    let index = array.map(function(e) { return e.tipo; }).indexOf(tipo);
    if (index >-1) {
        let indexFilter = array[index].filters.indexOf(to_delete)
        array[index].filters.splice(indexFilter,1)
        if (array[index].filters.length === 0) {
            array.splice(index,1)
        }
        petition=""
        return array
    }
}

function makePetition() {
  let petition = "";
  filterArray.forEach((Tipos,index1) => {
        Tipos.filters.forEach((filtro,index2)=>{
            if (index2 === 0) {
              petition += '(';
            }

            petition += ` ${Tipos.tipo} = '${filtro}' `
            if (Tipos.filters.length-1 === index2) {
              petition += ')';
                if (filterArray.length-1 === index1) {
                    petition +=";"
                }else{
                    petition +="AND"
                }
            } else {
                petition +="OR"
            }
        })
    });

    return petition;

}

function pintar_filtros() {
    return new Promise(resolve =>{
        let destination =  document.getElementById("loadedFilters")
        let to_return = "";
        filtros.forEach(filtro =>{
            to_return += `<h3>${filtro.categoria.charAt(0).toUpperCase() + filtro.categoria.slice(1)}<h3/>`
            filtro.contenido.forEach(content =>{
                to_return += `<label>
                    <input type="checkbox" id=${filtro.categoria} class="option-input checkbox rojo" 
                                value=${content}
                        />
                        ${content}
                </label>`
            })
        })
        to_return += `<div class="profile__cta" id="filter_button"><a class="button">Filter</a></div>`;
        destination.innerHTML = to_return
        resolve(true)
    })
}

function addFilterEvent(array,eventType) {
    array.forEach(value => {
        value.addEventListener("click",function(e) {
            if (e.target.checked) {
                let exists = filterArray.some(filter=>filter.tipo == eventType);
                if (!exists) {
                    filterArray = [...filterArray,{tipo:eventType, filters:[e.target.value]}]
                } else {
                    let index = filterArray.map(function(e) { return e.tipo; }).indexOf(eventType);
                    filterArray[index].filters = [...filterArray[index].filters,e.target.value]
                }
            }else{
                filterArray = deleteFromArray(filterArray,e.target.value,eventType)
            }
        })
    });
}

function loadPage(petition = "") {
  friendlyURL('?page=shop&op=showProducts').then(function(data) {
    ajaxPromise(data, "POST", {petition: petition})
    .then((data)=>{
      pintar_filtros().then(result =>{
        if (result) {
          let brands = document.querySelectorAll("#brand")
          addFilterEvent(brands,"brand")
          let franchises = document.querySelectorAll("#franchise")
          addFilterEvent(franchises,"franchise")
          document.getElementById("filter_button").addEventListener("click",()=>{
            localStorage.setItem('petition', makePetition());
            location.reload();
          })
        }
      })
      data.length === 0
                  ? document.getElementById('loadedProducts').innerHTML = '<h3>No products found!</h3>'
                  : data.forEach(renderProduct);
    })
    .catch((e)=>{
      console.log(e)
    })
  });
}

window.onload = () =>{
  $("body").on("click", ".category", function() {
    localStorage.setItem('category', this.getAttribute('id'));
  });

  $('<h2></h2>').html(localStorage.getItem("category")).appendTo('#figure_title');

  $("body").on("click", ".profile__image", function() {
    addVisit(this.getAttribute('id'));
    loadDetails(this.getAttribute('id'));
  });

  document.getElementById("All").addEventListener("click",()=>{
    localStorage.removeItem('petition');
  })
  
  let dbpetition = localStorage.getItem('petition') || " ";

  if (document.getElementById('loadedProducts') != undefined) {
    loadPage(dbpetition);
  }
}

// function loadPage(petition="") {
//   ajaxPromise("module/shop/controller/controller_shop.php", "POST", {petition: petition, loggedUser: localStorage.getItem('token'), userType: localStorage.getItem('userType'),
//                                                                       username: localStorage.getItem('username')})
//   .then((data)=>{
//     pintar_filtros().then(result =>{
//       if (result) {
//         let brands = document.querySelectorAll("#brand")
//         addFilterEvent(brands,"brand")
//         let franchises = document.querySelectorAll("#franchise")
//         addFilterEvent(franchises,"franchise")
//         document.getElementById("filter_button").addEventListener("click",()=>{
//           localStorage.setItem('petition', makePetition());
//           location.reload();
//         })
//       }
//     })
//     data.length === 0
//                 ? document.getElementById('loadedProducts').innerHTML = '<h3>No products found!</h3>'
//                 : data.forEach(renderProduct);
//   })
//   .catch((e)=>{
//       console.log(e)
//   })
// }

// window.onload = () =>{

//   $("body").on("click", ".heartButton", function() {
//     if ($(this).hasClass('active')){
//       $(this).removeClass('active');
//       activeHeart = false;
//     }else{
//       $(this).addClass('active');
//       activeHeart = true;
//     }
//     ajaxPromiseNoJSON("module/shop/controller/controller_shop.php", "POST", {heartState: activeHeart, username: localStorage.getItem('username'), figureName: this.getAttribute('id')});
//   });

//   $("body").on("click", ".cartButton", function() {
//     localStorage.setItem('cart' + this.id, this.id);
//   });

//   $("#search").keyup(function(){
//     var searchText = $(this).val();
//     if(searchText!=''){
//         $.ajax({
//             url: 'module/shop/controller/controller_shop.php',
//             type: 'POST',
//             data: {query: searchText},
//             success: function(data) {
//               $('#loadedProducts').empty();
//               data.forEach(renderProduct);
//             },
//             error: function(e) {
//                 console.log(e);
//             }
//         })
//     } else {
//       $('#loadedProducts').empty();
//       loadPage(dbpetition);
//     }
// })
//   printHeaderButton();
  
//   if (document.getElementById('profileContentContainer') != undefined) {
//     loadProfilePage();
//   }
// }