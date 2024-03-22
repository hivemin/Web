const express = require("express");
// Importa los controladores y validadores del modelo de /controllers y /validators respectivamente
const { getItems, getItem, createItem, updateItem, deleteItem } = require("../controllers/commerce");
const { validatorGetItem, validatorCreateItem, validatorDeleteItem } = require("../validators/commerce");

// Creamos un router de Express para definir las rutas de la API
const router = express.Router();

// Definimos las rutas y los controladores asociados
router.get('/', getItems); // Ruta para obtener todos los elementos
router.get('/:cif', validatorDeleteItem, getItem); // Ruta para obtener un elemento por su CIF
router.delete('/:cif', validatorGetItem, deleteItem); // Ruta para eliminar un elemento por su CIF
router.put('/:cif', validatorGetItem, validatorCreateItem, updateItem); // Ruta para actualizar un elemento por su CIF
router.post('/', validatorCreateItem, createItem); // Ruta para crear un nuevo elemento

// Exporta el router para que pueda ser utilizado por otros módulos
module.exports = router;
