const Sequelize  = require('sequelize');
const sequelize = require('../utils/database');

const Contacts = sequelize.define('contacts',{
    id:{
        type:Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey:true
    },
    phone_num:{
        type: Sequelize.INTEGER,
        allowNull: false
    }
});

module.exports=Contacts;