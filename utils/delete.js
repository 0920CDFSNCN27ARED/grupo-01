async function erase(File, id,res) {
    try {
        await File.destroy({
            where: { id: id },
        });
    } catch (err) {
        res.send(err);
    }
}

module.exports = erase;

// const save = require("./saveDbChanges");

// function erase(getFileCb, fileToGet, req) {
//     const dbFile = getFileCb(fileToGet);
//     const itemToEraseIndex = dbFile.findIndex((fileItem) => {
//         return fileItem.id == req.params.id;
//     });
//     dbFile.splice(itemToEraseIndex, 1);
//     save(fileToGet, dbFile);
//     return dbFile[itemToEraseIndex];
// }
