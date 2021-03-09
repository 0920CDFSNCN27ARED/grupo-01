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