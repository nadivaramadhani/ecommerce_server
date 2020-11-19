'use strict';
const {
  Model
} = require('sequelize');

const { hashPassword } = require('../helpers/bcrypt')

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.hasMany(models.Product);
      User.hasMany(models.Banner);
      User.hasMany(models.Cart);
      // User.belongsToMany(models.Product, { through: models.Cart })
    }
  };
  User.init({
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Required Email'
        },
        isEmail: {
          args: true,
          msg: "It's not Email address"
        }, 
        isUnique(value, next) {
          User.findOne({
            where: {email: value},
          })
          .then(user => {
            if (user)
            return next('Email address is already taken!');
            next();
          }).catch(err => {
            console.log(err)
          })
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      validate:{
        notEmpty:{
          msg : 'Required Password'
        },
        len:{
          args: [6],
          msg: 'Minimun Password harus 6 karakter'
        }
      }
    },
    role: {
      type: DataTypes.STRING,
      defaultValue: "customer"
    }
  }, {
    hooks: {
      beforeCreate(user) {
        user.password = hashPassword(user.password);
    }
  },
    sequelize,
    modelName: 'User',
  });
  return User;
};