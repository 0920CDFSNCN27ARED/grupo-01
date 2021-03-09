window.onload = () => {
    const inputName = document.getElementById("productName");
    inputName.addEventListener("keyup", () => {
        document.getElementById("title").innerHTML = inputName.value;
    });
    const inputImage = document.getElementById("productPicture");
    inputImage.addEventListener("mouseout", () => {
        document.getElementById("image").src = "images/" + inputImage;
    });
    const inputPrice = document.getElementById("productPrice");
    inputPrice.addEventListener("keyup", () => {
        document.getElementById("price").innerHTML = "$" + inputPrice.value;
    });
};
