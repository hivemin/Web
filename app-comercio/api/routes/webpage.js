const express = require("express")
const router = express.Router();
const {getItems, getItem, getCity, createComment, createWebpage, deleteWebpage, uploadImage, updateWebpage, getCityAndActivity } = require("../controllers/webpage")
const {validatorGetItem, validatorCreateComment, validatorCreateWebpage, validatorUpdateWebpage, validatorGetCity, validatorGetCityAndActivity} = require("../validators/webpage")
const authMiddleware = require("../middleware/session")
const checkRol = require("../middleware/rol")
const uploadMiddleware = require("../utils/handleStorage")

router.get("/",authMiddleware, checkRol(["user", "admin"]), getItems)
router.get("/:id", validatorGetItem, getItem)
router.get("/:city/:scoring", authMiddleware, checkRol(["user", "admin"]), validatorGetCity, getCity)
router.get("/:city/:activity/:scoring", authMiddleware, checkRol(["user", "admin"]), validatorGetCityAndActivity, getCityAndActivity)

router.post("/", authMiddleware, checkRol(["commerce"]), validatorCreateWebpage, createWebpage)
router.post("/image", authMiddleware, checkRol(["commerce"]), uploadMiddleware.single("image"), uploadImage)
router.post("/comment/:id", authMiddleware, checkRol(["user"]), validatorCreateComment, createComment)

router.put("/:id", authMiddleware, checkRol(["commerce"]), validatorUpdateWebpage, updateWebpage)
router.delete("/:id", authMiddleware, checkRol(["commerce"]), validatorGetItem, deleteWebpage)

module.exports = router;