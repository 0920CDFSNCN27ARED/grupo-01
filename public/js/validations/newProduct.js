const form = document.querySelector("form");

form.addEventListener("submit", (event) => {
    const totalErrors = validateMultipleFields([
        ["productName", [emailValidation]],
        ["productDescription", [isLength(2)]],
        ["productGrape", [isLength(2)]],
        ["productYear", [isLength(2)]],
        ["productTemperature", [isLength(2)]],
        ["productAged", [isLength(2)]],
        ["productPicture", [isLength(2)]],
        ["productPrice", [isLength(2)]],
        ["productStock", [isLength(2)]],
        ["productDiscount", [isLength(2)]],
    ]);

    if (totalErrors.length > 0) event.preventDefault();
});
