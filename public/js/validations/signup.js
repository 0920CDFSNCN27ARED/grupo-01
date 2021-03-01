const form = document.querySelector("form");

form.addEventListener("submit", (event) => {
    const totalErrors = validateMultipleFields([
        ["firstName", [isLength(2), noNumberValidation]],
        ["lastName", [isLength(2), noNumberValidation]],
        ["dni", [isLength(7, 8)], onlyNumbers],
        ["email", [emailValidation]],
        ["password", [isLength(8)]],
        ["avatar", [isValidFormat]],
        ["terms", [isTrue("Debes aceptar los terminos y condiciones")]],
    ]);

    if (totalErrors.length > 0) event.preventDefault();
});

let eventType;
// switch (input.type) {
//     case file:
//     case checkbox:
//         eventType = "click";
//         break;
//     default:
//         eventType = "keyup";
//         break;
// }
