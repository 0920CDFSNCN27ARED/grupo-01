const bcrypt = require("bcrypt");
const saveProducts = require("./saveDbChanges");
function createNew(getFileCb, fileToGet, req) {
    const dbFile = getFileCb(fileToGet);

    const itemId = dbFile[dbFile.length - 1].id;

    const newElement = {
        id: itemId + 1,
        ...req.body,
    };
    if (req.file !== undefined) {
        newElement.image = req.file.filename;
    } else {
        newElement.image = "";
    }

    if (req.body.password) {
        const passEncrypt = bcrypt.hashSync(req.body.password, 10);
        newElement.password = passEncrypt;
    }
    if (req.originalUrl == "/usuarios/registro") {
        newElement.category = "usuario";
    } else if (req.originalUrl == "/usuarios/registroBodega") {
        newElement.category = "empresa";
    }

    dbFile.push(newElement);
    saveProducts(fileToGet, dbFile);
    return newElement;
}

module.exports = createNew;
