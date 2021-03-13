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

