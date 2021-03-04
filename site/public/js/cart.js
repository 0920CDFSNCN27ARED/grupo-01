
const article = document.getElementsByTagName("article")


const quantity = document.getElementById("quantity");
const productPrice = document.getElementById("");
const partialPrice = document.getElementById("partial-price");

const unityPrice = partialPrice.innerText.split("$")[1];

quantity.addEventListener("change", (event) => {
    partialPrice.innerText = `$${event.target.value * unityPrice}`;
});
