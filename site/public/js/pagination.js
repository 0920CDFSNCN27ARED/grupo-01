const articles = document.querySelectorAll("article");
const paginationUL = document.querySelector("ul.pagination");
const prevBtn = document.getElementById("prev-btn");
const nextBtn = document.getElementById("next-btn");
const itemsPerPageForm = document.getElementById("items-qtty-form");
const allBtns = document.querySelectorAll(".page-item");
let highestNmbrBtn;
if (nextBtn) {
    highestNmbrBtn = Number(
        nextBtn.previousElementSibling.children[0].innerText
    );
}

const url = window.location.href.split("/");
const pagNmbr = Number(url[url.length - 1][0]) || 1;
for (const btn of allBtns) {
    if (btn.children[0].innerText == pagNmbr) {
        btn.classList.add("active");
    }
}

const numberSelected = window.location.href.split("=")[1] || 10;
if (pagNmbr < highestNmbrBtn) {
    nextBtn.addEventListener("click", () => {
        window.location.assign(
            `http://localhost:3000/productos/pagina/${
                pagNmbr + 1
            }?itemsPerPage=${numberSelected}`
        );
    });
}
if (pagNmbr > 1) {
    prevBtn.addEventListener("click", () => {
        window.location.assign(
            `http://localhost:3000/productos/pagina/${
                pagNmbr - 1
            }?itemsPerPage=${numberSelected}`
        );
    });
}

const itemsPerPage = document.getElementById("itemsPerPage");
if (itemsPerPage) {
    itemsPerPage.addEventListener("change", () => {
        itemsPerPageForm.submit();
    });
    for (const option of itemsPerPage) {
        if (numberSelected) {
            if (numberSelected == option.value) {
                option.selected = "on";
            }
        }
    }
}

