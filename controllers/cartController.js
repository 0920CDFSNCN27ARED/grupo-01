const cartController={
showCart: (req, res) => {
    res.render("productCart");
},

showSaved:(req, res) => {
    res.render("savedProducts");
}

}

module.exports = cartController