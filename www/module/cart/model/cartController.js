var check = false;

function changeVal(el) {
  var qt = parseFloat(el.parent().children(".qt").html());
  var price = parseFloat(el.parent().children(".price").html());
  var eq = Math.round(price * qt * 100) / 100;
  
  el.parent().children(".full-price").html( eq + "€" );
  
  changeTotal();			
}

function changeTotal() {
  var price = 0;
  
  $(".full-price").each(function(index){
    price += parseFloat($(".full-price").eq(index).html());
  });
  
  price = Math.round(price * 100) / 100;
  var shipping = parseFloat($(".shipping span").html());
  var fullPrice = Math.round((price + shipping) *100) / 100;
  
  if(price == 0) {
    fullPrice = 0;
  }
  
  $(".subtotal span").html(price);
  $(".total span").html(fullPrice);
}

function renderCartProduct(figure) {
    let cartProduct = `
    <article class="product" id="${figure.figureName}">
        <header>
            <a class="remove">
                <img src="${figure.image}" alt="">
                <h3>Remove product</h3>
            </a>
        </header>

        <div class="content">
            <h1>${figure.figureName}</h1>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Soluta, numquam quis perspiciatis ea ad omnis provident laborum dolore in atque.
        </div>

        <footer class="content">
            <span class="qt-minus" id="${figure.figureName}">-</span>
            <span class="qt" id="${figure.figureName}">1</span>
            <span class="qt-plus" id="${figure.figureName}">+</span>

            <h2 class="full-price">
                ${figure.price}€
            </h2>

            <h2 class="price">
                ${figure.price}€
            </h2>
        </footer>
    </article>`;
    $('<section></section>').attr({'id':'cart'}).html(cartProduct).appendTo('#cartContainer');
    localStorage.setItem(figure.figureName + 'Stock', figure.stock);
}

function loadCart() {
    var LSvalues = [],
        keys = Object.keys(localStorage),
        i = keys.length;

    while ( i-- ) {
        if (keys[i].startsWith("cart")) {
            LSvalues.push(localStorage.getItem(keys[i]));
        }
    }

    ajaxPromise("module/cart/controller/cartController.php", "POST", {action: 'list', cartFigures: LSvalues})
    .then((data)=>{
        data.forEach(renderCartProduct);
    })
}

$(document).ready(function(){

    loadCart();
  
    $("body").on("click", ".remove", function() {
        var el = $(this);
        el.parent().parent().addClass("removed");
        window.setTimeout(
        function(){
            el.parent().parent().slideUp('fast', function() { 
            el.parent().parent().remove(); 
            if($(".product").length == 0) {
                if(check) {
                $("#cart").html("<br/><h1>Checkout done successfully!</h1>");
                } else {
                $("#cart").html("<br/><h1>No products!</h1>");
                }
            }
            changeTotal(); 
            });
        }, 200);
    });
    
    $("body").on("click", ".qt-plus", function() {

        if ($(this).parent().children(".qt").html()<localStorage.getItem($(this).parent().children(".qt-plus")[0].id + 'Stock')) {
            
            $(this).parent().children(".qt").html(parseInt($(this).parent().children(".qt").html()) + 1);

        }
        
        $(this).parent().children(".full-price").addClass("added");
            
        var el = $(this);
        window.setTimeout(function(){el.parent().children(".full-price").removeClass("added"); changeVal(el);}, 150);
    });

    $("body").on("click", ".qt-minus", function() {
        
        child = $(this).parent().children(".qt");
        
        if(parseInt(child.html()) > 1) {
        child.html(parseInt(child.html()) - 1);
        }
        
        $(this).parent().children(".full-price").addClass("minused");
        
        var el = $(this);
        window.setTimeout(function(){el.parent().children(".full-price").removeClass("minused"); changeVal(el);}, 150);
    });
    
    window.setTimeout(function(){$(".is-open").removeClass("is-open")}, 1200);
    
    $("body").on("click", ".btn", function() {
        check = true;
        $(".remove").click();
    });
});