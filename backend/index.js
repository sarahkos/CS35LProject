const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const process = require('process');

const { passport, router: authRouter } = require('./routes/auth');
const usersRouter = require('./routes/users');
const recipesRouter = require('./routes/recipes');

require('dotenv').config({ path: './config.env' });
const port = process.env.PORT || 5000;
const frontendDomain = process.env.FRONTEND_DOMAIN || "http://localhost:3000";

app.use(cors({
    credentials: true,
    origin: frontendDomain,
}));
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
        maxAge: 1000 * 60 * 60 * 24,        //maxAge is one day
    },
    store: MongoStore.create({
        clientPromise
    })
}));

app.use(passport.initialize());
app.use(passport.session());

app.use('/api/users', authRouter);
app.use('/api/users', usersRouter);
app.use('/api/recipes', recipesRouter);

app.listen(port, () => console.log(`Server running on port ${port}`));
