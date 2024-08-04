const joi = require("joi");
// const reviews = require("./models/reviews")
module.exports.reviewSchema = joi.object({
  review: Joi.object({
    rating: Joi.number().required(),
    comment: Joi.string().required(),
  }).required(),
});

//INcomplete
// Server side error handling
