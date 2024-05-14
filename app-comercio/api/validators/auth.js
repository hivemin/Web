const { check } = require("express-validator")
const validateResults = require("../utils/handleValidator")
const {mountpath} = require("express/lib/application");

const validatorRegister = [
    check("name").exists().notEmpty(),
    check("age").exists().notEmpty().isNumeric(),
    check("email").exists().notEmpty().isEmail(),
    check("password").exists().notEmpty().isLength( {min:6, max: 64} ),
    check("city").exists().notEmpty(),
    check("recOffers").exists().notEmpty().isBoolean(),
    (req, res, next) => {
        return validateResults(req, res, next)
    }
]

const validatorLogin = [
    check("email").exists().notEmpty().isEmail(),
    check("password").exists().notEmpty().isLength( {min:6, max: 16} ),
    (req, res, next) => {
        return validateResults(req, res, next)
    }
]

module.exports = { validatorRegister, validatorLogin }