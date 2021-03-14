window.onload = () => {
    const search = document.getElementById("search");
    const underNav = document.querySelector(".under-nav");
    const ul = underNav.querySelector("ul");
    const form = document.querySelector(".search-form");
    
    search.addEventListener("click", () => {
        ul.style.marginRight = "100%";
        form.style.marginLeft = "0%";
    })
    
    const close = document.querySelector(".search-label i");
    close.addEventListener("click", () => {
        ul.style.marginRight = "0%";
        form.style.marginLeft = "100%";
    })
}
