const productsUrl = "scripts/data.json";

async function fetchData(url) {
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error.message);
  }
}
document.addEventListener('DOMContentLoaded', async() => {
  const dataProducts = await fetchData(productsUrl);

  const productsElements = document.querySelector('.products-cards');

  // добавление продуктов на странице
  dataProducts.forEach(element => {
  productsElements.insertAdjacentHTML('beforeend', addProductCard(element));
  });
  // блок на странице для корзины
  const basketProducts = document.querySelector('.basket-items');

  // ловим событие в блоке продуктов (для добавления в корзину)
  productsElements.addEventListener("click", (e) => {
    e.preventDefault();
    if (e.target.closest(".product-card")) {
      const item = e.target.closest(".product-card"); 
      dataProducts.forEach(element => {
        console.log(element.id);
        console.log(item.id);
        if (element.id === Number(item.id)) {
          basketProducts.insertAdjacentHTML('beforeend', addCard(element));
        } 
        });
    }
  });
  // удаление элемента
  basketProducts.addEventListener("click", (e) => {
    e.preventDefault();
    if (e.target.closest(".product-card-close")) {
      const item = e.target.closest(".product-card_cart");
      if (item) {
        item.remove();
      }
    }
  });

});


// добавление карты товара (на странице)
function addProductCard (element) {
  return `<div class="product-card" id="${element.id}">
  <a class="product-card__link" href="product.html">
    <img class="product-card__img" srcset="" src="${element.img}" alt="photo product">
    <div class="product-card__info">
      <h3 class="product-card__heading">${element.name}</h3>
      <p class="product-card__describtion">${element.desc}</p>
      <p class="product-card__price">${element.price}</p>
    </div>
  </a>
    <div class="product-card__add-basket">
      <a class="product-card__add-button" href="#"><i class="product-card__icon fa-solid fa-cart-plus fa-xl"></i></i>Add to cart</a>
    </div>
</div>
  `;
}
// добавление карты товара (для корзины)
function addCard(element) {
  return `
  <div class="product-card_cart">
          <a class="product-card__link product-card__link_cart" href="product.html">
            <img class="product-card__img product-card__img_cart" srcset="" src="${element.img}" alt="photo product">
            <div class="product-card__info">
              <h3 class="product-card__heading_cart">${element.name}</h3>
              <p class="product-card__properties">Price:<span class="product-card__price">${element.price}</span></p>
              <p class="product-card__properties">Color:<span>${element.color}</span></p>
              <p class="product-card__properties">Size:<span>${element.size}</span></p>
              <p class="product-card__properties">Quantity:<span>${element.quantity}</span></p>
            </div>
            <div class="product-card-close"><i class="product-cart__icon-close fa-solid fa-xmark fa-xl"></i></div>
          </a>
        </div>`;
}
