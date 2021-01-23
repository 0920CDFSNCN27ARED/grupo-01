const saveProducts = require("./saveDbChanges");
function createNew(getFileCb, fileToGet, req) {
    const dbFile = getFileCb(fileToGet);

    const itemId = dbFile[dbFile.length - 1].id;

    const newElement = {
        id: itemId + 1,
        ...req.body,
    };
    if (req.file.typeOf == undefined) {
        newElement.image = req.file.filename;
    } else {
        newElement.image = "";
    }

    dbFile.push(newElement);
    saveProducts(fileToGet, dbFile);
    return newElement;
}

module.exports = createNew;
