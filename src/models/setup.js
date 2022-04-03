const { Schema, Types, model } = require("mongoose");

const setupSchema = new Schema({
    // Guild id
    id:
    {
        type: String
    },
    role: {
        type: String
    },
    statusmessage: {
        type: String
    },
}, { timestamps: true });

const setup = model("setup", setupSchema);


module.exports = setup;