const form = document.getElementById("cart-form");
function getIdFromUrl() {
    const splitUrl = window.location.href.split("/");
    const id = splitUrl[splitUrl.length - 1];
    return id;
}
const id = getIdFromUrl();
form.addEventListener("submit", (event) => {
 
    const quantity = Number(document.getElementById("quantity").value);

    const localStorageKey = "cart";
    const localStorageValue = localStorage.getItem(localStorageKey);
    const cart = localStorageValue ? JSON.parse(localStorageValue) : [];

    const prod = cart.find((prod) => {
        return prod.id == id;
    });

    if (prod) {
        prod.quantity += quantity;
    } else {
        cart.push({
            id: id,
            quantity: quantity === 0 ? 1 : quantity,
        });
    }
    localStorage.setItem(localStorageKey, JSON.stringify(cart));
});
