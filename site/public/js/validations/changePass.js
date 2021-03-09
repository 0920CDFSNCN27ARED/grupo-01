const submitButton = document.querySelector(".button[type=submit]");
const showChangeMenu = document.getElementById("change-pass-btn");
const changePassMenu = document.getElementById("action-screen");

const form = document.getElementById("change-pass-form");
const inputs = document.querySelectorAll("input");

const actualPassInput = document.getElementById("actualPassword");

const newPassword = document.getElementById("newPassword");
const confirmNewPassword = document.getElementById("confirmNewPassword");

showChangeMenu.addEventListener("click", () => {
    changePassMenu.classList.toggle("hide");
});

for (const input of inputs) {
    input.addEventListener("keyup", (event) => {
        let allInputsFilled = [];
        for (const input of inputs) {
            if (input.value.trim() === "") {
                allInputsFilled.push(false);
            }
        }
        if (allInputsFilled.length > 0) {
            submitButton.disabled = true;
            return;
        }
        submitButton.disabled = false;
    });
}

form.addEventListener("submit", (event) => {
    errors = [];
    clearErrors();
    validateMultipleFields(
        [
            ["newPassword", [isLength(8)]],
            ["confirmNewPassword", [passMatches]],
        ],
        validateInput
    );

    if (checkErrors()) {
        event.preventDefault();
    }
});

////
