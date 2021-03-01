const form = document.querySelector("form");

const yearSelect = document.getElementById("productYear");
const actualYear = new Date().getFullYear();

function getYears(minYear) {
    for (let i = actualYear; i >= minYear; i--) {
        const option = document.createElement("option");
        option.innerText = i;
        yearSelect.appendChild(option);
    }
}

getYears(1850);

form.addEventListener("submit", (event) => {
    event.preventDefault()
    const totalErrors = validateMultipleFields([
        ["productName", [isLength(5)]],
        ["productDescription", [isLength(20)]],
        ["productGrape", [isLength(2)]],
        ["productYear", [isTrue("Debes seleccionar un año")]],
        ["productTemperature", [intValidation(-50, 40)]],
        ["productAged", [intValidation(0, 400)]],
        ["productPicture", [isValidFormat]],
        ["productPrice", [intValidation(1)]],
        ["productStock", [intValidation(0)]],
        ["productDiscount", [intValidation(0,100)]],
    ]);

    if (totalErrors.length > 0) event.preventDefault();
});
