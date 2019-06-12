const express = require('express');
const specialDishes = require('./models/SpecialDishes');
const bodyParser = require('body-parser');
const dishRoutes = require('./routes/DishesRoutes');

const sequelize = require('./utils/database');

const app = express();

app.use(bodyParser.json());

app.use(dishRoutes);

app.use((err,req,resp,next)=>{
    const status = err.status || 500;
    const error = err.error || " General error";
    const message= err.message || "General message";
    resp.json({
        status_code:status,
        error:error,
        message:message
    });
});

sequelize.sync()
         .then(()=>{
             app.listen(3000);
             console.log(" CONNECTED!!!!!!!!");
         })
         .catch( err=> console.log(err));

