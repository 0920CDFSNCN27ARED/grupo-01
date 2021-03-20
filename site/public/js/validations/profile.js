const form = document.getElementById("change-pass-form");
const submitButton = document.querySelector(".button[type=submit]");
const showChangeMenu = document.getElementById("change-pass-btn");
const changePassMenu = document.getElementById("pass-screen");
const inputs = document.querySelectorAll("input");

const allActions = document.getElementsByClassName("action");

const actualPassInput = document.getElementById("actualPassword");

const newPassword = document.getElementById("newPassword");
const confirmNewPassword = document.getElementById("confirmNewPassword");

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
const editBtns = document.getElementsByClassName("edit-btn");
const deleteBtn = document.getElementsByClassName("delete-btn");
const undoDeleteBtn = document.getElementsByClassName(`undo-delete`);
const resetBtn = document.getElementById("reset-btn");

//////// Add new address
const newAddress = document.getElementById("new-address");
const fieldsetTemplate = document.getElementById("fieldset");
newAddress.addEventListener("click", () => {
    const newAddress = fieldsetTemplate.cloneNode(true);
    fieldsetTemplate.classList.remove("hide");
    console.log(newAddress);
});

////// Edit an address
for (let i = 0; i < editBtns.length; i++) {
    const contentDiv = document.getElementById(`fieldset-content-${i}`);
    const fieldset = document.getElementById(`fieldset-${i}`);
    const inputs = fieldset.querySelectorAll("input");
    editBtns[i].addEventListener("click", (event) => {
        for (const input of inputs) {
            if (contentDiv.classList.contains("hide")) return;
            if (input.disabled === true) {
                input.disabled = false;
            } else {
                input.disabled = true;
            }
        }
    });

    ///// Delete one address
    deleteBtn[i].addEventListener("click", () => {
        const isDeleted = document.getElementById(`isDeleted-${i}`);
        const deletedMsg = document.getElementById(`deleted-msg-${i}`);
        contentDiv.classList.add("hide");
        deletedMsg.classList.remove("hide");
        isDeleted.checked = true;

        //////Undo delete from one address
        undoDeleteBtn[i].addEventListener("click", (event) => {
            contentDiv.classList.remove("hide");
            deletedMsg.classList.add("hide");
            isDeleted.checked = false;
        });
    });
}
const contentDivs = document.querySelectorAll("[id|=fieldset-content]");

////// Reset all values
resetBtn.addEventListener("click", () => {
    for (const contentDiv of contentDivs) {
        const deletedMsg = contentDiv.querySelector("[id*=deleted-msg]"); //Tira null a menos que haga document.queryselector
        console.log(deletedMsg);
        const isDeleted = contentDiv.querySelector("[id*=isDeleted]");
        undoDelete(contentDiv, deletedMsg, isDeleted);
    }
});

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
