let articles = document.querySelectorAll(".article");
let arrayArticles = Array.from(articles);
arrayArticles.forEach(article => {
    let plus = article.querySelector(".plus")
    let qtyValue = article.querySelector(".quantity-box").value
    plus.addEventListener("click", () => {
        qtyValue = qtyValue ++
    })
});


