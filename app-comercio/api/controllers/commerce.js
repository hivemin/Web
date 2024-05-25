const  commerceModel  = require('../models/nosql/commerce'); // Importa el modelo de Mongoose para el comercio.
const { handleHttpError } = require('../utils/handleError'); // Importa la función para manejar errores HTTP.
const { matchedData } = require('express-validator'); // Importa la función para obtener datos coincidentes de las validaciones de Express.
const { tokenSign } = require("../utils/handleJwt")
const { encrypt } = require("../utils/handlePassword")
const getItems = async (req, res) => {
    let query = commerceModel.find();

    // Filtrar el CIF según la petición
    if (req.query.sortByCIF === 'asc') {
        query = query.sort({ CIF: 1 });
    }

    // Comprobar el rol del usuario
    if (req.role !== 'admin') {
        // Excluir el campo CIF para usuarios que no son admin
        query = query.select('-cif -_id -rol -deleted -password');
    }
    const data = await query.exec();
    //console.log(req.user.role);
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
            token: await tokenSign(user),
            user: user
        }

        res.send(data)

    }catch(err) {
        console.log(err)
        handleHttpError(res, "ERROR_CREATE_COMMERCE")
    }
}



const updateItem = async (req, res) => {
    try {
        const { CIF, ...body } = matchedData(req);
        const commerceCIF = req.commerceCIF; // Obtained from the token

        // Verify if the commerce CIF from the token matches the CIF provided
        if (commerceCIF !== CIF) {
            return handleHttpError(res, 'UNAUTHORIZED', 403);
        }

        const updatedCommerce = await commerceModel.findOneAndUpdate({ CIF }, body, { new: true });
        if (!updatedCommerce) {
            return handleHttpError(res, 'COMMERCE_NOT_FOUND', 404);
        }
        res.send(updatedCommerce);
    } catch (err) {
        console.log(err);
        handleHttpError(res, 'ERROR_UPDATE_COMMERCE');
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
