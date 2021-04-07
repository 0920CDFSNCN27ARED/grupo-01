const allActions = document.getElementsByClassName("action");
const transactions = document.getElementById("transactions-btn");
const myPosts = document.getElementById("myPosts-btn")
/////// Profile
showOneSection("profile-btn", "personal-data", allActions);
/////// My items
if (transactions) {
    showOneSection("transactions-btn", "transactions-screen", allActions);
}

////// Favourites

////Addreses
showOneSection("address-btn", "address-screen", allActions);
let editBtns = document.getElementsByClassName("edit-btn");
if (myPosts) showOneSection("myPosts-btn", "posts-screen", allActions);
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
