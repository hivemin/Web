const  userModel  = require('../models/nosql/user'); // Importa el modelo de Mongoose para el comercio.
const { handleHttpError } = require('../utils/handleError'); // Importa la función para manejar errores HTTP.
const { matchedData } = require('express-validator');
const {encrypt} = require("../utils/handlePassword");
const commerceModel = require("../models/nosql/commerce"); // Importa la función para obtener datos coincidentes de las validaciones de Express.

const getItems = async (req, res) => {
    try {
        return res.send(await userModel.find({})); // Busca y envía todos los elementos del modelo.
    } catch (err) {
        handleHttpError(res, 'ERROR_GET_ITEMS', 404);
    }
}
const getItem = async (req, res) => {
    try {
        const { email } = matchedData(req); // Obtiene el identificador único del cuerpo de la solicitud.
        const data = await userModel.findOne({ email: email }); // Busca un elemento por su cif único.
        if (!data) {
            return handleHttpError(res, 'USER_NOT_FOUND', 404);
        }
        res.send(data);
    }
    catch (err) {
        handleHttpError(res, 'ERROR_GET_ITEM');
    }
}
const createItem = async (req, res) => {
    try {
        const body = matchedData(req); // Obtiene los datos validados del cuerpo de la solicitud.
        const data = await userModel.create(body); // Crea un nuevo elemento utilizando los datos del cuerpo de la solicitud.
        res.send(data);
    } catch (err) {
        console.log(err);
        handleHttpError(res, 'ERROR_CREATE_ITEMS');
    }
}
const updateItem = async (req, res) => {
    try {

        const  body = matchedData(req); // Get the unique identifier and the body of the request.
        // Check if password is provided in the request body
        const email = req.jwt.email;
        if (body.password) {
            // Hash the new password
            const hashedPassword = await encrypt(body.password);
            body.password = hashedPassword;
        }

        const updatedUser = await userModel.findOneAndUpdate({ email: email }, body); // Search and update an item by its unique cif.
        if (!updatedUser) {
            return handleHttpError(res, 'COMMERCE_NOT_FOUND', 404);
        }
        res.send(updatedUser);
    } catch (err) {
        console.log(err)
        handleHttpError(res, 'ERROR_UPDATE_ITEM');
    }
};
const deleteItem = async (req, res) => {
    try {
        const { email } = matchedData(req);
        let result;
        result = await userModel.delete
    }
    catch (err) {
        handleHttpError(res, 'ERROR_DELETE_USER');
    }
}
module.exports = {getItems, getItem, createItem, updateItem, deleteItem}