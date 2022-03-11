# The Recipe

*A social media platform for sharing and finding recipes*

## Features

+ Users can create an account with a bio
+ Users can upload recipes with a description, ingredients, and an image
+ Users can search for recipes containing some text and can find recipes that contain certain ingredients
+ Users can like recipes and leave comments
+ Users can follow other users
+ The home feed will contain the most recent recipes from followed users

## Installation

### Backend

1. Navigate to the `backend` directory: `cd backend`
2. Install required packages: `npm i`
3. Create the file `config.env` with the line: 
   
   `ATLAS_URI=<mongodb uri>` 
   
   where `<mongodb uri>` is the URI for your MongoDB Database.

   The default domain for the frontend is `http://localhost:3000`. If you are using a different port, add the following line to `config.env`:

   `FRONTEND_DOMAIN=<frontend domain>`
4. Start the server: `npm run start`

### Frontend

1. Navigate to the `web-app` directory: `cd web-app`
2. Install required packages: `npm i`
3. Create the file `config.env` with the line:

    `REACT_APP_SERVER_URL=<server address>`

    By default, this should be `http://localhost:5000`.
4. Run the frontend: `npm start`