const form = document.getElementById("newProd-form");
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

const validationStructure = [
    ["productName", [isLength(5)]],
    ["productPicture", [isValidFormat]],
    ["productPrice", [intValidation(1)]],
    ["productDescription", [isLength(20)]],
    ["productGrape", [isLength(2)]],
    ["productYear", [isTrue("Debes seleccionar un año")]],
    ["productTemperature", [intValidation(-49, 41)]],
    ["productAged", [intValidation(1, 401)]],
    ["productStock", [intValidation(1)]],
    ["productDiscount", [lessThan(100)]],
];

form.addEventListener("submit", (event) => {

    clearValidateAndCheck(event);
});

validateAllIndividually(validationStructure);

