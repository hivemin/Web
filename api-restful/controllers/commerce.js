const { CommerceModel } = require('../models')
const { handleHttpError } = require('../utils/handleError')
const { matchedData } = require('express-validator')

const getItems = async (req, res) => {

    try {
        let query = CommerceModel.find()
        if (req.query.sortByCIF === 'asc') {
            query = query.sort({cif: 1})
        }
        const data = await query.exec()
        res.send(data)
    } catch (err) {
        handleHttpError(res, 'ERROR_GET_ITEMS', 404) //Si nos sirve el de por defecto que hemos establecido, no es necesario pasar el 403
    }
}
const getItem = async (req, res) => {
    try {
        const { cif } = matchedData(req)
        const data = await CommerceModel.findOne({ cif: cif })
        if (!data) {
            return handleHttpError(res, 'COMMERCE_NOT_FOUND', 404)
        }
        res.send(data)
    } catch (err) {
        console.log(err)
        handleHttpError(res, 'ERROR_GET_ITEM')
    }
}
const createItem = async (req, res) => {
    try {
        const body = matchedData(req)
        const data = await CommerceModel.create(body)
        console.log(data)
        res.send(data)
    } catch (err) {
        console.log(err)
        handleHttpError(res, 'ERROR_CREATE_ITEMS')
    }
}
const updateItem = async (req, res) => {
    try {
        const {cif, ...body} = matchedData(req)
        const updatedCommerce = await CommerceModel.findOneAndUpdate({cif: cif}, body, {new: true});
            if (!updatedCommerce) {
                return handleHttpError(res, 'COMMERCE_NOT_FOUND', 404);
            }
        res.send(updatedCommerce);
    }catch (err) {
        console.log(err)
        handleHttpError(res, 'ERROR_UPDATE_ITEM')
    }
}
const deleteItem = async (req, res) => {
    try {
        const { cif } = matchedData(req);
        let result;

        if (req.query.logical === 'true') {
            result = await CommercesModel.findOneAndUpdate({ cif: cif }, { deleted: true }, { new: true });
        } else {
            result = await CommercesModel.findOneAndDelete({ cif: cif });
        }

        if (!result) {
            return handleHttpError(res, 'COMMERCE_NOT_FOUND', 404);
        }

        res.send(result);
    } catch (err) {
        handleHttpError(res, 'ERROR_DELETE_ITEM');
    }
};

module.exports = { getItems, getItem, createItem, updateItem, deleteItem };