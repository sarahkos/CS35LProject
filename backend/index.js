const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const process = require('process');
const User = require('./models/user.js')
const Profile = require('./models/profile.js')
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

app.post("/login", async (req, res) => {
    try{
    const { username, password } = req.body;

    const user = await User.findOne({username});

    if(user && (await bcrypt.compare(password, user.password))){
        return res.status(200).json(user);
        }
    
    return res.status(400).send("Invalid Login");
    }

    finally{}
    });

app.listen(port, () => console.log(`Server running on port ${port}`));