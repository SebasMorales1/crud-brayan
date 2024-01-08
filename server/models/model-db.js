const mongoose = require("mongoose")
const model = mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        }
    },
    {
        versionKey: false,
        timestamps: true

    }


)
module.exports = mongoose.model("model", model)