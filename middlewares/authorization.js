const { Cart } = require('../models');

function authorizationAdmin(req, res, next){

    if(req.loggedInUser.role === "admin"){
        next()
    } else {
        next({ msg : 'Not authorized', status: 401})
    }
}

function authorizationCustomer(req, res, next){

    if(req.loggedInUser.role === "customer"){
        next()
    } else {
        next({ msg : 'Not authorized', status: 401})
    }
}

function authorizationCart (req, res, next) {
  const UserId = req.loggedInUser.id;
  const ProductId = +req.params.id;

  Cart
  .findOne({
      where: {
          UserId,
          ProductId
        }
    })
    .then(data => {
        if (!data) {
            throw ({
                msg: 'Not authorized', status: 401
            });
        } else {
            next()
        }
    })
    .catch(err => {
        next(err)
  })
}

module.exports = {
    authorizationAdmin,
    authorizationCustomer,
    authorizationCart
}