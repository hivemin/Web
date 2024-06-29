const express = require("express")
const router = express.Router()
const { deleteItem, updateItem, createItem} = require("../controllers/user")
const { validatorUpdateItem } = require("../validators/user")
const authMiddleware = require("../middleware/session")
const checkRol = require("../middleware/rol")
const {deleteWebpage} = require("../controllers/webpage");

router.post("/", authMiddleware, checkRol(["user"]), createItem)
router.put("/", authMiddleware, checkRol(["user"]), validatorUpdateItem, updateItem)
router.delete("/", authMiddleware, checkRol(["user"]), deleteItem)

module.exports = router
