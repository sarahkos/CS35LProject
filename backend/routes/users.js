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

router.get("/:username/followers", async (req, res, next) => {

    try {            
        const user = await User.findOne({ username: req.params.username }).populate("followers");
        if (!user) {
            return res.status(404).json({
                err: "User not found.",
            });
        }
        return res.status(200).json({
            followers: user.followers,
            msg: "Followers retrieved successfully.",
        });

    } catch (err) {
        return res.status(400).json({
            err
        })
    }

});

router.post("/:username/followers/follow", async (req, res, next) => {

    try {            
        const user = await User.findOneAndUpdate({ username: req.params.username }, {
            $addToSet: { followers: req.user._id }
        }, { new: true }).populate("followers");
        if (!user) {
            return res.status(404).json({
                err: "User not found.",
            });
        }
        const self = await User.findByIdAndUpdate(req.user._id, {
            $addToSet: { following: user._id }
        }, { new: true }).populate("following");
        return res.status(201).json({
            following: self.following,
            followers: user.followers,
            msg: "Followed successfully.",
        });

    } catch (err) {
        return res.status(400).json({
            err
        })
    }

});

router.post("/:username/followers/unfollow", async (req, res, next) => {

    try {            
        const user = await User.findOneAndUpdate({ username: req.params.username }, {
            $pull: { followers: req.user._id }
        }, { new: true }).populate("followers");
        if (!user) {
            return res.status(404).json({
                err: "User not found.",
            });
        }
        const self = await User.findByIdAndUpdate(req.user._id, {
            $pull: { following: user._id }
        }, { new: true }).populate("following");
        return res.status(201).json({
            following: self.following,
            followers: user.followers,
            msg: "Unfollowed successfully.",
        });

    } catch (err) {
        return res.status(400).json({
            err
        })
    }

});

module.exports = router;