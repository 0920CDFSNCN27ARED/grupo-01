async function edit(File, id, req) {
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
        return "Updated"
    } catch (err) {
       return err;
    }
}

module.exports = edit;
