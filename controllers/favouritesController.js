const favouritesController = {
    showFavourites: (req, res) => {
        res.sendFile(path.resolve(__dirname, "favourites"));
    },
};

module.exports = favouritesController;
