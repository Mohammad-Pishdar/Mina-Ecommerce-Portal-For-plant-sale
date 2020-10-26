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

//creating a middleware to authenticate user
export const isAuthenticated = (req, res, next) => {
    //First we get the authorization field from the header of this request
    const authorization = req.headers.authorization;
    //if authorization field exists
    if (authorization) {
        //we get token from authorization by slicing it from the 7th index which ensures that it only takes the token part from the captured authorization field
        const token = authorization.slice(7, authorization.length);

        //Now it's time to use json wen token to decrypt the encrypted token. We use JWT's verify function to do that
        jwt.verify(token, process.env.JWT_SECRET || 'secureText', (err, decode) => {
            if (err) {
                res.status(401).send({
                    message: 'Invalid token'
                });
            } else {
                //since at this point the token is valid we fill req.user by decode which is the information for that specific user with that specific token created above when we used sign method of json web token to create that token(so its id, name, email and whether or not the user is an admin)
                req.user = decode;
                //now we pass this captured data about user to the next middleware
                next();
            }
        })

    }
    //we can also send an error if authorization does not exist in the header of this request
    else {
        res.status(401).send({
            message: 'There is no token'
        });
    }
};

//here is another middleware to make sure whatever the user is trying to access will only be available if the user is an admin
export const isAdmin = (req, res, next) => {
    if (req.user && req.user.isAdmin) {
      next();
    } else {
      res.status(401).send({ message: 'Invalid Admin Token' });
    }
  };