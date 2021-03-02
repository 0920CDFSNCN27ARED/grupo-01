const form = document.querySelector("form");

form.addEventListener("submit", (event) => {
    const totalErrors = validateMultipleFields([
        ["email", [emailValidation]],
        ["password", [isLength(2)]],
       
    ]);

    if (totalErrors.length > 0) event.preventDefault();
});

