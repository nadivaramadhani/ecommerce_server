const { Banner, User} = require('../models');

class BannerController{

    static listBanner(req, res, next){
        Banner
        .findAll()
        .then(data => {
            res.status(200).json(data)
        })
        .catch(err => {
            next(err)
        })
    }

    static addBanner(req, res, next){
        let { title, image_url, status } = req.body;

        const newBanner = {
            title, image_url, status, UserId:req.loggedInUser.id
        }

        Banner.create(newBanner)
        .then(data => {
            res.status(201).json(data)
        })
        .catch(err => {
            next(err)
        })
    }

    static updateBanner(req,res, next){
        const id = req.params.id;
        let { title, image_url, status } = req.body;
        
        const updatedBanner = {
            title, image_url, status
        }

        Banner.update(updatedBanner, { 
            where: { id: id }, 
            returning: true 
        })
        .then(data => {
            res.status(200).json(data[1][0])
        })
        .catch (err => {
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
            next(err)
        })
    }
    
}

module.exports = BannerController;