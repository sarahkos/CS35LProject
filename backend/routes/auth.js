const bcrypt = require('bcrypt');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user.js');


passport.serializeUser((user, done) => {
    done(null, user._id);
});

passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
        done(err, user);
    });
});

passport.use(new LocalStrategy({}, async (username, password, done) => {
    try {
        const user = await User.findOne({username}).select("+password");

        if(user && (await bcrypt.compare(password, user.password))) {
            return done(null, user.toJSON());
        }

        return done(null, false);
    } catch (err) {
        return done(err, false);
    }
    
}));

var router = require('express').Router();

router.post('/', async (req, res) => {

    try {
    
        const { username, password } = req.body;

        const encryptedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            username,
            password: encryptedPassword,
        });

        return res.status(201).json({
            user: user.toJSON(),
            msg: "User created successfully."
        });

    } catch(err) {
        if (err.code === 11000) {
            return res.status(400).json({
                err: "Username is taken."
            })
        }
        return res.status(400).json({
            err
        });
    }

});

router.post("/login", async (req, res, next) => {
    
    passport.authenticate('local', (err, user) => {
        if (!user) {
            return res.status(400).json({ err: "Invalid login." });
        }
        req.logIn(user, (err) => {
            if (err) {
                return res.status(400).json({ err });
            }
            return res.status(200).json({
                user,
                msg: "User logged in successfully."
            })
        })
    })(req, res, next);
});

router.post("/logout", async (req, res, next) => {
    
    if (req.isAuthenticated()) {
        req.logout();
        return res.status(200).json({
            msg: "User logged out successfully.",
        });
    }
    else {
        return res.status(400).json({
            err: "No user is currently logged in.",
        });
    }

});

module.exports = {passport, router};