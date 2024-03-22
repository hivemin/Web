const  CommerceModel  = require('../models/nosql/commerce'); // Importa el modelo de Mongoose para el comercio.
const { handleHttpError } = require('../utils/handleError'); // Importa la función para manejar errores HTTP.
const { matchedData } = require('express-validator'); // Importa la función para obtener datos coincidentes de las validaciones de Express.

const getItems = async (req, res) => {
    try {
        return res.send(await CommerceModel.find({})); // Busca y envía todos los elementos del modelo.
    } catch (err) {
        handleHttpError(res, 'ERROR_GET_ITEMS', 404);
    }
};

const getItem = async (req, res) => {
    try {
        const { cif } = matchedData(req); // Obtiene el identificador único del cuerpo de la solicitud.
        const data = await CommerceModel.findOne({ cif: cif }); // Busca un elemento por su cif único.
        if (!data) {
            return handleHttpError(res, 'COMMERCE_NOT_FOUND', 404);
        }
        res.send(data);
    } catch (err) {
        handleHttpError(res, 'ERROR_GET_ITEM');
    }
};

const createItem = async (req, res) => {
    try {
        const body = matchedData(req); // Obtiene los datos validados del cuerpo de la solicitud.
        const data = await CommerceModel.create(body); // Crea un nuevo elemento utilizando los datos del cuerpo de la solicitud.
        res.send(data);
    } catch (err) {
        handleHttpError(res, 'ERROR_CREATE_ITEMS');
    }
};

//La verdad que no entiendo por qué no funciona el updateItem, cuando en teoría con el findOneAndUpdate debería de poder seleccionar el cif y actualizar el modelo asignado a ese cif
const updateItem = async (req, res) => {
    try {
        const { cif } = req.params; // Obtiene el identificador único de los parámetros de la solicitud.
        const data = req.body; // Obtiene los datos del cuerpo de la solicitud.
        const updatedItem = await CommerceModel.findOneAndUpdate({ cif: cif }, {update: data}, { new: true }); // Busca y actualiza un elemento por su cif único.

        if (!updatedItem) {
            return handleHttpError(res, 'COMMERCE_NOT_FOUND', 404); // Si no se encuentra el elemento, envía un error 404.
        }

        res.send(updatedItem);
    } catch (err) {
        console.log(err);
        handleHttpError(res, 'ERROR_UPDATE_ITEM');
    }
};

const deleteItem = async (req, res) => {
    try {
        const { cif } = matchedData(req);
        let result;

        if (req.query.logical === 'true') {
            result = await CommerceModel.findOneAndUpdate({ cif: cif }, { deleted: true }, { new: true }); // Actualiza el estado de deleted a "true" de forma lógica.
        } else {
            result = await CommerceModel.findOneAndDelete({ cif: cif }); // Elimina físicamente el elemento de la base de datos.
        }
        if (!result) {
            return handleHttpError(res, 'COMMERCE_NOT_FOUND', 404); // Si no se encuentra el elemento, envía un error 404.
        }

        res.send(result);
    } catch (err) {
        handleHttpError(res, 'ERROR_DELETE_ITEM');
    }
};

// Exporta todas las funciones definidas como un objeto.
module.exports = { getItems, getItem, createItem, updateItem, deleteItem };
