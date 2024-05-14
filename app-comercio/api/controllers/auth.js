const { matchedData } = require("express-validator")
const { tokenSign } = require("../utils/handleJwt")
const { encrypt, compare } = require("../utils/handlePassword")
const {handleHttpError} = require("../utils/handleError")
const {usersModel, commerceModel} = require("../models")

const registerCtrl = async (req, res) => {
    try {
        req = matchedData(req)
        console.log(req.name)
        const password = await encrypt(req.password)
        const body = {...req, password} // Con "..." duplicamos el objeto y le añadimos o sobreescribimos una propiedad
        const dataUser = await usersModel.create(body)
        dataUser.set('password', undefined, { strict: false })
        const data = {
            token: await tokenSign(dataUser),
            user: dataUser
        }
        res.send(data)
    }catch(err) {
        console.log(err)
        handleHttpError(res, "ERROR_REGISTER_USER")
    }
}

const loginCtrl = async (req, res) => {
    try {
        req = matchedData(req);
        var user = await usersModel.findOne({ email: req.email });
        if (!user) {
            user = await commerceModel.findOne({ email: req.email });
            if (!user) {
                handleHttpError(res, "USER_NOT_EXISTS", 404);
                return;
            }
        }
        console.log("contraseña = ", user.password)
        console.log("contraseña2 = ", req.password)
        const hashPassword = user.password;
        console.log("contraseña3 = ", hashPassword)
        const check = await compare(req.password, hashPassword);
        if (!check) {
            handleHttpError(res, "INVALID_PASSWORD", 401);
            return;
        }
        user.set('password', undefined, {strict: false})
        console.log(user)
        const data = {
            token: await tokenSign(user.pass),
            user: user
        }
        res.send(data)
    }
    catch(err) {
        console.log(err)
        handleHttpError(res, "INVALID_PASSWORD", 401);
    }
}

module.exports = { registerCtrl, loginCtrl }
