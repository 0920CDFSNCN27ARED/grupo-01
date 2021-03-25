const localStorageKey = "cart";
const localStorageValue = localStorage.getItem(localStorageKey);
const cart = localStorageValue ? JSON.parse(localStorageValue) : [];

function getCartProduct(cart, id) {
    const prod = cart.find((prod) => {
        return prod.id == id;
    });
    return prod;
}
function updateProdQuantity(prod, quantity) {
    prod.quantity = Number(quantity);
}
function getIdFromUrl() {
    const splitUrl = window.location.href.split("/");
    const id = splitUrl[splitUrl.length - 1];
    return id;
}
function splitPrice(price) {
    return price.innerText.split("$")[1];
}