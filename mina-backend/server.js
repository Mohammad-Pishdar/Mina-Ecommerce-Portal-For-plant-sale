import express from "express";
import data from "./data.js";
import mongoose from "mongoose";
import userRouter from "./routers/userRouter.js";

const app = express();
//connecting to mongoDB databse. By adding the name of your databse at the end of the URI of mongoDB you create a databse 
mongoose.connect('mongodb://localhost/minaPlantSale', {
    //having options as second parameters for mongoose.connect to get rid of duplicated warnings
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
})

app.get("/", (req, res) => {
    res.send("Server is ready");
});

app.get("/api/items", (req, res) => {
    res.send(data.items);
});

app.get("/api/items/:id", (req, res) => {
    const item = data.items.find((item) => item._id === req.params.id);
    if (item) {
        res.send(item);
    } else {
        res.status(404).send({
            message: "Item Not Found"
        });
    }
});

//we use our userRouter here 
app.use('/api/users', userRouter);

//Now that we imported express async handler in our userRouter and wrapped the whole call back function of it inside that function we can use the following middleware as an error catcher
app.use((err, req, res, next) => {
    res.status(500).send({
        message: err.message
    });
})

const port = process.env.PORT || 8000;
app.listen(port, () => {
    console.log(`Server is listening on http://localhost:${port}`);
});