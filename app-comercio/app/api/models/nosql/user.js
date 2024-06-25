const mongoose = require("mongoose")
const mongooseDelete = require("mongoose-delete")

const UserScheme = new mongoose.Schema(
    {
        name: {
            type: String
        },
        email: {
            type: String,
        },
        password:{
            type: String,
        },
        age: {
            type: Number
        },
        city: {
            type : String
        },
        interests: {
            type: String
        },
        recOffers: {
            type: Boolean
        },
        role:{
            type: String,
            enum: ["user", "admin"],
            default: "user"
        }
    },
    {
        timestamp: true,
        versionKey: false
    }
)
//UserScheme.plugin(mongooseDelete, {overrideMethods: "all"})
module.exports = mongoose.model("users", UserScheme) // Nombre de la colección (o de la tabla en SQL)