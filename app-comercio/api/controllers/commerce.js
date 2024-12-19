const  commerceModel  = require('../models/nosql/commerce'); // Importa el modelo de Mongoose para el comercio.
const { handleHttpError } = require('../utils/handleError'); // Importa la función para manejar errores HTTP.
const { matchedData } = require('express-validator'); // Importa la función para obtener datos coincidentes de las validaciones de Express.
const { tokenSign } = require("../utils/handleJwt")
const { encrypt } = require("../utils/handlePassword");
const jwt = require('jsonwebtoken'); // Importa la librería jsonwebtoken para manejar tokens JWT.
const getItems = async (req, res) => {
    let query = commerceModel.find();

    // Filtrar el CIF según la petición
    if (req.query.sortByCIF === 'asc') {
        query = query.sort({ CIF: 1 });
    }
    // console.log(req.user)


    // Comprobar el rol del usuario
    if (req.user.role !== 'admin') {
        // Excluir el campo CIF para usuarios que no son admin
        query = query.select('-cif -_id -rol -deleted -password');
    }
    const data = await query.exec();
    res.send(data);
}

const getItem = async (req, res) => {
    try {
        const { cif } = matchedData(req); // Obtiene el identificador único del cuerpo de la solicitud.
        const data = await commerceModel.findOne({ cif: cif }); // Busca un elemento por su cif único.
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
        req = matchedData(req)

        const password = await encrypt(req.password)
        const body = {...req, password}

        const user = await commerceModel.create(body)
        user.set('password', undefined, { strict: false })

        const data = {
            token: await tokenSign(user, "commerce"),
            user: user

        }
        //console.log(data.user)
        res.send(data)

    }catch(err) {
        console.log(err)
        handleHttpError(res, "ERROR_CREATE_COMMERCE")
    }
}

const updateItem = async (req, res) => {
    try {

        const  body = matchedData(req); // Get the unique identifier and the body of the request.
        console.log(body)
        // Check if password is provided in the request body
        const cif = req.jwt.cif;
        if (body.password) {
            // Hash the new password
            const hashedPassword = await encrypt(body.password);
            body.password = hashedPassword;
        }

        const updatedCommerce = await commerceModel.findOneAndUpdate({ cif: cif }, body); // Search and update an item by its unique cif.
        if (!updatedCommerce) {
            return handleHttpError(res, 'COMMERCE_NOT_FOUND', 404);
        }
        res.send(updatedCommerce);
    } catch (err) {
        console.log(err)
        handleHttpError(res, 'ERROR_UPDATE_ITEM');
    }
};

const deleteItem = async (req, res) => {
    try {
        const { cif } = matchedData(req);
        let result;

        if (req.query.logical === 'true') {
            result = await commerceModel.findOneAndUpdate({ cif: cif }, { deleted: true }, { new: true }); // Actualiza el estado de deleted a "true" de forma lógica.
        } else {
            result = await commerceModel.findOneAndDelete({ cif: cif }); // Elimina físicamente el elemento de la base de datos.
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
