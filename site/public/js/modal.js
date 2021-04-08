const open = document.getElementById("new-address");
const close = document.getElementById("close");

const deleteModal = document.getElementById("delete-modal");
const deleteBtns = document.getElementsByClassName("delete-btn");

const headerNew = document.querySelector(".new-hder");
const headerEdit = document.querySelector(".edit-hder");

const passModal = document.getElementById("pass-screen");

const modalForm = document.querySelector(".modal-form");

let articles = document.querySelectorAll("article");
articles = Array.from(articles);

let modalNewAddress = document.querySelectorAll("[id*=newAddress-modal]");


modalNewAddress = Array.from(modalNewAddress);
let modalDeleteAddress = document.querySelectorAll("[id*=delete-modal]");
modalDeleteAddress = Array.from(modalDeleteAddress);

let errors;
let validationStructure;

// new
open.addEventListener("click", () => {
    modalForm.action = "/usuarios/crearDireccion";
    showOneHeader(headerNew);
    const inputs = modalNewAddress[0].querySelectorAll("input");

    for (const input of inputs) {
        input.placeholder = "";
        input.value = "";
        validationStructure = [
            [`streetName-0`, [isLength(3)]],
            [`streetNumber-0`, [isLength(2), onlyNumbers]],
            // [`city-0`, [isLength(3), noNumberValidation]],
            [`zipCode-0`, [isLength(2, 8), onlyNumbers]],
        ];
    }
    modalNewAddress[0].classList.add("show-modal");
    modalForm.addEventListener("submit", (event) => {
        clearValidateAndCheck(event);
    });

    validateAllIndividually(validationStructure); // On keyup, change, etc...
    closeModal(modalNewAddress[0], close);
});
//edit
for (const btn of editBtns) {
    btn.addEventListener("click", () => {
        const index = getIdIndex(btn);
        validationStructure = [
            [`streetName-${index}`, [isLength(3)]],
            [`streetNumber-${index}`, [isLength(2), onlyNumbers]],
            [`zipCode-${index}`, [isLength(2, 8), onlyNumbers]],
        ];

        const selectedModal = modalNewAddress.find((modal) => {
            return modal.id.includes(index);
        });
        console.log(modalForm)
        modalForm.action = `/usuarios/editarDireccion/${selectedModal.dataset.id}?_method=PUT`;
        showOneHeader(headerEdit);
        selectedModal.classList.add("show-modal");
        modalForm.addEventListener("submit", (event) => {
            clearValidateAndCheck(event);
        });
        validateAllIndividually(validationStructure); // On keyup, change, etc...
        closeModal(selectedModal, close);
    });
}

//delete
for (const btn of deleteBtns) {
    btn.addEventListener("click", () => {
        const index = getIdIndex(btn);
        const deletedAddress = modalDeleteAddress.find((modal) => {
            return modal.id.includes(index);
        });
        const form = deletedAddress.querySelector("form");
        form.action = `/usuarios/eliminarDireccion/${deletedAddress.dataset.id}?_method=DELETE`;
        deletedAddress.classList.add("show-modal");
        closeModal(deletedAddress);
    });
}

//////CHANGE PASSWORD
const inputs = document.querySelectorAll("[id*=Password]");
const submitButton = document.querySelector(".button[type=submit]");
const changePassForm = document.getElementById("change-pass-form");
const changePassBtn = document.getElementById("change-pass-btn");

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

changePassBtn.addEventListener("click", () => {
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

changePassForm.addEventListener("submit", (event) => {
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

///////
function closeModal(modal) {
    const close = modal.querySelector(".close-btn");
    close.addEventListener("click", () => modal.classList.remove("show-modal"));
    window.addEventListener("click", (e) =>
        e.target == modal ? modal.classList.remove("show-modal") : false
    );
}

///////
function getIdIndex(btn) {
    const idSplitted = btn.id.split("-");
    return idSplitted[idSplitted.length - 1];
}
function showOneHeader(headerToShow) {
    const allHeaders = document.querySelectorAll("[class*=hder]");
    const allHeaderArray = Array.from(allHeaders);

    const indexToRemove = allHeaderArray.findIndex((header) => {
        return headerToShow.classList.contains(
            header.classList[header.classList.length - 1]
        );
    });

    if (indexToRemove) {
        allHeaderArray.pop(indexToRemove);
    }
    for (const header of allHeaderArray) {
        header.classList.add("hide");
    }
    headerToShow.classList.remove("hide");
}
