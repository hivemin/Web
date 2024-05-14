const {check} = require("express-validator")
const validateResults = require("../utils/handleValidator")

const validatorCreateItem = [
    check("name").exists().notEmpty(),
    check("email").exists().notEmpty().isEmail(),
    check("password").exists().notEmpty().isLength({ min: 6 }),
    (req, res, next) => validateResults(req, res, next)
]
const validatorGetItem = [
    check("id").exists().notEmpty().isMongoId(),
    (req, res, next) => validateResults(req, res, next)
]
const validatorUpdateItem = [
    check("id").exists().notEmpty().isMongoId(),
    check("name").optional().notEmpty(),
    check("email").optional().notEmpty().isEmail(),
    (req, res, next) => validateResults(req, res, next)
]
const validatorDeleteItem = [
    check("id").exists().notEmpty().isMongoId(),
    (req, res, next) => validateResults(req, res, next)
]
module.exports = {validatorCreateItem, validatorGetItem, validatorUpdateItem, validatorDeleteItem}