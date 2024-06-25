const {check} = require("express-validator")
const validateResults = require("../utils/handleValidator")

const validatorCreateItem = [
    check("name").exists().notEmpty(),
    check("email").exists().notEmpty().isEmail(),
    check("password").exists().notEmpty().isLength({ min: 6 }),
    check("age").exists().notEmpty().isNumeric(),
    check("city").exists().notEmpty(),
    check("interests").exists().notEmpty(),
    check("recOffers").exists().notEmpty().isBoolean(),
    check("role").exists().notEmpty().isIn(["user", "admin"]),
    (req, res, next) => validateResults(req, res, next)
]
const validatorGetItem = [
    check("id").exists().notEmpty().isMongoId(),
    (req, res, next) => validateResults(req, res, next)
]
const validatorUpdateItem = [
    check("id").exists().notEmpty().isMongoId(),
    check("name").optional().notEmpty(),
    check("password").optional().notEmpty().isLength({ min: 6 }),
    check("age").optional().notEmpty().isNumeric(),
    (req, res, next) => validateResults(req, res, next)
]
const validatorDeleteItem = [
    check("id").exists().notEmpty().isMongoId(),
    (req, res, next) => validateResults(req, res, next)
]
module.exports = {validatorCreateItem, validatorGetItem, validatorUpdateItem, validatorDeleteItem}