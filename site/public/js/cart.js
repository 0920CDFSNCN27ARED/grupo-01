const productCards = document.getElementsByClassName("product-card");
const totalPrice = document.getElementById("total-price");
console.log(totalPrice);

Array.from(productCards).forEach((productCard) => {
    const quantity = productCard.querySelector("#quantity");
    const partialPrice = productCard.querySelector("#partial-price");
    const unityPrice = partialPrice.innerText.split("$")[1];

    quantity.addEventListener("change", (event) => {
        partialPrice.innerText = `$${event.target.value * unityPrice}`;
        totalPrice.innerText = `$${
            Number(totalPrice.innerText.split("$")[1]) + Number(unityPrice)
        }`;
    });
});
