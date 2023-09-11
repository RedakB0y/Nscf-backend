const express = require("express");
const router = express.Router();
const User = require("../models/user");
const verification = require("../models/verification");
const bcrypt = require('bcrypt');
const saltRounds = process.env.saltRounds;
var jwt = require('jsonwebtoken');
const privateKey = process.env.privateKey;
const nodemailer = require("nodemailer");

// send otp
router.post("/sendOtp", async (req, res) => {
    // send mail
    try {
        const matchEmail = await User.findOne({ email: req.body.email });
        const foundOtp = await verification.findOne({ email: req.body.email })

        let transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            secure: false, // true for 465, false for other ports
            auth: {
                user: process.env.email,
                pass: process.env.password,
            },
            
        });

        var val = Math.floor(100000 + Math.random() * 900000);
        if (foundOtp) {
            await verification.findOneAndUpdate({ email: req.body.email }, { otp: val })
        } else {
            const newVerification = new verification({
                email: req.body.email,
                otp: val,
            })

            newVerification.save();
        }

        // send mail with defined transport object
        await transporter.sendMail({
            from: `"NSCF Email verification" ${process.env.email}`, // sender address
            to: req.body.email, // list of receivers
            subject: "Email verification", // Subject line
            text: "", // plain text body
            html: `<b> Hello !! <br> Thanks For Joining. <br> Verification code : ${val} </b>`, // html body
        });
        return res.status(200).json("otp send");

    } catch (error) {
        return res.status(500).json("OTP error");
    }
})

// signup user
router.post("/signUp", async (req, res) => {
    try {
        const otp = await verification.findOne({ email: req.body.email });
        if (otp.otp == req.body.otp) {
            const salt = parseInt(saltRounds);
            // match user
            const matchEmail = await User.findOne({ email: req.body.email });
            if (matchEmail) return res.status(409).json("email already used");
            const matchuser = await User.findOne({ username: req.body.username });
            if (matchuser) return res.status(409).json("username already found");


            // hash password
            bcrypt.hash(req.body.password, salt, async function (err, hash) {
                if (err) {
                    return res.status(500).json("hash error");
                }
                // new user 
                const newUser = new User({
                    email: req.body.email,
                    username: req.body.username,
                    password: hash,

                })

                // save user 
                await newUser.save();
                const user = await User.findOne({ email: req.body.email })
                // jwt token
                jwt.sign({ newUser }, privateKey, { algorithm: 'HS384' }, function (err, token) {
                    if (err) return res.status(500).json("error in jwt token" + err);
                    return res.status(200).json({
                        usertoken: "Bearer " + token,
                        userId: user._id,
                    });
                });
            });

        }
        else {
            return res.status(404).json("Invalid Otp");
        }

    } catch (error) {
        return res.status(500).json("error in signUp api" + error)
    }
})


// login user 
router.post("/login", async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email })
        if (!user) return res.status(404).json("user not found");

        bcrypt.compare(req.body.password, user.password, function (err, result) {
            if (err) return res.status(500).json("bcrypt error" + err)
            if (result) {

                jwt.sign({ user }, privateKey, { algorithm: 'HS384' }, function (err, token) {
                    if (err) return res.status(500).json("error in jwt token" + err);
                    return res.status(200).json({
                        usertoken: "Bearer " + token,
                        userId: user._id,
                    });
                });

            } else {
                return res.status(404).json("password Invalid");
            }
        });
    } catch (error) {
        res.status(500).json("error in login api" + error)
    }
})


module.exports = router;