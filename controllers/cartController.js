const { Cart, Product, User } = require('../models');
const { Op } = require("sequelize")

class CartController {
  static getCart (req, res, next) {
    // const UserId = req.loggedInUser.id;
    Cart
    .findAll({
      where: {
        UserId: req.loggedInUser.id
      }, 
      include: [Product]
    })
    .then(data => {
        res.status(200).json(data)
    })
    .catch(err => {
        next(err)
    })
  }

  static addCart (req, res, next) {
    // const UserId = req.loggedInUser.id;
    // const { ProductId } = req.body;
    Cart.findOne({
      where: {
        [Op.and] : [{ UserId: req.loggedInUser.id }, { ProductId : req.body.ProductId}]
      }, 
      include: [Product]
    })
    .then(product => {
      console.log(product," <<<<< PRODUCT")
        if (product) {
          let pQuantity = {}
          const total = product.quantity + 1
          if (total >= product.Product.stock) {
            pQuantity.quantity = product.Product.stock
            throw { msg: "OUT OF STOCK", status : 401 }
          } else {
            pQuantity.quantity = total
            // throw {msg: "Woy nape nambah-nambah! Uhdah habis nih!"}
          }
          Cart.update(pQuantity, {
            where: {
              [Op.and] : [{ UserId: req.loggedInUser.id }, { ProductId : req.body.ProductId}]
            }
          })
          .then(updatedCart => {
            res.status(201).json({ msg: "Produk berhasil ditambahkan"})
          })
          .catch(err => {
            res.status(400).json(err)
          })
        } else {
          const pQuantity = {
            UserId: req.loggedInUser.id,
            ProductId: req.body.ProductId,
            quantity: 19
          }
          Cart.create(pQuantity)
          .then(data => {
            res.status(201).json(data)
          })
          .catch(err => {
            res.status(400).json(err)
          })
        }
    })
    .catch(err => {
      console.log(err)
      next(err)
    })
    // Cart
    // .create({
    //     UserId,
    //     ProductId
    // })
    // .then(data => {
    //     res.status(201).json(data)
    // })
    // .catch(err => {
    //     next(err)
    // })
  }

  static updateCart (req, res, next) {
    const UserId = req.loggedInUser.id;
    const ProductId = +req.params.id;
    const { quantity } = req.body;
    Product
    .findByPk( ProductId )
    .then(product => {
        if (quantity > product.stock) {
            quantity = product.stock
        }
        Cart.update({ quantity }, {
          where: {
            ProductId,
            UserId
          },
          returning: true
        })
        .then(data => {
          res.status(200).json({
            msg: 'Berhasil Update Cart!'
          })
        })
    })
    .catch(err => {
      console.log(err)
        next(err)
    })
  }

  static delete (req, res, next) {
    const UserId = req.loggedInUser.id;
    const ProductId = +req.params.id;

    Cart
    .destroy({
        where: {
          UserId,
          ProductId
        }
    })
    .then(data => {
        if (data) {
            res.status(200).json({
              message: 'Data Success To Delete'
            });
        } else {
            throw {
              name: 'Data Not Found'
            };
        }
    })
    .catch(err => {
        next(err)
    })
  }
}

module.exports = CartController;