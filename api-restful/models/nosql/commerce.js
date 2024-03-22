const mongoose = require("mongoose")
const mongooseDelete = require("mongoose-delete")

// Definimos un esquema para el modelo Commerce
const CommerceSchema = new mongoose.Schema(
    {
        name:{
            type: String
        },
        cif:{
            type:String,
            unique:true
        },
        address:{
            type:String
        },
        email:{
            type:String,
            unique: true
        },
        phone:{
            type:String
        },
        idPage:{
            type:Number
        }
    },
    {
        timestamp: true,
        versionKey: false
    }
)

CommerceSchema.plugin(mongooseDelete, {overrideMethods: "all"})
// Exporta el modelo Commerce creado a partir del esquema
module.exports = mongoose.model('Commerce', CommerceSchema)
