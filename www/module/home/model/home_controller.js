function renderBanner(image) {
    let banner = "";
    banner += `
    <div class="banner-item-carousel">
        <img class="banner-item-carousel" src="${image.path}">
    </div>
    `;

    $('.owl-carousel')
    .trigger('add.owl.carousel', [`<div class="banner-item-carousel"><img class="banner-item-carousel" src="${image.path}"></div>`])
    .trigger('refresh.owl.carousel');
}

function loadCarousel() {
    friendlyURL('?page=home&op=getBanners').then(function(data) {
        ajaxPromise(data, "GET")
        .then((data)=>{
            data.forEach(renderBanner);
        })
    });
  }

$(document).ready(function () {
    $("#category2").hide();
    $("#category3").hide();
    $("#show_even_more").hide();
    $("body").on("click", "#show_more", function() {
        $("#category2").show();
        $("#show_more").hide();
        $("#show_even_more").show();
    });
    $("body").on("click", "#show_even_more", function() {
        $("#category3").show();
        $("#show_even_more").hide();
    });

    loadCarousel();
});