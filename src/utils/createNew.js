const bcrypt = require("bcrypt");
const save = require("./saveDbChanges");
function createNew(getFileCb, fileToGet, req) {
    const dbFile = getFileCb(fileToGet);

    const itemId = dbFile[dbFile.length - 1].id;

    const newElement = {
        id: itemId + 1,
        ...req.body,
    };

    console.log(req.file)
    if (req.file == undefined) {
        newElement.image = "";
    } else {
        newElement.image = req.file.filename;
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
    save(fileToGet, dbFile);
    return newElement;
}

module.exports = createNew;