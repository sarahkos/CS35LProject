const Recipe = require('../models/recipe.js');

var router = require('express').Router();
const { ensureAuthenticated } = require('./auth');

router.post("/", ensureAuthenticated, async (req, res, next) => {

    try {            
        
        const {title, text} = req.body;

        const recipe = await Recipe.create({
            title,
            text,
            author: req.user._id,
        });

        return res.status(201).json({
            recipe,
            msg: "Recipe posted successfully.",
        });

    } catch (err) {
        return res.status(400).json({
            err
        })
    }

});

router.get("/:recipe_id", async (req, res, next) => {

    try {            
        const recipe = await Recipe.findById(req.params.recipe_id).populate("author");
        if (!recipe) {
            return res.status(404).json({
                err: "Recipe not found.",
            });
        }
        return res.status(200).json({
            recipe,
            msg: "Recipe retrieved successfully.",
        });

    } catch (err) {
        return res.status(400).json({
            err
        })
    }

});

module.exports = router;