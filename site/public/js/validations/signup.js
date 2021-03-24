const form = document.getElementById("signup-form");

let errors;

const validationStructure = [
    ["firstName", [isLength(2), noNumberValidation]],
    ["lastName", [isLength(2), noNumberValidation]],
    ["dni", [isLength(7, 8)], onlyNumbers],
    ["email", [emailValidation]],
    ["password", [isLength(8)]],
    ["avatar", [isValidFormat]],
    ["terms", [isTrue("Debes aceptar los terminos y condiciones")]],
];

form.addEventListener("submit", (event) => {
    clearValidateAndCheck(event);
});

validateAllIndividually(validationStructure);// On keyup, change, etc...
