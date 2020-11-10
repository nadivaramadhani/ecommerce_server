const { Product, User} = require('../models');

class ProductController{

    static listProduct(req, res, next){
        Product
        .findAll()
        .then(data => {
            res.status(200).json(data)
        })
        .catch(err => {
            // console.log(err, "<<<<<< ERROR LIST Product")
            res.status(400).json(err)
            // next(err)
        })
    }

    static addProduct(req, res, next){
        let { name, image_url, price, stock } = req.body;

        const newProduct = {
            name, image_url, price, stock, UserId:req.loggedInUser.id
        }

        Product.create(newProduct)
        .then(data => {
            res.status(201).json(data)
        })
        .catch(err => {
            // console.log(err, "<<<<<<< ERROR POST")
            // res.status(400).json(err)
            next(err)
        })
    }

    static editProduct(req,res){
        const UserId = req.loggedInUser.id;
        const Id = req.params.id;
        
        Product.findByPk(Id, {
            where: {
                UserId
            }
        })
        .then(data => {
            res.status(202).json(data)
        })
        .catch (err => {
            // res.status(400).json(err)
            next(err)
        })
    }

    static updateProduct(req,res, next){
        const id = req.params.id;
        let { name, image_url, price, stock } = req.body;
        
        const updatedProduct = {
            name, image_url, price, stock
        }

        Product.update(updatedProduct, { 
            where: { id: id }, 
            returning: true 
        })
        .then(data => {
            res.status(200).json(data[1][0])
        })
        .catch (err => {
            // console.log(err)
            // res.status(400).json(err)
            next(err)
        })
    }

    static delete(req, res, next){
        const Id = req.params.id;

       Product.destroy({ 
            where: 
                { id: Id }
        })
        .then(data => {
            res.status(200).json({
                msg: 'Data Success To Delete'
            })
        })
        .catch (err => {
            res.status(400).json(err)
            // next(err)
        })
    }
    
}

module.exports = ProductController;