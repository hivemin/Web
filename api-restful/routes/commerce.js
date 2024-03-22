const express = require("express");
const { getItems, getItem, createItem, updateItem, deleteItem } = require("../controllers/commerce");
const { validatorGetItem, validatorCreateItem, validatorDeleteItem } = require("../validators/commerce");
const router = express.Router();

router.get('/', getItems);
router.get('/:cif',validatorDeleteItem, getItem);
router.delete('/:cif', validatorGetItem, deleteItem);
router.put('/:cif', validatorGetItem, validatorCreateItem, updateItem);
router.post('/', validatorCreateItem, createItem);

module.exports = router
