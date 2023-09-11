const mongoose = require("mongoose");

const featureSchema = new mongoose.Schema({
    title: {
        type: String,
    },
    disc: {
        type: String,
    }
},
    { timestamps: true }
);

const featureModel = new mongoose.model("Features", featureSchema);

module.exports = featureModel;