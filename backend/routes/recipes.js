const User = require('../models/user.js');
const Recipe = require('../models/recipe.js');

var router = require('express').Router();
const { ensureAuthenticated } = require('./auth');

router.post("/", ensureAuthenticated, async (req, res, next) => {

    try {            
        
        const {title, text, ingredients} = req.body;

        const recipe = await Recipe.create({
            title,
            text,
            ingredients,
            author: req.user._id,
        });

        const recipes = await User.findByIdAndUpdate(req.user._id, {
            $addToSet: { recipes: recipe._id }
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

router.get("/", async (req, res, next) => {

    var { page, limit, title, ingredients } = req.query;
    page = page || 1;
    limit = limit || 10;

    var filters = {};

    if (title) {
        filters["$text"] = {
            $search: title,
        };
    }
    if (ingredients) {
        filters.ingredients = {
            $all: ingredients,
        };
    }

    try {    
        const recipes = await Recipe.find(filters).skip((page - 1) * limit).limit(limit);

        return res.status(200).json({
            recipes,
            msg: "Recipes retrieved successfully.",
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

router.post("/:recipe_id/like", ensureAuthenticated, async (req, res, next) => {

    try {            
        const recipe = await Recipe.findByIdAndUpdate(req.params.recipe_id, {
            $addToSet: { liked: req.user._id }
        });
        if (!recipe) {
            return res.status(404).json({
                err: "Recipe not found.",
            });
        }
        const user = await User.findByIdAndUpdate(req.user._id, {
            $addToSet: { liked: req.params.recipe_id }
        });
        return res.status(200).json({
            recipe,
            msg: "Recipe liked successfully.",
        });

    } catch (err) {
        return res.status(400).json({
            err
        })
    }

});

router.post("/:recipe_id/unlike", ensureAuthenticated, async (req, res, next) => {

    try {            
        const recipe = await Recipe.findByIdAndUpdate(req.params.recipe_id, {
            $pull: { liked: req.user._id }
        });
        if (!recipe) {
            return res.status(404).json({
                err: "Recipe not found.",
            });
        }
        const user = await User.findByIdAndUpdate(req.user._id, {
            $pull: { liked: req.params.recipe_id }
        });
        return res.status(200).json({
            recipe,
            msg: "Recipe unliked successfully.",
        });

    } catch (err) {
        return res.status(400).json({
            err
        })
    }

});

module.exports = router;