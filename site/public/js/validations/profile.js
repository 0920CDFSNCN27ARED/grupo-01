const submitButton = document.querySelector(".button[type=submit]");
const showChangeMenu = document.getElementById("change-pass-btn");
const changePassMenu = document.getElementById("pass-screen");
const form = document.getElementById("change-pass-form");
const inputs = document.querySelectorAll("input");

const allActions = document.getElementsByClassName("action");

const myAddresses = document.getElementById("address-btn");
const addressScreen = document.getElementById("address-screen");

const actualPassInput = document.getElementById("actualPassword");

const newPassword = document.getElementById("newPassword");
const confirmNewPassword = document.getElementById("confirmNewPassword");

//////CHANGE PASSWORD
showChangeMenu.addEventListener("click", () => {
    for (const actionScreen of allActions) {
        if (!actionScreen.classList.contains("hide")) {
            actionScreen.classList.add("hide");
        }
    }
    changePassMenu.classList.remove("hide");
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
            ["confirmNewPassword", [passMatches(newPassword)]],
        ],
        validateInput
    );
    if (checkErrors()) {
        event.preventDefault();
    }
});

////////////////////////////
////Addreses
myAddresses.addEventListener("click", () => {
    for (const actionScreen of allActions) {
         if (!actionScreen.classList.contains("hide")) {
             actionScreen.classList.add("hide");
         }
    }
    addressScreen.classList.remove("hide");
});
