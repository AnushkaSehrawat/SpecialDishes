const specialDish = require('../models/SpecialDishes');
const StatusCodes = require('../utils/StatusCodes');

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