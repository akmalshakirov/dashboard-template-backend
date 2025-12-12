const Joi = require("joi");

exports.adminCreateSchema = Joi.object({
    name: Joi.string().min(5).max(10).required().messages({
        "string.base": "Name isn't match to format!",
        "any.required": "Name is required field!",
        "string.empty": "Name must be filled!",
        "string.min": "Minimum name's length is {#limit}!",
        "string.max": "Maximum name's length is {#limit}!",
    }),
    username: Joi.string().min(5).max(10).required().messages({
        "string.base": "Username isn't match to format!",
        "any.required": "Username is required field!",
        "string.empty": "Username must be filled!",
        "string.min": "Minimum username's length is {#limit}!",
        "string.max": "Maximum username's length is {#limit}!",
    }),
    password: Joi.string().min(5).max(15).required().messages({
        "string.base": "Password isn't match to format!",
        "any.required": "Password is required field!",
        "string.empty": "Password must be filled!",
        "string.min": "Minimum password's length is {#limit}!",
        "string.max": "Maximum password's length is {#limit}!",
    }),
    role: Joi.string().required().valid("ADMIN", "SUPERADMIN").messages({
        "string.base": "Role isn't match to format!",
        "any.required": "Role is required field!",
        "string.empty": "Role must be filled!",
        "any.only": "Role's format didn't match!",
    }),
});
