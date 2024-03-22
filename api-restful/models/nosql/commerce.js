const mongoose = require("mongoose")
const mongooseDelete =require("mongoose-delete")

const  CommerceSchema = new mongoose.Schema(
    {
        name:{
            type: String
        },
        cif:{
            type:String
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
module.exports = mongoose.model("users", CommerceSchema)