const form = document.querySelector("form");

const yearSelect = document.getElementById("productYear");
const actualYear = new Date().getFullYear();

function getYears(minYear) {
    for (let i = actualYear; i >= minYear; i--) {
        const option = document.createElement("option");
        option.innerText = i;
        yearSelect.appendChild(option);
    }
}

getYears(1850);

const validationStructure = [
    ["productName", [isLength(5)]],
    ["productPicture", [isValidFormat]],
    ["productPrice", [intValidation(1)]],
    ["productDescription", [isLength(20)]],
    ["productGrape", [isLength(2)]],
    ["productYear", [isTrue("Debes seleccionar un año")]],
    ["productTemperature", [intValidation(-49, 41)]],
    ["productAged", [intValidation(1, 401)]],
    ["productStock", [intValidation(1)]],
    ["productDiscount", [intValidation(1, 100)]],
];

form.addEventListener("submit", (event) => {
    clearValidateAndCheck(event);
});

validateAllIndividually(validationStructure);

const imgInput = document.getElementById("productPicture");
const previewContainer = document.getElementById("preview-container");
const imgPreview = document.getElementById("image-preview");
const defaultText = document.getElementById("default-text");

imgInput.addEventListener("change", (event) => {
    const file = imgInput.files[0];
    if (file) {
        const reader = new FileReader();
        defaultText.style.display = "none";
        imgPreview.style.display = "block";
        reader.addEventListener("load", () => {
            imgPreview.src = reader.result;
            // const imgStyle = document.defaultView.getComputedStyle(imgPreview);
            // previewContainer.style.width = imgStyle.width;
            // previewContainer.style.height = imgStyle.height;
        });

        reader.readAsDataURL(file);
    } else {
        defaultText.style.display = "block";
        imgPreview.style.display = "none";
        imgPreview.src = "";
    }
});
