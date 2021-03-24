const open = document.getElementById("new-address");
const close = document.getElementById("close");

const deleteModal = document.getElementById("delete-modal");
const deleteBtns = document.getElementsByClassName("delete-btn");

const headerNew = document.querySelector(".new-hder");
const headerEdit = document.querySelector(".edit-hder");

let articles = document.querySelectorAll("article");
articles = Array.from(articles);
const modalForm = document.querySelector(".modal-form");

let modaleNewAddress = document.querySelectorAll("[id*=newAddress-modal]");
modaleNewAddress = Array.from(modaleNewAddress);
let modalDeleteAddress = document.querySelectorAll("[id*=delete-modal]");
modalDeleteAddress = Array.from(modalDeleteAddress);

let errors;
let validationStructure;
// new
open.addEventListener("click", () => {
    modalForm.action = "/usuarios/crearDireccion";
    showOneHeader(headerNew);
    const inputs = modaleNewAddress[0].querySelectorAll("input");

    for (const input of inputs) {
        input.placeholder = "";
        input.value = "";
        validationStructure = [
            [`streetName-0`, [isLength(3), noNumberValidation]],
            [`streetNumber-0`, [isLength(2), onlyNumbers]],
            [`apartment-0`, [isLength(2), onlyNumbers]],
            [`city-0`, [isLength(3), noNumberValidation]],
            [`zipCode-0`, [isLength(2, 8), onlyNumbers]],
        ];
    }
    modaleNewAddress[0].classList.add("show-modal");
    modalForm.addEventListener("submit", (event) => {
        clearValidateAndCheck(event);
    });

    validateAllIndividually(validationStructure); // On keyup, change, etc...
    closeModal(modaleNewAddress[0], close);
});
//edit
for (const btn of editBtns) {
    btn.addEventListener("click", () => {
        const index = getIdIndex(btn);
        validationStructure = [
            [`streetName-${index}`, [isLength(3), noNumberValidation]],
            [`streetNumber-${index}`, [isLength(2), onlyNumbers]],
            [`apartment-${index}`, [isLength(2), onlyNumbers]],
            [`city-${index}`, [isLength(3), noNumberValidation]],
            [`zipCode-${index}`, [isLength(2, 8), onlyNumbers]],
        ];

        const selectedModal = modaleNewAddress.find((modal) => {
            return modal.id.includes(index);
        });
        modalForm.action = `/usuarios/editarDireccion/${selectedModal.dataset.id}?_method=PUT`;
        showOneHeader(headerEdit);
        selectedModal.classList.add("show-modal");
console.log(modalForm)
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
