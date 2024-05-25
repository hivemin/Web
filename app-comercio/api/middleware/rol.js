const { handleHttpError } = require("../utils/handleError")
const checkRol = (roles) => (req, res, next) => { // Doble argumento
    try{
        console.log(req)
        const {user} = req
        const userRol = user.role
        console.log(userRol)
        console.log(roles)
        const checkValueRol = roles.includes(userRol) //Comprobamos que el rol del usuario esté en roles
        console.log(checkValueRol)

        if (!checkValueRol) {
            handleHttpError(res, "NOT_ALLOWED", 403)
            return
        }
        next()
    }catch(err){
        console.log(err)
        handleHttpError(res, "ERROR_PERMISSIONS", 403)
    }
}
module.exports = checkRol

