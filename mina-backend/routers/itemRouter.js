import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import data from '../data.js';
import Item from '../models/item.js';

const itemRouter = express.Router();

itemRouter.get('/seed', expressAsyncHandler(async (req, res) => {
    //this ensures all the items will be removed before seeding the database with new items
    // await Item.remove({});
    const createdItems = await Item.insertMany(data.items);
    res.send({
        createdItems
    });
}));

//creating an API to send the list of items to frontend. Note that the / we use here for the URL parameter of the get method will be added to the end of /api/items since we define it here in item router.
itemRouter.get('/', expressAsyncHandler(async (req, res) => {
    //getting the list of items. Using an empty object ensures that it finds all the items.
    const items = await Item.find({});
    res.send(items);
}));

export default itemRouter;