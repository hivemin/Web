const jwt = require("jsonwebtoken")
require("dotenv").config()
const JWT_SECRET = process.env.JWT_SECRET
const getProperties = require("../utils/handlePropertiesEngine")
const propertiesKey = getProperties()

const tokenSign = (user, type) => {
    const sign = jwt.sign(
        {
            type: type,
            email: user.email,
            cif: user.cif ?? null,
            role: user.role
        },
        JWT_SECRET,
        {
            expiresIn: "2h"
        }
    )
    return sign
}

const verifyToken = async (tokenJwt) => {
    const JWT_SECRET = 'españa'
    try {
        return jwt.verify(tokenJwt, JWT_SECRET)
    } catch (err) {
        console.log(err)
    }
}

module.exports = {tokenSign, verifyToken}