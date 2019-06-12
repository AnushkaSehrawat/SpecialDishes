const express = require('express');
const {body} = require('express-validator/check');

const DishController = require('../controller/DishesController');
const statusCodes = require('../utils/StatusCodes');
const  contacts = require('../models/Contact');
const router = express.Router();

router.post('/postDish', DishController.postDish);
router.get('/getDishes', DishController.getDishes);
router.delete('/deleteDish', DishController.deleteDish);
router.post('/postContact', [
                                body('phone_num')
                                    .trim()
                                    .not()
                                    .isEmpty()
                                    .withMessage("phone_num field cannot be empty")
                                    .isLength({min:10,max:10})
                                    .withMessage("phone_num should be 10 digits")
                            ], DishController.postContact);
router.get('/getContacts', DishController.getContacts);

module.exports = router;