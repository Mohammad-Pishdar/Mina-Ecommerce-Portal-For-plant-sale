import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import data from '../data.js';
import User from '../models/user.js';


//we use express.router() to make our code modular instead of creating all the routes inside the server.js
const userRouter = express.Router();

//now we have to define a get method for our seeding API. We wrap the whole sync callback function inside an expressAsyncHandler fumction that comes from an npm pacage with the same name that needs to be installed and imported. We use this packeage to show potential errors for our routers to the users by adding code in our server.js file.
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

//and export user router
export default userRouter;