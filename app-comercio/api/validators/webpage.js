const {check} = require("express-validator")
const validateResults = require("../utils/handleValidator")

const validatorGetItem = [
    check("id").exists().notEmpty(),
    (req, res, next) => {
        return validateResults(req, res, next)
    }
]
const validatorCreateComment = [
    check("id").exists().notEmpty(),
    check("score").exists().notEmpty().isNumeric(),
    check("text").exists().notEmpty(),
    (req, res, next) => {
        return validateResults(req, res, next)
    }
]
const validatorCreateWebpage = [
    check("city").exists().notEmpty(),
    check("activity").exists().notEmpty(),
    check("title").exists().notEmpty(),
    check("summary").exists().notEmpty(),
    (req, res, next) => {
        return validateResults(req, res, next)
    }
]

const validatorUpdateWebpage = [
    check("id").exists().notEmpty(),
    check("email").exists().notEmpty().isEmail(),
    check("city").exists().notEmpty(),
    check("activity").exists().notEmpty(),
    check("title").exists().notEmpty(),
    check("summary").exists().notEmpty(),
    (req, res, next) => {
        return validateResults(req, res, next)
    }
]

const validatorGetCity = [
    check("city").exists().notEmpty(),
    check("scoring").exists().notEmpty().isBoolean(),
    (req, res, next) => {
        return validateResults(req, res, next)
    }
]

const validatorGetCityAndActivity = [
    check("activity").exists().notEmpty(),
    check("city").exists().notEmpty(),
    check("scoring").exists().notEmpty().isBoolean(),
    (req, res, next) => {
        return validateResults(req, res, next)
    }
]

module.exports = {validatorGetItem, validatorCreateComment, validatorCreateWebpage, validatorUpdateWebpage, validatorGetCity, validatorGetCityAndActivity}
