const  {validationResult} = require('express-validator/check');
const statusCodes = require('../utils/StatusCodes');

exports.checkValidationError = (req) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log(errors.array());
        const error = new Error("Validation Failed");
        error.error = errors.array();
        error.statusCode = statusCodes.BAD_REQUEST;
        return error;
    } else {
        return null;
    }
};