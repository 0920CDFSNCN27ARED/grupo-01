const { Module } = require("module");
const save = require("./saveDbChanges");

function erase(getFileCb, fileToGet, req) {
    const dbFile = getFileCb(fileToGet);
    const itemToEraseIndex = dbFile.findIndex((fileItem) => {
        return fileItem.id == req.params.id;
    });
    dbFile.splice(itemToEraseIndex, 1);
    save(fileToGet, dbFile);
    return dbFile[itemToEraseIndex];
}

module.exports = erase;