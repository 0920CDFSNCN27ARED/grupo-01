const form = document.querySelector("form");

// VALIDATION VARS
const noNumberValidation = [
    validator.isAlpha,
    ["en-US"],
    "El campo debe estar compuesto unicamente por letras, no numeros",
];

const isLength = (minNmbr, maxNmbr) => {
    let options;
    let errorMsg;
    let validationArray;

    if (minNmbr && maxNmbr) {
        options = { min: minNmbr, max: maxNmbr };
        errorMsg = `El campo debe tener minimo ${options.min} caracter/es y maximo ${options.max} `;
    } else if (minNmbr) {
        options = { min: minNmbr };
        errorMsg = `El campo debe tener minimo ${options.min} caracter/es `;
    } else if (maxNmbr) {
        options = { min: minNmbr };
        errorMsg = `El campo debe tener maximo ${options.max} caracter/es`;
    }
    validationArray = [validator.isLength, options, errorMsg];
    return validationArray;
};
const termsAccepted = [
    validator.equals,
    "true",
    "Debes aceptar los terminos y condiciones",
];

///////////////////////

form.addEventListener("submit", (event) => {
    event.preventDefault();
    validateMultipleFields([
        ["firstName", [isLength(2), noNumberValidation]],
        ["lastName", [isLength(2), noNumberValidation]],
        ["dni", [isLength(7, 8)]],
        ["email", [[validator.isEmail,[null],"Debes ingresar un Email valido"]]],
        ["password", [isLength(8)]],
        // ["avatar", [isLength(2), noNumberValidation]],
        ["terms", [termsAccepted]],
    ]);
});

/////////  FUNCTIONS

function validateMultipleFields(fieldsValidation) {
    fieldsValidation.forEach((fieldValidation) => {
        const inputId = fieldValidation[0];
        const validations = fieldValidation[1];

        let errors = [];
        let input = document.getElementById(inputId);
        switch (input.type) {
            case "checkbox":
                inputValue = input.checked.toString();
                break;
            default:
                inputValue = input.value;
        }
        for (const validation of validations) {
            let validationFunction = validation[0];
            let errorMsg = validation[validation.length - 1];
            let options = validation.length > 2 ? validation[1] : null;

            if (!validationFunction(inputValue, options)) {
                errors.push(errorMsg);
                input.classList.remove("is-valid");
                input.classList.add("is-not-valid");
                console.log(errors);
            }
        }
        if (errors.length === 0) {
            input.classList.remove("is-not-valid");
            input.classList.add("is-valid");
        }
        // input.classList.add("is-not-valid");
    });
}

// Email: ser valido, no repetirse con otros mails
// password: al menos 8 caracteres, opc(mayus, nros, etc)
// imagen: archivo valido(jpg, jpeg, png, gif)
