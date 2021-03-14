async function erase(File, id) {
    try {
        await File.destroy({
            where: { id: id },
        });
        return "Deleted"
    } catch (err) {
      return err;
    }
}

module.exports = erase;

