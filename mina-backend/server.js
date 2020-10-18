import express from "express";
import data from "./data.js";

const app = express();

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

const port = process.env.PORT || 8000;
app.listen(port, () => {
    console.log(`Server is listening on http://localhost:${port}`);
});