const form = document.querySelector("form");

async function getCountries() {
    const countries = await fetch(
        "https://restcountries.eu/rest/v2/regionalbloc/usan"
    );
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



form.addEventListener("submit", (event) => {
    const totalErrors = validateMultipleFields([
        ["cellarName", [isLength(2)]],
        ["companyName", [isLength(3)]],
        ["cuit", [isLength(10, 11)], onlyNumbers],
        ["country", [isTrue("Debes seleccionar un pais")]],
        ["province", [isTrue("Debes seleccionar una provincia")]],
        ["email", [emailValidation]],
        ["password", [isLength(8)]],
        ["avatar", [isValidFormat]],
        ["terms", [isTrue("Debes aceptar los terminos y condiciones")]],
    ]);
    console.log(totalErrors);
    if (totalErrors.length > 0) event.preventDefault();
});