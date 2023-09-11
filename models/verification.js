const mongoose = require("mongoose");

const verificationSchema = new mongoose.Schema({
    email: {
        type: String,
        require: true,
    },
    otp:{
        type:String,
        require:true,
    }
},
    { timestamps: true }
)
verificationSchema.index({ createdAt: 1 }, { expireAfterSeconds: 120 });
const verificationModel = new mongoose.model("verify", verificationSchema);
module.exports = verificationModel;