const form = document.querySelector("form");
const price = document.getElementById("price").innerText;

const splitUrl = window.location.href.split("/");
const id = splitUrl[splitUrl.length - 1];

form.addEventListener("submit", (event) => {
    const quantity = Number(document.getElementById("quantity").value);

    const jsonProds = localStorage.getItem("cart");
    const cartProds = JSON.parse(jsonProds);

    // Create a new cart
    if (!cartProds) {
        localStorage.setItem(
            "cart",
            JSON.stringify(newProd(id, price, quantity, "true"))
        );
        return;
    }

    //// Cart already exists
    const matchIndex = cartProds.findIndex((product) => {
        return product.id === id;
    });
    // Editing existing product
    if (matchIndex !== -1) {
        cartProds[matchIndex].quantity += quantity === 0 ? 1 : quantity;
        localStorage.setItem("cart", JSON.stringify(cartProds));
        return;
    }

    // Adding new product
    cartProds.push(newProd(id, price, quantity));
    localStorage.setItem("cart", JSON.stringify(cartProds));
});

function newProd(id, price, quantity, isFirstProd) {
    const product = {
        id: id,
        price: price,
        quantity: quantity === 0 ? 1 : quantity,
    };

    if (isFirstProd) return [product];
    return product;
}
