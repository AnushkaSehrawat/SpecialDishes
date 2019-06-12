const specialDish = require('../models/SpecialDishes');
const StatusCodes = require('../utils/StatusCodes');
const  contacts = require('../models/Contact');
const validator = require('../utils/Validator');

exports.postDish = async (req, resp, next) => {
    try {
        const dishName = req.body.name;
        const price = req.body.price;
        const dish = new specialDish({
            name: dishName,
            price: price
        });
        let postedDish = await dish.save();
        resp.json({
            status_code:StatusCodes.OK,
            message: "Special dish successfully posted!!",
            dish: postedDish
        });
    } catch (err) {
       next(err);
    }
};

exports.getDishes = async (req, resp, next) => {
    try {
        let dishes = await specialDish.findAll({attributes: ['id', 'name', 'price']});
        if (dishes.length === 0) {
            const error = new Error(" No dishes present");
            error.status = StatusCodes.NO_CONTENT;
            error.error = "Kindly post special dishes!";
            throw error;
        } else {
            resp.json({
                status_code: StatusCodes.OK,
                message: " Dishes successfully fetched!!",
                dishes: dishes
            });
        }
    } catch (err) {
        next(err);
    }
};

exports.deleteDish = async (req, resp, next) => {
    try {
        const dishId = req.query.id;
        if (dishId !== undefined) {
            let deletedDish = await specialDish.findByPk(dishId);
            if (deletedDish === null) {
                const error = new Error(" The dish with the provided Id does not exists!!");
                error.status = StatusCodes.NOT_FOUND;
                error.error = "Please provide a valid dish id";
                throw error;
            } else {
                let result = await deletedDish.destroy();
                resp.json({
                    message: "dish successfully deleted!!",
                    data: result
                });
            }
        } else {
            let deletedDishes = await specialDish.destroy({where: {}, truncate: true});
            resp.json({
                message: "Successfully deleted all the dishes!!",
                data: deletedDishes
            });
        }
    } catch (err) {
        next(err);
    }
};

exports.postContact = async (req,resp,next)=>{
    try{
        if(validator.checkValidationError(req)){
            throw validator.checkValidationError(req);
        }
        const phoneNumber = req.body.phone_num;
        let existingContact = await contacts.findAll({ where:{phone_num:phoneNumber}});
        if(existingContact.length !==0){
            const error = new Error(" The provided contact number is already registered!!");
            error.status=StatusCodes.CONFLICT;
            error.error=" Please provide a valid contact number";
            throw error;
        }
        const contact = new contacts({
            phone_num: phoneNumber
        });
        let result = await contact.save();
        resp.json({
            status_code:StatusCodes.OK,
            message:"Contact number posted successfully!!",
            data:result
        });
    }
    catch(err){
        next(err);
    }
};

exports.getContacts = async (req,resp,next)=>{
        try{
            let fetchedContacts = await contacts.findAll({attributes:['id','phone_num']});
            if(fetchedContacts.length === 0){
                const error =  new Error(" No contacts found !!");
                error.status= StatusCodes.NO_CONTENT;
                error.error=" No contacts to display!";
                throw error;
            }
            resp.json({
                status_code:StatusCodes.OK,
                message:"Contacts fetched successfully!!",
                contacts:fetchedContacts
            });
        }
        catch (err) {
            next(err);
        }
};