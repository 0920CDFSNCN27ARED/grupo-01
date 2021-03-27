const sideBar = document.getElementById("mySidebar");
const roundBtn = document.getElementById("round-button");

const roundBtnChildren = roundBtn.children;

window.addEventListener("click", (e) => {
    if (
        e.target !== sideBar &&
        e.target !== roundBtn &&
        e.target !== roundBtnChildren[0]
    )
        closeNav();
});

function openNav() {
    document.getElementById("mySidebar").style.marginLeft = "270px";
}

function closeNav() {
    document.getElementById("mySidebar").style.marginLeft = "0";
}
