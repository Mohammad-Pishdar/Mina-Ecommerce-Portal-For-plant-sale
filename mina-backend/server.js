import express from "express";
//data.js is no longer needed
// import data from "./data.js";
import mongoose from "mongoose";
import userRouter from "./routers/userRouter.js";
import itemRouter from "./routers/itemRouter.js";
//importing dotenv package to be able to use it to read the contents inside our .env file
import dotenv from "dotenv";
import orderRouter from "./routers/orderRouter.js";

dotenv.config();

const app = express();
//parsing the body of http request. This middleware parses json data in the body of request so it could be recognized by services like postman when testing requests.
app.use(express.json());
// we also add this middleware too. Combined with the middleware above, all request that contains data like those sent by postman to test will be translated to req.body in our node application.
app.use(express.urlencoded({
    extended: true
}));

//connecting to mongoDB databse. By adding the name of your databse at the end of the URI of mongoDB you create a databse. Here we also make the URI dynamci instead a hard coded static one just like we did with our port down below 
mongoose.connect(process.env.MONGODB_URL || 'mongodb://localhost/minaPlantSale', {
    //having options as second parameters for mongoose.connect to get rid of duplicated warnings
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
})

app.get("/", (req, res) => {
    res.send("Server is ready");
});

//Now that we connected our database to our server.js file below, there is no need to use static data.js file to get the items data so we can cooment this out
// app.get("/api/items", (req, res) => {
//     res.send(data.items);
// });

//The same goes for this route. We don't this anymore either since we want to implement these routes using the routers we created so we comment this out too
// app.get("/api/items/:id", (req, res) => {
//     const item = data.items.find((item) => item._id === req.params.id);
//     if (item) {
//         res.send(item);
//     } else {
//         res.status(404).send({
//             message: "Item Not Found"
//         });
//     }
// });

//we use our userRouter here 
app.use('/api/users', userRouter);

//Now that we imported express async handler in our userRouter and wrapped the whole call back function of it inside that function we can use the following middleware as an error catcher
app.use((err, req, res, next) => {
    res.status(500).send({
        message: err.message
    });
})

app.use('/api/items', itemRouter);
app.use('/api/orders', orderRouter);

//adding an API to send PayPal ID to frontend
app.get('/api/config/paypal', (req, res) => {
    //send back PayPal client ID stored in our .env file. Sb here refers to word 'Sandbox'
    res.send(process.env.PAYPAL_CLIENT_ID || 'sb');
})

const port = process.env.PORT || 8000;
app.listen(port, () => {
    console.log(`Server is listening on http://localhost:${port}`);
});