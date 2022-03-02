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

});

router.post("/users/login", async (req, res) => {

    const { username, password } = req.body;

    const user = await User.findOne({username});

    if(user && (await bcrypt.compare(password, user.password))){
        console.log("It worked!");
        return res.status(200).json(user);
    }
    
    return res.status(400).send("Invalid Login");
    

});


app.use('/api', router);

app.listen(port, () => console.log(`Server running on port ${port}`));
