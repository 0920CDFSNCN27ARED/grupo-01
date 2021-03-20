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

        const productElement = `<article class="display-flex-column article align-center product-card ">
        <div class="display-flex"></div>
        <fieldset>

            
        </fieldset>
        <div class="display-flex space-between align-end width-90">
            <div class="hide prod-id">${prod.id}</div>
            <img
                class="wine-logo"
                src=${product.data.image}
                alt="wineProduct"
            />
            <p class="width-100 font-size-075 align-center product-name">${product.data.productName}</p>
            
            <div id="price-section" class="display-flex justify-end">
            <p class="unity-price" >Precio x/u:$${product.data.price}</p>    
            <input
                
                    class="quantity-box"
                    type="number"
                    placeholder=${prod.quantity}
                    min="1"
                    id="quantity"
                    value=${prod.quantity}
                />
                <p id="partial-price" class="self-end bold partial-price">$</p>
            </div>
        </div>

        <div id="product-options" class="display-flex">
            <ul class="display-flex article-options justify-evenly">
                <div class="display-flex width-50">
                    <li>
                         <button
                     type="button"
                    class="delete-btn no-border back-white">
                 <i
                class="fas fa-trash-alt delete-icon"></i>
                    </button>
                    </li>
                    <li>
                        <button id="save" class="article-options" type="button">
                            <i class="fas fa-archive"></i>
                        </button>
                    </li>

                    <li>
                        <button
                            id="favourites"
                            class="article-options"
                            type="button"
                        >
                            <i class="far fa-heart"></i>
                        </button>
                    </li>
                    <li>
                        <button id="recipies" class="article-options" type="button">
                            <i class="fas fa-utensils"></i>
                        </button>
                    </li>
                </div>

                <div id="option-display" class="margin-r-1">
                    <li id="more-opt-align">
                        <button
                            class="article-options width-10 background-color-main"
                            type="button"
                        >
                            <i class="fas fa-ellipsis-v gray"></i>
                        </button>

                        <select size="2" name="more-options" id="more-options">
                            <option value="buy-now">Comprar ahora</option>
                            <option value="same-seller">Ver vendedor</option>
                        </select>
                    </li>
                </div>
            </ul>
        </div>
    </article>
    `;

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
