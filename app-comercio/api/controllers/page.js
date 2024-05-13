const { matchedData } = require("express-validator")
const { handleHttpError } = require("../utils/handleError")
const  webpageModel = require("../models")


const getItem = async (req, res) => {
    try {
        const {id} = matchedData(req);
        return res.send(await webpageModel.findById(id)); // Busca y envía el elemento del modelo con el id especificado.
    }
    catch (err) {
        handleHttpError(res, 'ERROR_GET_WEBPAGE', 404);
    }
}
const getItems = async (req, res) => {
    try {
        return res.send(await webpageModel.find({})); // Busca y envía todos los elementos del modelo.
    } catch (err) {
        handleHttpError(res, 'ERROR_GET_ITEMS', 404);
    }
};

const createComment = async (req, res) => {
    try {
        const {id} = matchedData(req); // Obtiene el identificador único del cuerpo de la solicitud.
        const {texto, score} = req.body; // Obtiene el texto y la puntuación del cuerpo de la solicitud.
        const email_usuario = req.user.email; // Obtiene el correo electrónico del usuario autenticado.
        const comentario = {texto: texto, email_usuario: email_usuario, score: score}; // Crea un objeto de comentario.
        const webpage = await webpageModel.findById(id); // Bus
    }
    catch (err) {
        handleHttpError(res, 'ERROR_CREATE_COMMENT');
    }
}

const updateItem = async (req, res) => {
    try {
        const { id } = req.params; // Obtiene el identificador único de los parámetros de la solicitud.
        const data = req.body; // Obtiene los datos del cuerpo de la solicitud.
        const updatedItem = await webpageModel.findOneAndUpdate({ _id: id }, data, { new: true }); // Busca y actualiza un elemento por su id único.

        if (!updatedItem) {
            return handleHttpError(res, 'WEBPAGE_NOT_FOUND', 404); // Si no se encuentra el elemento, envía un error 404.
        }

        res.send(updatedItem);
    } catch (err) {
        handleHttpError(res, 'ERROR_UPDATE_WEBPAGE');
    }
}

const deleteItem = async (req, res) => {
    try {
        const {id} = matchedData(req); // Obtiene el identificador único del cuerpo de la solicitud.
        let result;
        result = await webpageModel.delete
    }
    catch (err) {
        handleHttpError(res, 'ERROR_DELETE_WEBPAGE');
    }
}

module.exports = {getItem, getItems, createComment, updateItem, deleteItem}


