const jwt = require("jsonwebtoken")
const JWT_SECRET = process.env.JWT_SECRET
const getProperties = require("../utils/handlePropertiesEngine")
const propertiesKey = getProperties()

const tokenSign = (user) => {
    const sign = jwt.sign(
        {
            [propertiesKey.id]: user[propertiesKey.id],

            email: user.email
        },
        JWT_SECRET,
        {
            expiresIn: "2h"
        }
    )
    return sign
}

const verifyToken = (tokenJwt) => {
    try {
        return jwt.verify(tokenJwt, JWT_SECRET)
    }catch(err) {
        console.log(err)
    }
}

module.exports = { tokenSign, verifyToken }