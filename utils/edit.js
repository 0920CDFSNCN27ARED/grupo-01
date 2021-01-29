const save = require("./saveDbChanges");

function edit(getFileCb, fileToGet, req) {
    const dbFile = getFileCb(fileToGet);

    let requiredItemIndex = dbFile.findIndex((fileItem) => {
        return fileItem.id == req.params.id;
    });

    const itemToEdit = dbFile[requiredItemIndex];
    const itemId = dbFile[requiredItemIndex].id;

    const actualImage = dbFile[requiredItemIndex].image;

    dbFile[requiredItemIndex] = {
        id: itemId,
        ...req.body,
        image: req.file ? req.file.filename : actualImage,
    };

    save(fileToGet, dbFile);
    return itemToEdit;
}

module.exports = edit;
