const totalPrice = document.getElementById("total-price");
const prodsSection = document.getElementById("products-section");
const cart = JSON.parse(localStorage.getItem("cart"));
const article = document.querySelector(".product-card");

/////First element in cart
const quantityBox = article.querySelector(".quantity-box");
const partialPrice = article.querySelector(".partial-price");
console.log(article)
const prodName = article.querySelector(".product-name");
console.log(prodName)
console.log(cart[0].name)
quantityBox.value = cart[0].quantity;
partialPrice.innerText = cart[0].price;

prodName.innerText = cart[0].name;

/////// Other elements in cart
for (let i = 1; i < cart.length; i++) {
    const newArticle = article.cloneNode(true);
    const quantityBox = newArticle.querySelector(".quantity-box");
    const partialPrice = newArticle.querySelector(".partial-price");
    const prodName = newArticle.querySelector(".product-name");
    quantityBox.value = cart[i].quantity;
    partialPrice.innerText = cart[i].price;
    prodsSection.appendChild(newArticle);
    prodName.innerText = cart[i].name;
}



/////////
const productCards = document.getElementsByClassName("product-card");

Array.from(productCards).forEach((productCard) => {
    const quantity = productCard.querySelector(".quantity-box");
    const partialPrice = productCard.querySelector(".partial-price");
    const unityPrice = partialPrice.innerText.split("$")[1];

    partialPrice.innerText = `$${quantity.value * unityPrice}`;
    totalPrice.innerText = `$${
        Number(totalPrice.innerText.split("$")[1]) + Number(unityPrice)
    }`;

    quantity.addEventListener("change", (event) => {
        partialPrice.innerText = `$${event.target.value * unityPrice}`;
        totalPrice.innerText = `$${
            Number(totalPrice.innerText.split("$")[1]) + Number(unityPrice)
        }`;
    });
});
