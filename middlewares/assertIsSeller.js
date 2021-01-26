function isSeller(req,res,next){
    if(req.session.loggedUser == undefined){
        return next()
    }

    if(req.session.loggedUser.category == "empresa"){
        next()
    }else{
        
        res.locals.loggedUser = req.session.loggedUser
        res.render("errors/pageNotAllowed")
    }

}

module.exports = isSeller;