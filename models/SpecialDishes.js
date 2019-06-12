const Sequelize  = require('sequelize');
const sequelize = require('../utils/database');

const Dishes = sequelize.define('dishes',{
                        id:{
                            type:Sequelize.INTEGER,
                            autoIncrement: true,
                            allowNull: false,
                            primaryKey:true
                        },
                        name:{
                            type: Sequelize.STRING,
                            allowNull: false
                        },
                        price:{
                            type: Sequelize.FLOAT,
                            allowNull:false
                        }
               });

module.exports=Dishes;