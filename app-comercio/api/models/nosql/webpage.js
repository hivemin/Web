const mongoose = require("mongoose")
const mongooseDelete = require("mongoose-delete")

const WebpageScheme = new mongoose.Schema(
    {
        city: {
            type: String
        },
        acitvity: {
            type: String
        },
        title: {
            type: String
        },
        summary: {
            type: String
        },
        reviews: {
            type: String
        },
        image:{
            url: {
                type: String
            },
            filename: {
                type: String
            }
        },
        data: {
            Scoring: {
                type: Number,
                default: 0
            },
            numRatings: {
                type: Number,
                default: 0
            },
            reviews: {
                type: Array
            }
        },
    },
    {
        timestamp: true,
        versionKey: false
    }
)
//UserScheme.plugin(mongooseDelete, {overrideMethods: "all"})
module.exports = mongoose.model("webpage", WebpageScheme) // Nombre de la colección (o de la tabla en SQL)