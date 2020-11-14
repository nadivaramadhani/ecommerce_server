const { Banner, User} = require('../models');

class BannerController{

    static listBanner(req, res, next){
        Banner
        .findAll()
        .then(data => {
            res.status(200).json(data)
        })
        .catch(err => {
            // console.log(err, "<<<<<< ERROR LIST Banner")
            // res.status(400).json(err)
            next(err)
        })
    }

    static addBanner(req, res, next){
        let { name, image_url, price, stock } = req.body;

        const newBanner = {
            name, image_url, price, stock, UserId:req.loggedInUser.id
        }

        Banner.create(newBanner)
        .then(data => {
            res.status(201).json(data)
        })
        .catch(err => {
            // console.log(err, "<<<<<<< ERROR POST")
            // res.status(400).json(err)
            next(err)
        })
    }


    static updateBanner(req,res, next){
        const id = req.params.id;
        let { name, image_url, price, stock } = req.body;
        
        const updatedBanner = {
            name, image_url, price, stock
        }

        Banner.update(updatedBanner, { 
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

       Banner.destroy({ 
            where: 
                { id: Id }
        })
        .then(data => {
            res.status(200).json({
                msg: 'Data Success To Delete'
            })
        })
        .catch (err => {
            // res.status(400).json(err)
            next(err)
        })
    }
    
}

module.exports = BannerController;