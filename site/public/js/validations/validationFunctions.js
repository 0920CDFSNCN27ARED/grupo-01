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

function intValidation(min, max) {
    let isInt;
    if (max) {
        isInt = [
            validator.isInt,
            { min: min, max: max },
            `El campo debe ser un numero mayor a ${min} y menor a ${max}`,
        ];
    } else {
        isInt = [
            validator.isInt,
            { min: min },
            `El campo debe ser un numero mayor a ${min}`,
        ];
    }

    return isInt;
}
///////////////////////

/////////  FUNCTIONS

function validateInput(inputId, validationFunctions) {
    const input = document.getElementById(inputId);
    let foundErrors;

    for (const validation of validationFunctions) {
        const validate = validation[0];
        const errMsg = validation[validation.length - 1];
        const options = validation.length > 2 ? validation[1] : null;
        switch (input.type) {
            case "checkbox":
                inputValue = input.checked;
                break;
            default:
                inputValue = input.value;
        }
        if (!validate(inputValue, options)) {
            const error = {
                input: input,
                errMsg: errMsg,
            };
            foundErrors = true;
            input.classList.remove("is-valid");
            input.classList.add("is-not-valid");
            errors.push(error);
        }
    }

    input.classList.remove("is-not-valid");
    input.classList.add("is-valid");
}

function validateMultipleFields(validations, validateInput) {
    for (const fieldValidation of validations) {
        const inputId = fieldValidation[0];
        const validationFunctions = fieldValidation[1];
        validateInput(inputId, validationFunctions);
    }
}

//////////////////////

function checkErrors() {
    if (errors.length > 0) {
        const inputs = document.getElementsByTagName("input");
        for (const input of inputs) {
            input.classList.remove("is-not-valid");
            input.classList.add("is-valid");
        }

        for (const error of errors) {
            const input = error.input;
            const errMsg = error.errMsg;

            input.classList.remove("is-valid");
            input.classList.add("is-not-valid");

            const errorCont = document.createElement("div");
            errorCont.innerText = errMsg;
            errorCont.classList.add("err-cont");
            input.insertAdjacentElement("afterend", errorCont);
        }
        return true;
    }
    return false;
}

//////////////////////
function clearErrors() {
    const err = document.querySelectorAll(".err-cont");
    console.log(err);
    if (err) {
        for (const errs of err) {
            errs.remove();
        }
    }
}
