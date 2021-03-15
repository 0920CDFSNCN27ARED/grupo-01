const localStorageKey = "cart";
const localStorageValue = localStorage.getItem(localStorageKey);
const cart = localStorageValue ? JSON.parse(localStorageValue) : [];

const totalPrice = document.getElementById("total-price");
const prodsSection = document.getElementById("products-section");
const article = document.querySelector(".product-card");
const emptyCartMsg = document.getElementById("empty-cart-msg");
const completeCartSection = document.getElementById("complete-cart");

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
            <img
                class="wine-logo"
                src=${product.image}
                alt="wineProduct"
            />
            <p class="width-100 font-size-075 align-center product-name">${
                product.productName
            }</p>
            
            <div id="price-section" class="display-flex justify-end">
            <p>Precio x/u:$${product.price}</p>    
            <input
                
                    class="quantity-box"
                    type="number"
                    placeholder=${prod.quantity}
                    min="1"
                    id="quantity"
                />
                <p id="partial-price" class="self-end bold partial-price">$${
                    product.price * prod.quantity
                }</p>
            </div>
        </div>

        <div id="product-options" class="display-flex">
            <ul class="display-flex article-options justify-evenly">
                <div class="display-flex width-50">
                    <li>
                        <button id="erase" class="article-options" type="button">
                            <i class="fas fa-trash-alt"></i>
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
        return product.price * prod.quantity;
    }
    const promises = [];
    for (const prod of cart) {
        promises.push(renderProduct(prod, prodsSection));
    }

    Promise.all(promises).then((prices) => {
        const totalPriceValue = prices.reduce((acc, price) => {
            return acc + price;
        }, 0);
        totalPrice.innerText = "$" + totalPriceValue;
    });
}

const buy = document.getElementById("buy-form");
buy.addEventListener("submit", async (event) => {
    event.preventDefault();
    try {
        const response = await fetch("/api/orders/checkout", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body:  JSON.stringify(cart),
        });
        const init_url = await response.json();
        console.log(init_url);
    } catch (err) {
        console.log(err);
    }
});

///////// Quantities updates

const productArticles = document.getElementsByClassName("product-card");

for (const article of productArticles) {
    console.log(article);
    const quantity = article.querySelector(".quantity-box");
    console.log(quantity);
    const partialPrice = article.querySelector(".partial-price");
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
}

//////////////
