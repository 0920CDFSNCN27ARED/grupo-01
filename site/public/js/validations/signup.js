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

form.addEventListener("submit", (event) => {
    errors = [];
    event.preventDefault();
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

const inputs = document.querySelectorAll("input");
let eventType = "keyup";
for (const input of inputs) {
    switch (input.type) {
        case "checkbox":
        case "select":
        case "file":
            eventType = "change";
            break;
        default:
            eventType = "keyup";
    }
    input.addEventListener(eventType, (event) => {
        errors = [];

        clearErrors(input.id);
        validateInput(input.id, [isLength(2), noNumberValidation]);

        checkErrors();
    });
}
