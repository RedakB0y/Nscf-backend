const express = require("express");
const router = express.Router();
const User = require("../models/user");
const bcrypt = require('bcrypt');
const verifyuser = require("../middleware/verifyUser");
const saltRounds = process.env.saltRounds;
const verify = require("../middleware/verify");


// update password
router.put("/updatePassword", async (req, res) => {
    const matchuser = await User.findOne({ email: req.body.email });

    if (matchuser) {
        const salt = parseInt(saltRounds);
        bcrypt.hash(req.body.password, salt, async (err, hash) => {
            if (err) {
                return res.status(500).json("hash error");
            }
            try {
                const { email } = req.body;
                const password = hash;
                await User.findOneAndUpdate({ email }, {
                    $set: { email, password }
                })
                return res.status(200).json("update successfully");

            } catch (error) {
                return res.status("password does not update");
            }
        })
    } else {
        return res.status(404).json("user not found");
    }

})

// get user 

router.get("/find/admin", verifyuser, async (req, res) => {
    try {
        const user = await User.findOne({ _id: req.body.user._id })
        res.status(200).json(user);
    } catch (error) {
        res.status(400).json("Error in get user api");
    }
})


// get name by user

router.get("/find/name/:name", async (req, res) => {
    try {
        const user = await User.findOne({ username: req.params.name })
        if (user) {
            res.status(200).json(user._id);
        } else {
            res.status(404).json("Enter a valid user name");
        }
    } catch (error) {
        res.status(400).json("Error in get name by user api");
    }
})


// get user by id

router.get("/find/user", verify, async (req, res) => {
    try {
        if (req.body.user) {
            res.status(200).json(req.body.user);
        }
    } catch (error) {
        res.status(400).json("Error in get user api");
    }
})


module.exports = router;