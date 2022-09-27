
const Joi = require('@hapi/joi')
//RegisterValidation
const registerValidation = data => {
    const schema = Joi.object({
        firstname: Joi.string()
            .min(2),
        password: Joi.string()
            .min(8),
        email: Joi.string()
            .min(15)
            .email(),
        username: Joi.string()
            .min(5),
        address: Joi.string()
            .min(8),
        lastname: Joi.string()
            .min(5),
        phone: Joi.string()
            .min(10),
    });
    //Tra ve du lieu validate
    return schema.validate(data)
};

//LoginValidation
const loginValidation = data => {
    const schema = Joi.object({
        email: Joi.string()
            .min(15)
            .email(),
        password: Joi.string()
            .min(8)

    })
    //Tra ve du lieu validate
    return schema.validate(data)
}

module.exports.registerValidation = registerValidation
module.exports.loginValidation = loginValidation