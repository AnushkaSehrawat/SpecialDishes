const express = require('express');
const DishController = require('../controller/DishesController');
const router = express.Router();

router.post('/postDish',DishController.postDish);
router.get('/getDishes',DishController.getDishes);
router.delete('/deleteDish',DishController.deleteDish);

module.exports = router;