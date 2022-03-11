const User = require('../models/user.js');
const Recipe = require('../models/recipe.js');

var router = require('express').Router();
const { ensureAuthenticated } = require('./auth');

router.get("/", async (req, res, next) => {

    var { page, limit, username } = req.query;
    page = page || 1;
    limit = limit || 10;

    var filters = {};

    if (username) {
        filters.username = {
            "$regex": username,
            "$options": "i",
        };
    }

    try {    
        const users = await User.find(filters)
            .skip((page - 1) * limit)
            .limit(limit)
            .populate("recipes");

        return res.status(200).json({
            users,
            msg: "Users retrieved successfully.",
        });

    } catch (err) {
        return res.status(400).json({
            err
        })
    }

});

router.get("/self", ensureAuthenticated, async (req, res, next) => {

    return res.status(200).json({
        user: req.user,
        msg: "User information retrieved.",
    });

});

router.get("/self/feed", ensureAuthenticated, async (req, res, next) => {

    try {

        var { page, limit } = req.query;
        page = page || 1;
        limit = limit || 10;

        const feed = await Recipe.find({
            author: {$in: req.user.following},
        })
        .sort({ date: "desc" })
        .skip((page - 1) * limit)
        .limit(limit)
        .populate("author");
        
        return res.status(200).json({
            feed,
            msg: "Feed retrieved successfully."
        });

    } catch (err) {
        console.log(err);
        return res.status(400).json({
            err
        })
    }

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

router.post("/:username/followers/follow", ensureAuthenticated, async (req, res, next) => {

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
        });
    }

});

router.post("/:username/followers/unfollow", ensureAuthenticated, async (req, res, next) => {

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