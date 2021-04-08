const year = new Date().getFullYear() + 1;

window.onload = () => {
    const inputName = document.getElementById("productName");
    inputName.addEventListener("keyup", () => {
        document.getElementById("title").innerHTML = inputName.value;
    });

    //image
   
    const inputImage = document.getElementById("productPicture");
    const previewContainer = document.getElementById("previewContainer");
    const previewImage = document.querySelector(".imagePreview");

    const defaultText = previewContainer.querySelector("span");
     if (window.location.href.includes("crear")){
         defaultText.style.display = "block";
         previewImage.style.display = "none";
        
}
    inputImage.addEventListener("change", () => {
        const file = inputImage.files[0];
       
        if (file) {
            const reader = new FileReader();
            defaultText.style.display = "none";
            previewImage.style.display = "block";
            reader.addEventListener("load", () => {
                previewImage.src = reader.result;
            });
            reader.readAsDataURL(file)
        } else {
            defaultText.style.display = "block";
            previewImage.style.display = "none";
        }

    });
    const inputPrice = document.getElementById("productPrice");
    inputPrice.addEventListener("keyup", () => {
        document.getElementById("price").innerHTML = "$" + inputPrice.value;
    });
    const inputDescription = document.getElementById("productDescription");
    inputDescription.addEventListener("keyup", () => {
        document.getElementById("description").innerHTML = inputDescription.value;
    });
    const inputGrape = document.getElementById("productGrape");
    inputGrape.addEventListener("keyup", () => {
        document.getElementById("grape").innerHTML = inputGrape.value;
    });
    const inputYear = document.getElementById("productYear");
    inputYear.addEventListener("change", () => {
        document.getElementById("year").innerHTML = year -inputYear.selectedIndex;
    });
    const inputTemp = document.getElementById("productTemperature");
    inputTemp.addEventListener("keyup", () => {
        document.getElementById("temperature").innerHTML = inputTemp.value;
    });
    const inputAged = document.getElementById("productAged");
    inputAged.addEventListener("keyup", () => {
        document.getElementById("aged").innerHTML = inputAged.value;
    });
};