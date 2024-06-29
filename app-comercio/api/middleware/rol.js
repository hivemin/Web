const { handleHttpError } = require("../utils/handleError")
const checkRol = (roles) => (req, res, next) => { // Doble argumento

    if(roles.includes(req.jwt.role)) {
        next()
    }else{
        handleHttpError(res, "ERROR_PERMISSIONS", 403)
    }
}
module.exports = checkRol

