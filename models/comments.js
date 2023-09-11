const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema({
    userId: {
        type: String,
    },
    name:{
        type:String,
    },
    commentDisc: {
        type: String,
    }
});

const CommentModel = new mongoose.model("Comments", CommentSchema);
module.exports = CommentModel;