const mongooseDelete = require("mongoose-delete")
const mongoose = require("mongoose")

const webPageSchema = new mongoose.Schema(
    {
        title: {
            type: String,
        },
        user: {
            type: Array,
            mail: String
        },
        city: {
            type: String,
        },
        activity: {
            type: String,
        }
        ,
        summary: {
            type: String,
        },
        review: {
            type: String,
        },
        scoring: {
            type: Number,
            default: 0
        },
        image: {
            url: {
                type: String
            },
            filename: {
                type: String
            }
        },
        comments: {
            type: Array,
            Schema: {
                text: String,
                score: Number,
                email_user:String
            },
            default: []
        },
        cif: {
            type: String
        }
    },
    {
        timestamps: false
    }
)


webPageSchema.plugin(mongooseDelete, { overrideMethods: "all" })
module.exports = mongoose.model("webpage", webPageSchema)