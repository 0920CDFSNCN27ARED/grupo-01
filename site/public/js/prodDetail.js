const form = document.getElementById("cart-form");

const id = getIdFromUrl();
form.addEventListener("submit", (event) => {
 
    const quantity = Number(document.getElementById("quantity").value);

    const prod = getCartProduct(cart, id);

    if (prod) {
        prod.quantity += quantity;
    } else {
        cart.push({
            id: id,
            quantity: quantity === 0 ? 1 : Number(quantity),
        });
    }
    localStorage.setItem(localStorageKey, JSON.stringify(cart));
});

$(function(){
    $('.attrib .option').click(function(){
      $(this).siblings().removeClass('activ');
      $(this).addClass('activ');
    })
    $('.zoomControl').click(function(){
      $(this).parents('.productCard').addClass('morph');
      $('body').addClass('noScroll');
    })
    $('.closePreview').click(function(){
      $(this).parents('.productCard').removeClass('morph');
      $('body').removeClass('noScroll');
    })
    $('.movControl').click(function(){
      let imgActiv = $(this).parents('.preview').find('.imgs img.activ');
      if ($(this).hasClass('left')) {
        imgActiv.index() == 0 ? $('.imgs img').last().addClass('activ') : $('.imgs img.activ').prev().addClass('activ');
      } else {
        imgActiv.index() == ($('.imgs img').length - 1) ? $('.imgs img').first().addClass('activ') : $('.imgs img.activ').next().addClass('activ');
      }
      imgActiv.removeClass('activ');
    })
  })