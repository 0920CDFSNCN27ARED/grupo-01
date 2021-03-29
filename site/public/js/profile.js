
const allActions = document.getElementsByClassName("action");

/////// Profile
showOneSection("profile-btn", "personal-data", allActions);
/////// My items
////// Favourites

////Addreses
showOneSection("address-btn", "address-screen", allActions);
let editBtns = document.getElementsByClassName("edit-btn");


////// Functions
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