const {User} = require('../models');
const { comparePassword } = require('../helpers/bcrypt');
const {loginToken} = require('../helpers/jwt');

class UserController {
    static register (req, res, next) {
        let { email, password } = req.body;
        const newUser = {
            email, password
        }
        User.create(newUser)
        .then(user => {
            res.status(201).json(user)
        })
        .catch(err => {
            next(err);
        })
    }

    static login(req,res, next) {
        User.findOne({
            where:{
                email: req.body.email
            }
        })
        .then(user => {
            if(!user) {
                throw ({msg:`Wrong Email/Password`,status: 401});
            }
            else if(!comparePassword(req.body.password, user.password)) {
                throw ({msg:`Wrong Email/Password`,status: 401})
            } else {
                const token = loginToken({
                    id: user.id,
                    email: user.email,
                    role: user.role
                })
                res.status(200).json({ token });
            }
        })
        .catch(err => {
            // res.status(400).json(err);
            next(err);
        })
    }

}
module.exports = UserController