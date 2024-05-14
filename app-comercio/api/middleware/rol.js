const { handleHttpError } = require("../utils/handleError")
const checkRol = (roles) => (req, res, next) => { // Doble argumento
    try{
        const {user} = req
        const userRol = user.role
        conosle.log(userRol)
        const checkValueRol = roles.includes(userRol) //Comprobamos que el rol del usuario esté en roles
        if (!checkValueRol) {
            handleHttpError(res, "NOT_ALLOWED", 403)
            return
        }
        next()
    }catch(err){
        handleHttpError(res, "ERROR_PERMISSIONS", 403)
    }
}
module.exports = checkRol
//Importa y añade este middleware a la ruta POST de tracks.js pasándole la lista de roles aceptados, en este caso solo “admin”

