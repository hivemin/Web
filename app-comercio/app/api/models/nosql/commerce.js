const mongoose = require("mongoose")
const mongooseDelete =require("mongoose-delete")

const  CommerceSchema = new mongoose.Schema(
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
        password:{
            type:String
        },
        role:{
            type:String,
            values:["commerce"],
            default:"commerce"
        },
    },
    {
        timestamp: true,
        versionKey: false
    }
)
CommerceSchema.plugin(mongooseDelete, {overrideMethods: "all"})
module.exports = mongoose.model("commerce", CommerceSchema)