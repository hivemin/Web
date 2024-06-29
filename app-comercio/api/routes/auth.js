const express = require("express")
const { registerCtrl, loginCtrl } = require("../controllers/auth")
const { validatorRegister, validatorLogin } = require("../validators/auth")
const router = express.Router()

router.get("/login", validatorLogin, loginCtrl)
router.post("/register", validatorRegister, registerCtrl)

module.exports = router
