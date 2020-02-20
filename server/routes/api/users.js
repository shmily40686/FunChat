const express = require("express");
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require("./../../model/User");
const jwt = require('jsonwebtoken');
const secretOrKey = process.env.SECRET_OR_KEY || require('../../config/keys').secretOrKey;
const passport = require('passport');
const validateRegisterInput = require('../../validation/register');
const validateLoginInput = require('../../validation/login');
const mongoose = require('mongoose');



router.get("/test", (req, res) => res.json({ msg: "This is the users route" }));

router.get('/:user_id', async (req, res) => {
    // Get user.
    const user = await User.findById(req.params.user_id)
    // Set the array of id's to search for.
    const contacts = user && user.contacts ? user.contacts : [];
    // Query mongodb for all users that have an id in contacts.
    user.contacts = await User.find({
        '_id': {
            $in: contacts
        }
    });

    res.status(200).json(user);
})


router.get('/:languages',async (req,res) => {
    const users = await users.find({
        languages: req.params.languages
    })
    res.status(200).json(users);
})



router.post('/register', async (req, res) => {
    const { errors, isValid } = validateRegisterInput(req.body);
    console.log(errors);
    if (!isValid) {
        return res.status(400).json(errors);
    }

    // Check to make sure nobody has already registered with a duplicate email
    const existingUser = await User.findOne({ email: req.body.email });
    if (existingUser) {
        // Throw a 400 error if the email address already exists
        return res.status(400).json({ email: "A user has already registered with this address" })
    }

    // Otherwise create a new user
    const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        languages: [],
        contacts: []
    })

    const salt = await bcrypt.genSalt(10);
    const passwordDigest = await bcrypt.hash(newUser.password, salt);

    newUser.password = passwordDigest;
    const userCreated = await newUser.save();

    const oneHour = 3600;
    const payload = { id: userCreated.id, name: userCreated.name };
    const token = await jwt.sign(payload, secretOrKey, { expiresIn: oneHour });

    res.status(200).json({ success: true, token: 'Bearer ' + token });
})


router.post('/login', async (req, res) => {
    const { errors, isValid } = validateLoginInput(req.body);

    if (!isValid) {
        return res.status(400).json(errors);
    }

    const email = req.body.email;
    const password = req.body.password;

    User.findOne({ email })
        .then(user => {
            if (!user) {
                return res.status(404).json({ email: 'This user does not exist' });
            }

            bcrypt.compare(password, user.password)
                .then(isMatch => {
                    if (isMatch) {
                        const payload = { id: user.id, name: user.name };

                        jwt.sign(
                            payload,
                            secretOrKey,
                            // Tell the key to expire in one hour
                            { expiresIn: 3600 },
                            (err, token) => {
                                res.json({
                                    success: true,
                                    token: 'Bearer ' + token
                                });
                            });
                    } else {
                        res.status(400).json({ password: 'Incorrect password' });
                        return;
                    }
                })
        })
})

module.exports = router;