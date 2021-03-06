const User = require('../models/user.js');
const Recipe = require('../models/recipe.js');


var router = require('express').Router();
const { ensureAuthenticated } = require('./auth');

const { v4: uuidv4 } = require('uuid');

const path = require('path');
const multer = require('multer');
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../../web-app/public/images/'));
    },
    filename: (req, file, cb) => {
        cb(null, uuidv4() + path.extname(file.originalname));
    }
});
const image_upload = multer({ storage });

router.post("/", ensureAuthenticated, async (req, res, next) => {

    try {            
        const {title, text, ingredients} = req.body;

        const recipe = await Recipe.create({
            title,
            text,
            ingredients,
            author: req.user._id,
        });
        
        await User.findByIdAndUpdate(req.user._id, {
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

async function verifyAuthor(req, res, next) {
    try {            
        const recipe = await Recipe.findById(req.params.recipe_id);
        if (!recipe.author.equals(req.user._id)) {
            return res.status(401).json({
                err: "Not the author of this recipe.",
            });
        }
        next();

    } catch (err) {
        return res.status(400).json({
            err
        });
    }
}

router.post("/:recipe_id/image", ensureAuthenticated, verifyAuthor, image_upload.single('image'), async (req, res, next) => {

    try {            
        const recipe = await Recipe.findByIdAndUpdate(req.params.recipe_id, {
            image: req.file.filename,
        }, {new: true});
        return res.status(201).json({
            recipe,
            msg: "Image uploaded successfully."
        });
    } catch (err) {
        return res.status(400).json({
            err
        });
    }

});

router.get("/:recipe_id/image", async (req, res, next) => {

    try {            
        const recipe = await Recipe.findById(req.params.recipe_id);
        const filename = path.join(__dirname, '../images/', recipe.image);
        return res.status(201).sendFile(filename);
    } catch (err) {
        return res.status(400).json({
            err
        });
    }

});

router.get("/", async (req, res, next) => {

    var { page, limit, text, ingredients} = req.query;
    page = page || 1;
    limit = limit || 10;

    var filters = {};

    if (text) {
        filters["$text"] = {
            $search: text,
        };
    }
    if (ingredients) {
        filters.ingredients = {
            $all: ingredients,
        };
    }

    try {    
        const recipes = await Recipe.find(filters)
            .skip((page - 1) * limit)
            .limit(limit)
            .populate("author");

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
        return res.status(201).json({
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
        return res.status(201).json({
            recipe,
            msg: "Recipe unliked successfully.",
        });

    } catch (err) {
        return res.status(400).json({
            err
        })
    }

});

router.get("/:recipe_id/comments", async (req, res, next) => {

    try {            
        const recipe = await Recipe.findById(req.params.recipe_id).populate("comments.author");
        return res.status(200).json({
            comments: recipe.comments,
            msg: "Comments retrieved successfully.",
        });

    } catch (err) {
        return res.status(400).json({
            err
        })
    }

});

router.post("/:recipe_id/comments", ensureAuthenticated, async (req, res, next) => {

    try {
        const { comment } = req.body;

        const recipe = await Recipe.findByIdAndUpdate(req.params.recipe_id, {
            $push: {
                comments: {
                    author: req.user._id,
                    text: comment,
                }
            }
        }, { new: true }).populate("comments.author");
        return res.status(200).json({
            comments: recipe.comments,
            msg: "Comment posted successfully.",
        });

    } catch (err) {
        return res.status(400).json({
            err
        })
    }

});


module.exports = router;