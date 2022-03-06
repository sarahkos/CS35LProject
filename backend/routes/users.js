const User = require('../models/user.js');

var router = require('express').Router();
const { ensureAuthenticated } = require('./auth');

router.get("/self", ensureAuthenticated, async (req, res, next) => {

    return res.status(200).json({
        user: req.user,
        msg: "User information retrieved.",
    });

});

router.post("/self/bio", ensureAuthenticated, async (req, res, next) => {

    try {            
        await User.updateOne({ _id: req.user._id }, { bio: req.body.bio });
        return res.status(201).json({
            msg: "User bio updated successfully.",
        });

    } catch (err) {
        return res.status(400).json({
            err
        })
    }

});

module.exports = router;