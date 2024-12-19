const { handleHttpError } = require("../utils/handleError")
const { verifyToken } = require("../utils/handleJwt")
const  usersModel  = require("../models/nosql/user")
const  commerceModel  = require("../models/nosql/commerce")
const getProperties = require("../utils/handlePropertiesEngine")
const propertiesKey = getProperties()


const authMiddleware = async (req, res, next) => {
    try{
        if (!req.headers.authorization) {
            handleHttpError(res, "NOT_TOKEN", 401)
            return
        }

        const token = req.headers.authorization.split(' ').pop()
        const dataToken = await verifyToken(token)

        if(!dataToken){
            handleHttpError(res, "NOT_PAYLOAD_DATA", 401)
            return
        }

        const user = await usersModel.findOne({
            email: dataToken.email
        })

        req.user = user
        req.jwt = dataToken
        // console.log(user)
        if(!user){

            const user = await commerceModel.findOne({
                email: dataToken.email
            })
            req.user = user
            if(!user){
                handleHttpError(res, "USER_NOT_EXIST", 401)
                return
            }
        }
        //console.log(user)
        next()

    }catch(err){
        console.log(err)
        handleHttpError(res, "NOT_SESSION", 401)
        return
    }
}
module.exports = authMiddleware