import express from "express";
//data.js is no longer needed
// import data from "./data.js";
import mongoose from "mongoose";
import userRouter from "./routers/userRouter.js";
import itemRouter from "./routers/itemRouter.js";

const app = express();
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

const port = process.env.PORT || 8000;
app.listen(port, () => {
    console.log(`Server is listening on http://localhost:${port}`);
});