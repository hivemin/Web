const  userModel  = require('../models/nosql/user'); // Importa el modelo de Mongoose para el comercio.
const { handleHttpError } = require('../utils/handleError'); // Importa la función para manejar errores HTTP.
const { matchedData } = require('express-validator'); // Importa la función para obtener datos coincidentes de las validaciones de Express.

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
        handleHttpError(res, 'ERROR_CREATE_ITEMS');
    }
}
const updateItem = async (req, res) => {
    try {
        const { email } = req.params; // Obtiene el identificador único de los parámetros de la solicitud.
        const data = req.body; // Obtiene los datos del cuerpo de la solicitud.
        const updatedItem = await userModel.findOneAndUpdate({ email: email }, {update: data}, { new: true }); // Busca y actualiza un elemento por su cif único.

        if (!updatedItem) {
            return handleHttpError(res, 'USER_NOT_FOUND', 404); // Si no se encuentra el elemento, envía un error 404.
        }

        res.send(updatedItem);
    } catch (err) {
        console.log(err);
        handleHttpError(res, 'ERROR_UPDATE_ITEM');
    }
}
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