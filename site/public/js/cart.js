const totalPrice = document.getElementById("total-price");
const prodsSection = document.getElementById("products-section");
const emptyCartMsg = document.getElementById("empty-cart-msg");
const completeCartSection = document.getElementById("complete-cart");
let lastPromise;
////// Render products in cart
if (cart.length == 0) {
    completeCartSection.classList.add("hide");
} else {
    emptyCartMsg.classList.add("hide");
    async function renderProduct(prod, prodsSection) {
        const response = await fetch(`/api/products/${prod.id}`);
        const product = await response.json();

        const productElement = `
        <article class="article">
        <div id="hide" class="prod-id">${prod.id}</div>
        <div id="trash-box">
            <button class="delete delete-btn">
                <i class="far fa-trash-alt"></i>
            </button>
        </div>
        <div id="wine-logo-box">
            <img
                class="wine-logo"
                src=${product.data.image}
                alt="wineProduct"
            />
        </div>
        <div>    
            <p class="product-name">${product.data.productName}</p>
        </div>    
        <div id="price-section" class="">
            <p class="unity-price" >$${product.data.price}</p>
        </div>
        <div class="quantity">
            <input type="button" value="-" class="minus">    
            <input class="quantity-box" type="number" placeholder=${prod.quantity} min="1" id="quantity" value=${prod.quantity}>
            <input type="button" value="+" class="plus">
        </div>
        <div>        
            <p id="partial-price" class="bold partial-price"></p>
        </div>
    
        
    </article>`;

        prodsSection.innerHTML += productElement;
        return product.data.price * prod.quantity;
    }
    const promises = [];
    for (const prod of cart) {
        promises.push(renderProduct(prod, prodsSection));
    }

    lastPromise = Promise.all(promises).then((prices) => {
        const totalPriceValue = prices.reduce((acc, price) => {
            return acc + price;
        }, 0);
        totalPrice.innerText = "$" + totalPriceValue;
    });
}
//Once all promises executed, launch quantity events
lastPromise.then((something) => {
    const productArticles = document.querySelectorAll(".article");
    const articles = Array.from(productArticles);

    articles.forEach((article, index) => {
        const quantity = article.querySelector(".quantity-box");
        const subtotal = article.querySelector(".partial-price");
        const unityPriceContainer = article.querySelector(".unity-price");
        const unityPrice = unityPriceContainer.innerText.split("$")[1];

        subtotal.innerText = `$${quantity.value * unityPrice}`;

        //Update quantity
        quantity.addEventListener("change", (event) => {
            const id = article.querySelector(".prod-id").innerText;
            const newQuantity = event.target.value;

            // Change quantity in cart
            const prod = getCartProduct(cart, id);
            updateProdQuantity(prod, newQuantity);
            localStorage.setItem(localStorageKey, JSON.stringify(cart));

            /////Change view quantity values
            const actualSubTotal = article
                .querySelector(".partial-price")
                .innerText.split("$")[1];
            subtotal.innerText = `$${newQuantity * unityPrice}`;
            totalPrice.innerText = `$${
                totalPrice.innerText.split("$")[1] -
                actualSubTotal +
                newQuantity * unityPrice
            }`;
        });
        ////Delete item from cart
        const deleteBtn = article.querySelector(".delete-btn");
        deleteBtn.addEventListener("click", () => {
            const productToRemoveId = article.querySelector(".prod-id")
                .innerText;
            const productIndexToRemove = cart.findIndex((element) => {
                return element.id == productToRemoveId;
            });
            article.remove();
            cart.splice(productIndexToRemove, 1);
            localStorage.setItem(localStorageKey, JSON.stringify(cart));
            if (cart.length == 0) {
                emptyCartMsg.classList.remove("hide");
            }
        });
    });
});

//// FETCH/CHECKOUT
const buy = document.getElementById("buy-form");
buy.addEventListener("submit", async (event) => {
    event.preventDefault();
    try {
        const response = await fetch("/api/orders/checkout", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(cart),
        });
        const init_url = await response.json();
    } catch (err) {
        console.log(err);
    }
});
////////////////
