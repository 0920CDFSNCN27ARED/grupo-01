const fs = require("fs");
const path = require("path");

function getProducts() {
    const productsFileAbsolutePath = path.join(
        __dirname,
        "../db/products.json"
    );
    const db = fs.readFileSync(productsFileAbsolutePath, {
        encoding: "utf-8",
    });

    return JSON.parse(db);
}

module.exports = getProducts;
