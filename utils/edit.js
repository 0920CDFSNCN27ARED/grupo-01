const saveProducts = require("./saveDbChanges");

function edit(getFileCb, fileToGet, req) {
    const dbFile = getFileCb(fileToGet);

    let requiredItemIndex = dbFile.findIndex((fileItem) => {
        return fileItem.id == req.params.id;
    });

    const itemToEdit = dbFile[requiredItemIndex];
    const itemId = dbFile[requiredItemIndex].id;

    const actualImage = dbFile[requiredItemIndex].image;
    console.log(actualImage);
    dbFile[requiredItemIndex] = {
        id: itemId,
        ...req.body,
        image: req.file !== undefined ? req.file.filename : actualImage,
    };

    saveProducts(fileToGet, dbFile);
    return itemToEdit;
}

module.exports = edit;
