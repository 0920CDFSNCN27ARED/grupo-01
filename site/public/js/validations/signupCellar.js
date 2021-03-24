const form = document.getElementById("signupCellar-form");
////////////////////////

async function getCountries() {
    const countries = await fetch("https://restcountries.eu/rest/v2/all");
    const data = await countries.json();
    return data;
}

async function insertCountries() {
    const countrySelect = document.getElementById("country");
    const countries = await getCountries();
    countries.forEach((country) => {
        const option = document.createElement("option");
        option.innerText = country.name;
        countrySelect.appendChild(option);
    });
}
insertCountries();
//////////////////////

const validationStructure = [
    ["cellarName", [isLength(2)]],
    ["companyName", [isLength(3)]],
    ["cuit", [isLength(10, 11)], onlyNumbers],
    ["country", [isTrue("Debes seleccionar un pais")]],
    ["province", [isTrue("Debes seleccionar una provincia")]],
    ["email", [emailValidation]],
    ["password", [isLength(8)]],
    ["avatar", [isValidFormat]],
    ["terms", [isTrue("Debes aceptar los terminos y condiciones")]],
];
form.addEventListener("submit", (event) => {
    clearValidateAndCheck(event);
});

validateAllIndividually(validationStructure);// On keyup, change, etc...
