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

// new
open.addEventListener("click", () => {
    modalForm.action = "/usuarios/crearDireccion";
    showOneHeader(headerNew);
    const inputs = modaleNewAddress[0].querySelectorAll("input");
    for (const input of inputs) {
        input.placeholder = "";
    }
    modaleNewAddress[0].classList.add("show-modal");
});
//edit
for (const btn of editBtns) {
    btn.addEventListener("click", () => {
        const index = getIdIndex(btn);
        const selectedModal = modaleNewAddress.find((modal) => {
            return modal.id.includes(index);
        });
        modalForm.action = `/usuarios/editarDireccion/${selectedModal.dataset.id}`;
        console.log(modalForm.action);
        showOneHeader(headerEdit);
        selectedModal.classList.add("show-modal");
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
