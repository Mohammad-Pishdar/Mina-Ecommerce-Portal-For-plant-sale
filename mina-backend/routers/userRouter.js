import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import data from '../data.js';
import User from '../models/user.js';
//we have to import bcryptjs so the authentication process works
import bcrypt from 'bcryptjs';
import {
    generateToken,
    isAuthenticated
} from '../utils.js';


//we use express.router() to make our code modular instead of creating all the routes inside the server.js
const userRouter = express.Router();

//now we have to define a get method for our seeding API. We wrap the whole sync callback function inside an expressAsyncHandler fumction that comes from a npm pacage with the same name that needs to be installed and imported. We use this packeage to show potential errors for our routers to the users by adding code in our server.js file.
userRouter.get(
    '/seed',
    expressAsyncHandler(async (req, res) => {
        //this ensures all the users will be removed before seeding the database with new users
        // await User.remove({});
        //after creating sample users we can now retrive them using this get method and isnert all of them in our data or seeder file into the users collection in MongoDB at the same time
        const createdUsers = await User.insertMany(data.users);
        //after adding the users we send back the newly created users
        res.send({
            createdUsers
        });
    })
);

//creating a signin router. Since we need to create a token when we send back sign in data to autenticate user we use the post method for this route. You cannot type this route in your browser and access it since it's a post route so we will need to use services like Postman to test it out. 
userRouter.post('/signin', expressAsyncHandler(async (req, res) => {
    //sending an ajax request to check the user's email in the database. req.body.email is used to get the email inside the body of this ajax request and compare it with the emails in the database.
    const user = await User.findOne({
        email: req.body.email
    });
    if (user) {
        //if we already have a user with this email check to see whether the password typed is correct or not. To do this we use a bcrypt package method called compareSync. req.body.password signifies the user's entered password. user.password refers to the hashed password in the databse used to compare with the entered password.
        if (bcrypt.compareSync(req.body.password, user.password)) {
            //sending back some user data 
            res.send({
                _id: user._id,
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin,
                //we also send back a token that will be used to autenticate the user. This token will be generated by json web token. 
                token: generateToken(user)
            });
            return;
        }
    }
    res.status(401).send({
        message: 'Invalid email address or password'
    });

}));

//creating a new user route to register new users. Again since we want to create new users in our database we should use a post method here.
userRouter.post('/signup', expressAsyncHandler(async (req, res) => {
    //we create a new user here and use whatever user enters into the input boxes in frontend for all the info needed to create a new user based on user model
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        // for the password it's a bit tricky since we don't want to save the plain text password into our database and we have to convert it to the hashed password. So we use bcrypt package to do so.
        password: bcrypt.hashSync(req.body.password, 8),
    });
    //Now we save the newly created user in our database
    const newlyCreatedUser = await user.save();
    //And finally we send back the data related to the newly created user
    res.send({
        _id: newlyCreatedUser._id,
        name: newlyCreatedUser.name,
        email: newlyCreatedUser.email,
        isAdmin: newlyCreatedUser.isAdmin,
        //we also send back a token that will be used to autenticate the user. This token will be generated by json web token. 
        token: generateToken(newlyCreatedUser),
    });
}));

//definig  a route to get user details to be shown in user profile
userRouter.get(
    '/:id',
    expressAsyncHandler(async (req, res) => {
        const user = await User.findById(req.params.id);
        if (user) {
            res.send(user);
        } else {
            res.status(404).send({
                message: 'User Not Found'
            });
        }
    })
);

userRouter.put(
    '/profile',
    isAuthenticated,
    expressAsyncHandler(async (req, res) => {
        const user = await User.findById(req.user._id);
        if (user) {
            //the second case is for when the user sends an mepty string as a name in which case we use the name we already have in databse. The same goes for email.
            user.name = req.body.name || user.name;
            user.email = req.body.email || user.email;
            if (req.body.password) {
                //in case user also changed the password the new password should be encrypted
                user.password = bcrypt.hashSync(req.body.password, 8);
            }
            const updatedUser = await user.save();
            res.send({
                _id: updatedUser._id,
                name: updatedUser.name,
                email: updatedUser.email,
                isAdmin: updatedUser.isAdmin,
                token: generateToken(updatedUser),
            });
        }
    })
);


//and export user router
export default userRouter;