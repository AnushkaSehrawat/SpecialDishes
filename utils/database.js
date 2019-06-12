const Sequelize = require('sequelize');

const sequelize = new Sequelize('special-dishes','root','root',{
                            host:'localhost',
                            dialect:'mysql',
                            logging:false
                    });

module.exports= sequelize;