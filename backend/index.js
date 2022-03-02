const express = require('express');
const app = express();
const cors = require('cors');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');

const User = require('./models/user.js');
const Recipe = require('./models/recipe.js');

const process = require('process');
require('dotenv').config({ path: './config.env' });
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true });
const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB database connection established successfully");
});


var router = express.Router();

router.post('/users', async (req, res) => {
    
    const { username, password } = req.body;

    if (await User.findOne({ username })) {
        return res.status(409).send("username is taken.");
    }

    const encryptedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
        username,
        password: encryptedPassword,
    });

    res.status(201).json(user);

})

app.use('/api', router);

app.listen(port, () => console.log(`Server running on port ${port}`));
