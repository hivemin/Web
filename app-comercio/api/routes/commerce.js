const express = require("express");
// Importa los controladores y validadores del modelo de /controllers y /validators respectivamente
const { getItems, getItem, createItem, updateItem, deleteItem } = require("../controllers/commerce");
const { validatorGetItem, validatorCreateItem, validatorDeleteItem } = require("../validators/commerce");
const checkRol  = require("../middleware/rol");
const  authMiddleware  = require("../middleware/session");
// Creamos un router de Express para definir las rutas de la API
const router = express.Router();

// Definimos las rutas y los controladores asociados
router.get("/",authMiddleware, checkRol(['admin','usuario']), getItems);
router.get('/:cif', validatorDeleteItem, getItem); // Ruta para obtener un elemento por su CIF
router.delete('/:cif', validatorGetItem, deleteItem); // Ruta para eliminar un elemento por su CIF
router.put("/:CIF", authMiddleware, checkRol(['commerce']), validatorGetItem, validatorCreateItem, updateItem);
router.post("/", authMiddleware, checkRol(['admin']), validatorCreateItem, createItem ) //crear comercios

// Exporta el router para que pueda ser utilizado por otros módulos
module.exports = router;
