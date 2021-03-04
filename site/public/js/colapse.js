window.addEventListener("load", () => {
    const content = document.getElementById("inside");
    const colapse = document.getElementById("colapse");
    colapse.addEventListener("click", () => {
        content.classList.toggle("description");
    });
});
