const form = document.querySelector("form");
const firstName = document.getElementById("firstName");
const lastName = document.getElementById("lastName");
const dni = document.getElementById("dni");
const email = document.getElementById("email");
const password = document.getElementById("password");
const avatar = document.getElementById("avatar");

form.addEventListener("submit", (event) => {
    event.preventDefault();
    validateField("firstName", [
        [
            validator.isLength,
            { min: 3 },
            "El campo debe tener al menos dos caracteres",
        ],
        [
            validator.isAlpha,
            ["en-US"],
            "El campo debe contener solo letras y no numeros",
        ],
    ]);
});

function validateField(inputId, validations) {
    let errors = [];
    const input = document.getElementById(inputId);

    for (const validation of validations) {
        let validationFunction = validation[0];
        let errorMsg = validation[validation.length - 1];
        let options = validation.length > 2 ? validation[1] : null;

        if (!validationFunction(input.value, options)) {
            errors.push(errorMsg);
            input.classList.remove("is-valid");
            input.classList.add("is-not-valid");
            console.log(errors);
        }
    }
    if (errors.length === 0) {
        input.classList.remove("is-not-valid");
        return input.classList.add("is-valid");
    }
    return input.classList.add("is-not-valid");
}

// Nombre: min de 2 caracteres, no contener nros
// Apellido: min de 2 car, no contener nros
//DNI: solo contener nros, min 7, max 8
// Email: ser valido, no repetirse con otros mails
// password: al menos 8 caracteres, opc(mayus, nros, etc)
// imagen: archivo valido(jpg, jpeg, png, gif)
