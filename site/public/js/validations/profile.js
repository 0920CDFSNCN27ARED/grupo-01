const form = document.getElementById("change-pass-form");
const submitButton = document.querySelector(".button[type=submit]");
const showChangeMenu = document.getElementById("change-pass-btn");
const changePassMenu = document.getElementById("pass-screen");
const inputs = document.querySelectorAll("input");

const allActions = document.getElementsByClassName("action");

const actualPassInput = document.getElementById("actualPassword");

const newPassword = document.getElementById("newPassword");
const confirmNewPassword = document.getElementById("confirmNewPassword");
const passModal = document.getElementById("pass-screen");

///////
const passMatches = [
    function passwordMatch(confirmNewPassword) {
        if (confirmNewPassword !== newPassword.value) {
            return false;
        }
        return true;
    },
    newPassword,
    "Las contraseñas no coinciden",
];

//////CHANGE PASSWORD
showChangeMenu.addEventListener("click", () => {

    passModal.classList.add("show-modal");
      closeModal(passModal, close);
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

    if (checkErrors(errors)) {
        event.preventDefault();
    }
});

////////////////////////////

/////// Profile
showOneSection("profile-btn", "personal-data", allActions);
/////// My items
////// Favourites

////Addreses
showOneSection("address-btn", "address-screen", allActions);
let editBtns = document.getElementsByClassName("edit-btn");



////// Functions
function undoDelete(contentDiv, deletedMsg, isDeleted) {
    contentDiv.classList.remove("hide");
    deletedMsg.classList.add("hide");
    isDeleted.checked = false;
}
function hideAllActions(allActions) {
    for (const action of allActions) {
        if (!action.classList.contains("hide")) {
            action.classList.add("hide");
        }
    }
}
function showAction(action) {
    action.classList.remove("hide");
}

function showOneSection(btnId, sectionId, allActions) {
    const button = document.getElementById(btnId);
    const section = document.getElementById(sectionId);

    button.addEventListener("click", () => {
        hideAllActions(allActions);
        showAction(section);
    });
}