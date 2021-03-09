const form = document.querySelector("form");
let errors;
// const validations = {
//     firstName: ["firstName", [isLength(2), noNumberValidation]],
//     lastName: ["lastName", [isLength(2), noNumberValidation]],
//     dni: ["dni", isLength(2),[ noNumberValidation]],
//     email: ["email", [emailValidation]],
//     password: ["password", [isLength(8)]],
//     avatar: ["avatar",[isValidFormat]],
//     terms: ["terms",[isTrue("Debes aceptar los terminos y condiciones")]],
// };

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
