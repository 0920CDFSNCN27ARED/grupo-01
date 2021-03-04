const fs = require("fs");
const path = require("path");

function getFile(fileToGet) {
    const fileAbsolutePath = path.resolve(__dirname, "../db", fileToGet);
    const db = fs.readFileSync(fileAbsolutePath, {
        encoding: "utf-8",
    });

    return JSON.parse(db);
}

module.exports = getFile;
