const form = document.querySelector("form");
let errors;
form.addEventListener("submit", (event) => {
    errors = [];

    clearErrors();
    validateMultipleFields(
        [
            ["firstName", [isLength(2), noNumberValidation]],
            ["lastName", [isLength(2), noNumberValidation]],
            ["dni", [isLength(7, 8)], onlyNumbers],
            ["email", [emailValidation]],
            ["password", [isLength(8)]],
            ["avatar", [isValidFormat]],
            ["terms", [isTrue("Debes aceptar los terminos y condiciones")]],
        ],
        validateInput
    );

    if (checkErrors()) {
        event.preventDefault();
    }
});
