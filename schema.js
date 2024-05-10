// Importing Joi
const Joi = require('joi');
const ErrorExpress = require("./error/er.js");

// Define the schema
const listingSchema = Joi.object({
    listing: Joi.object({
        title: Joi.string().required(),
        description: Joi.string().required(),
        price: Joi.number().required().min(0),
        location: Joi.string().required(),
        country: Joi.string().required(),
        image:Joi.string().allow("",null),
    }).required(),
}).required();

// Middleware to validate listing
const validateListing = (req, res, next) => {
    console.log(req.body); // Add this line to inspect the incoming request body
    const { error } = listingSchema.validate(req.body);
    if (error) {
        throw new ErrorExpress(400, error);
    }
    next();
};


const reviewSchema = Joi.object({
    review: Joi.object({
        comment: Joi.string().required(),
        rating: Joi.number().min(0).max(5).required(),   
    }).required(),
}).required();


// Middleware to validate listing
const validateReviews = (req, res, next) => {
    const { error } = reviewSchema.validate(req.body);
    if (error) {
        // Assuming ErrorExpress is some custom error handling class/function
        // Make sure it's defined or use a standard Error class
        throw new ErrorExpress(400,error);
    }
    next();
};

module.exports = { validateListing , validateReviews};