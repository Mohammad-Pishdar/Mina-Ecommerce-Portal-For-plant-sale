import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import data from '../data.js';
import Item from '../models/item.js';

const itemRouter = express.Router();

itemRouter.get('/seed', expressAsyncHandler(async (req, res) => {
    const createdItems = await Item.insertMany(data.items);
    res.send({
        createdItems
    });
}));

export default itemRouter;