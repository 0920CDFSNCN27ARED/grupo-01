const fs = require("fs");
const path = require("path");

function saveDbChanges(dbFileName, filesToSave) {
    const filesJson = JSON.stringify(filesToSave, null, 2);
    fs.writeFileSync(path.resolve(__dirname, "../db", dbFileName), filesJson);
}

module.exports = saveDbChanges;
