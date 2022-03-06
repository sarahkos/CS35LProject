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

router.get("/:username", async (req, res, next) => {

    try {            
        const user = await User.findOne({ username: req.params.username }).populate("recipes");
        if (!user) {
            return res.status(404).json({
                err: "User not found.",
            });
        }
        return res.status(200).json({
            user,
            msg: "User retrieved successfully.",
        });

    } catch (err) {
        return res.status(400).json({
            err
        })
    }

});

module.exports = router;