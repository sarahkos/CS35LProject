const User = require('../models/user.js');

var router = require('express').Router();

router.get("/self", async (req, res, next) => {

    try {            
        if (req.isAuthenticated()) {
            return res.status(200).json({
                user: req.user,
                msg: "User information retrieved.",
            });
        }
        else {
            return res.status(400).json({
                err: "No user is currently logged in.",
            });
        }

    } catch (err) {
        return res.status(400).json({
            err
        })
    }

});

router.post("/self/bio", async (req, res, next) => {

    try {            
        if (req.isAuthenticated()) {
            await User.updateOne({ _id: req.user._id }, { bio: req.body.bio });
            return res.status(201).json({
                msg: "User bio updated successfully.",
            });
        }
        else {
            return res.status(400).json({
                err: "No user is currently logged in.",
            });
        }

    } catch (err) {
        return res.status(400).json({
            err
        })
    }

});

module.exports = router;