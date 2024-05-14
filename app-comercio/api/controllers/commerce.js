const  CommerceModel  = require('../models'); // Importa el modelo de Mongoose para el comercio.
const { handleHttpError } = require('../utils/handleError'); // Importa la función para manejar errores HTTP.
const { matchedData } = require('express-validator'); // Importa la función para obtener datos coincidentes de las validaciones de Express.
const { tokenSign } = require("../utils/handleJwt")
const { encrypt } = require("../utils/handlePassword")
const getItems = (req, res) => errorHandler(req, res, async () => {
    let query = CommerceModel.find();
    //esto es para filtrar el CIF  (ayuda de dario)
    if (req.query.sortByCIF === 'asc') {
        query = query.sort({ CIF: 1 });
    }
    const data = await query.exec();
    res.send(data);
});

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

const updateItem = (req, res) => errorHandler(req, res, async () => {
    const { CIF, ...body } = matchedData(req);
    //busco el comercio a actualizar con el CIF
    // console.log(CIF)
    const updatedCommerce = await comercioModel.findOneAndUpdate({ CIF }, body, { new: true });
    if (!updatedCommerce) {
        return handleHttpError(res, 'COMMERCE_NOT_FOUND', 404);
    }
    res.send(updatedCommerce);
});

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
