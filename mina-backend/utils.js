//we have to import json web token so we can use it to generate a token
import jwt from "jsonwebtoken";

//we use this file to define our utility (helper) functions
//We first create our generateToken function which is used to send back a unique token when authenticating users in our sign in route defined in user router file
export const generateToken = (user) => {
    //jwt stands for jason web token and we use the sign method of it to generate a token. The first parameter here is the object we're going to use to generate a token.
    return jwt.sign({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin
        },
        //second parameter is json web token secret which acts like a key to encrypt our data and generate a token. Since it is very sensitive data we don't put it directly here for security reasons and instead use a .env file to keep this in a secure place away from the user. Here we also set an alternative text for JWT_SECRET if it does not exist in .env. We just add it here so in case we wanted to have the source code copied somewhere else we won't get an error because of not having the .env file in our root folder.
        process.env.JWT_SECRET || 'secureText',
        //the last paramete of sign function is options. Here we put an expirey date for this token to 30 days
        {
            expiresIn: '30d',
        }
    );
};