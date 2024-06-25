const { check } = require("express-validator");
const validateResults = require("../utils/handleValidator.js");

// Definimos qué validar en CreateItem, siendo todos los campos bastante explicitos
const validatorCreateItem = [
    check("name").exists().notEmpty(),
    check("cif").exists().notEmpty(),
    check("address").exists().notEmpty(),
    check("email").exists().notEmpty(),
    check("phone").exists().notEmpty(),
    check("password").exists().notEmpty(),
    (req, res, next) => validateResults(req, res, next) // Llamamos a la función 'validateResults' para manejar los resultados de la validación
];
const validatorUpdateItem = [
    check("name").exists().notEmpty(),
    check("address").exists().notEmpty(),
    check("phone").exists().notEmpty(),
    check("password").exists().notEmpty(),
    (req, res, next) => validateResults(req, res, next) // Llamamos a la función 'validateResults' para manejar los resultados de la validación
];
const validatorGetItem = [
    check("cif").exists().notEmpty(),
    (req, res, next) => {
        return validateResults(req, res, next); // Llamamos a la función 'validateResults' para manejar los resultados de la validación
    }
];

const validatorDeleteItem = [
    check("cif").exists().notEmpty(),
    check("logical").exists().notEmpty().isBoolean(),
    (req, res, next) => {
        return validateResults(req, res, next); // Llamamos a la función 'validateResults' para manejar los resultados de la validación
    }
];

// Exporta los validadores para su uso en otros módulos
module.exports = { validatorCreateItem, validatorGetItem, validatorDeleteItem, validatorUpdateItem };
