const express = require("express");
const router = express.Router();
const Comment = require("../models/comments");
const User = require("../models/user");

// get all comments 
router.get("/", async (req, res) => {
    try {
        const comment = await Comment.find();

        const data = await Promise.all(
            comment.map((c) => {
                return User.findById(c.userId);
            })
        )
        var arrayOfObject = comment.map(function (value, index) {
            let final = {
                comment: value,
                user: data[index],
            };
            return final;
        });

        res.status(200).json(arrayOfObject);
    } catch (error) {
        res.status(400).json("Error in get all comments api");
    }
});


// get specific user comments 
router.get("/:id", async (req, res) => {
    try {
        const comment = await Comment.find({ userId: req.params.id });
        res.status(200).json(comment);
    } catch (error) {
        res.status(400).json("Error in get user comments api");
    }
})


// add comment

router.post("/add", async (req, res) => {
    try {
        const newComment = await new Comment(req.body);
        newComment.save();
        res.status(200).json("Comment Added successfully");
    } catch (error) {
        res.status(400).json("Error in add comment api");
    }
})

// update comment 
router.put("/update/:commentId", async (req, res) => {
    try {
        await Comment.findOneAndUpdate({ _id: req.params.commentId }, {
            $set: req.body
        })
        res.status(200).json("Comment update successfully");
    } catch (error) {
        res.status(400).json("Error in Comment update api");

    }
})

// delete comment 
router.delete("/delete/:commentId", async (req, res) => {
    try {
        await Comment.findOneAndDelete({ _id: req.params.commentId })
        res.status(200).json("Comment Delete successfully");
    } catch (error) {
        res.status(400).json("Error in delete comment api");
    }
})

module.exports = router;

