const express = require('express');
const app = express();
const cors = require('cors');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const process = require('process');

const User = require('./models/user.js');
const Recipe = require('./models/recipe.js');

require('dotenv').config({ path: './config.env' });
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const uri = process.env.ATLAS_URI;
const clientPromise = mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((m) => {
        console.log("Connected to MongoDB");
        return m.connection.getClient();
    });


app.use(session({
    secret: 'test',
    resave: false,
    saveUninitialized: true,
    cookie: { 
        secure: true,
        maxAge: 1000 * 60 * 60 * 24,
    },
    store: MongoStore.create({
        clientPromise
    })
}));

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
        const user = await User.findOne({username});

        if(user && (await bcrypt.compare(password, user.password))) {
            return done(null, user);
        }

        return done(null, false);
    } catch (err) {
        return done(err, false);
    }
    
}));

app.use(passport.initialize());
app.use(passport.session());

var router = express.Router();

router.post('/users', async (req, res) => {

    try {
    
        const { username, password } = req.body;

        const encryptedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            username,
            password: encryptedPassword,
        });

        return res.status(201).json({
            user: {
                id: user._id,
                username: user.username,
            },
            msg: "User created successfully."
        });

    } catch(err) {
        return res.status(400).json({
            err
        });
    }

});

router.post("/users/login", async (req, res, next) => {
    
    passport.authenticate('local', (err, user) => {
        if (!user) {
            return res.status(400).json({ err: "Invalid login." });
        }
        req.logIn(user, (err) => {
            if (err) {
                return res.status(400).json({ err });
            }
            return res.status(200).json({
                user: {
                    id: user._id,
                    username: user.username,
                },
                msg: "User logged in successfully."
            })
        })
    })(req, res, next);

});

app.use('/api', router);

app.listen(port, () => console.log(`Server running on port ${port}`));
