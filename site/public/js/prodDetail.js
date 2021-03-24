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

