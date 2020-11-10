function authorization(req, res, next){

    if(req.loggedInUser.role === "admin"){
        next()
    } else {
        next({ msg : 'Not authorized', status: 401})
    }
}

module.exports = authorization;