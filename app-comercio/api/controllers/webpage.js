const { matchedData } = require("express-validator")
const { handleHttpError } = require("../utils/handleError")
const  webpageModel = require("../models")


const getItem = async (req, res) => {
    try {
        const {id} = matchedData(req);
        return res.send(await webpageModel.findById(_id)); // Busca y envía el elemento del modelo con el id especificado.
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
        const webpage = await webpageModel.findById(_id); // Bus
    }
    catch (err) {
        handleHttpError(res, 'ERROR_CREATE_COMMENT');
    }
}
const createWebpage = async (req, res) => {
    try {
        const body = matchedData(req); // Obtiene los datos validados del cuerpo de la solicitud.
        const data = await webpageModel.create(body); // Crea un nuevo elemento utilizando los datos del cuerpo de la solicitud.
        res.send(data);
    } catch (err) {
        handleHttpError(res, 'ERROR_CREATE_WEBPAGE');
    }
}

const updateWebpage = async (req, res) => {
    try {
        const {id, ...body} = matchedData(req);
        const updatedWebpage = await webpageModel.findOneAndUpdate({id}, body
            , {new: true});
        if (!updatedWebpage) {
            return handleHttpError(res, 'WEBPAGE_NOT_FOUND', 404);
        }
        res.send(updatedWebpage);
    }
    catch (err) {
        handleHttpError(res, 'ERROR_UPDATE_WEBPAGE');
    }
}
const deleteWebpage = async (req, res) => {
    try {
        const { id } = matchedData(req);
        let result;
        result = await webpageModel.findByIdAndDelete(id);
        res.send(result);
    } catch (err) {
        handleHttpError(res, 'ERROR_DELETE_WEBPAGE');
    }
}
const uploadImage = async (req, res) => {
    try {
        const {id} = matchedData(req);
        const {file} = req;
        const updatedWebpage = await webpageModel.findOneAndUpdate({id}, {image: file.filename}, {new: true});
        if (!updatedWebpage) {
            return handleHttpError(res, 'WEBPAGE_NOT_FOUND', 404);
        }
        res.send(updatedWebpage);
    }
    catch (err) {
        handleHttpError(res, 'ERROR_UPLOAD_IMAGE');
    }
}

const getCity = async (req, res) => {
    try {
        const {ciudad, scoring} = matchedData(req);
        return res.send(await webpageModel.find({ciudad, scoring}));
    }
    catch (err) {
        handleHttpError(res, 'ERROR_GET_CITY');
    }
}

const getCityAndActivity = async (req, res) => {
    try {
        const {ciudad, actividad, scoring} = matchedData(req);
        let data;
        if (!scoring) {
            data = await webpageModel.find({ciudad, actividad});
        }
        else {
            data = await webpageModel.find({ciudad, actividad}).sort({scoring: -1});
        }
        res.send(data);
    }
    catch (err) {
        handleHttpError(res, 'ERROR_GET_CITY_AND_ACTIVITY');
    }
}



module.exports = {getItem, getItems, createComment, createWebpage, updateWebpage, deleteWebpage, uploadImage, getCity, getCityAndActivity}

