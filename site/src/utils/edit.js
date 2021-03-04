async function edit(File, id, req, res) {
    try {
        const element = await File.findByPk(id);
        await File.update(
            {
                ...req.body,
                image: req.file ? req.file.filename : element.image,
            },
            {
                where: { id: id },
            }
        );
    } catch (err) {
        res.send(err);
    }
}

module.exports = edit;
// function edit(getFileCb, fileToGet, req) {
//     const dbFile = getFileCb(fileToGet);

//     let requiredItemIndex = dbFile.findIndex((fileItem) => {
//         return fileItem.id == req.params.id;
//     });

//     const itemToEdit = dbFile[requiredItemIndex];
//     const itemId = dbFile[requiredItemIndex].id;

//     const actualImage = dbFile[requiredItemIndex].image;

//     dbFile[requiredItemIndex] = {
//         id: itemId,
//         ...req.body,
//         image: req.file ? req.file.filename : actualImage,
//     };

//     save(fileToGet, dbFile);
//     return itemToEdit;
// }
