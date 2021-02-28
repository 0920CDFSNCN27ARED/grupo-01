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

const isTrue = (errorMsg) => {
    const isTrue = (value) => {
        if (value) return true;
        return false;
    };
    const validationArray = [isTrue, null, errorMsg];
    return validationArray;
};
const isStrongPass = [
    validator.isStrongPassword,
    { minLength: 8 },
    "La contraseña no es lo suficientemente segura. Debe contener al menos 8 caracteres, entre ellos mayusculas, minusculas y numeros.",
];

const isValidFormat = [
    function isFormat(inputValue) {
        const separatedString = inputValue.split(".");
        if (inputValue === "" || inputValue === separatedString[0])
            return false;
        switch (separatedString[1].toLowerCase()) {
            case "png":
            case "jpg":
            case "jpeg":
            case "gif":
                return true;

            default:
                return false;
        }
    },
    null,
    "El formato del archivo debe ser 'png','jpg','jpeg' o 'gif' ",
];

const onlyNumbers = [
    validator.isNumeric,
    null,
    "El campo debe estar compuesto solo por numeros",
];

const emailValidation = [
    validator.isEmail,
    [null],
    "Debes ingresar un Email valido",
];
///////////////////////

/////////  FUNCTIONS
function validateMultipleFields(fields) {
    let totalErrors = [];
    fields.forEach((field) => {
        const inputId = field[0];
        const validations = field[1];

        let foundErrors = false;
        let input = document.getElementById(inputId);
        switch (input.type) {
            case "checkbox":
                inputValue = input.checked;
                break;
            default:
                inputValue = input.value;
        }
        for (const validation of validations) {
            let validationFunction = validation[0];
            let errorMsg = validation[validation.length - 1];
            let options = validation.length > 2 ? validation[1] : null;

            if (!validationFunction(inputValue, options)) {
                const error = {
                    input,
                    errorMsg,
                };
                totalErrors.push(error);
                foundErrors = true;
                console.log(inputValue);
            }
        }
        if (!foundErrors) {
            input.classList.remove("is-not-valid");
            input.classList.add("is-valid");
            return;
        }

        input.classList.remove("is-valid");
        input.classList.add("is-not-valid");
    });

    return totalErrors;
}

// function clearValidations() {
//     const inputs = form.getElementsByTagName("input")
//     for (const field of inputs) {
//         field.classList.remove("is-valid", "is-not-valid");
//     }
// }
