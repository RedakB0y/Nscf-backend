const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        require: true,
        unique: true,
    },
    username: {
        type: String,
        require: true,
        unique: true,
        min: 3,
        max: 20,
    },
    password: {
        type: String,
        require: true,
        min: 8,
    },
    profilePicture: {
        type: String,
    },
    desc: {
        type: String,
    },
    isAdmin: {
        type: Boolean,
    },
    country: {
        type: String,
    },
    state: {
        type: String,
    },
    city: {
        type: String,
    }
},
    { timestamps: true }
)

const userModel = new mongoose.model("user", userSchema);
module.exports = userModel;