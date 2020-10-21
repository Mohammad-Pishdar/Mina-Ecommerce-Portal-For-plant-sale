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

//creating another API to send back the data for the item details page. The placement of APIs in this file is also important and this one should always come after the /seed API otherwise /seed will be treated as an id for this API which is unwanted behaviour
itemRouter.get('/:id', expressAsyncHandler(async (req, res) => {
    const item = await Item.findById(req.params.id);
    if (item) {
        res.send(item);
    } else {
        res.status(404).send({
            message: 'Item not found'
        });
    }
}));

export default itemRouter;