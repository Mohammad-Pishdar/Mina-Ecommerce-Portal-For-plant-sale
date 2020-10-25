import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import Order from '../models/order.js';
import {
    isAuthenticated
} from '../utils.js';

const orderRouter = express.Router();

//creating an API to post requests for registering an order in databse to /api/orders. Here we include isAuthenticated as a middleware we later defined in our utils.js to fill req.user with user information
orderRouter.post('/', isAuthenticated, expressAsyncHandler(async (req, res) => {
    //first we check if orderedItems contains items or not
    if (req.body.orderedItems.length === 0) {
        //if there is nothing inside the ordered items we send back a 400 error because it's a clinet or validation error
        res.status(400).send({
            message: 'Your shopping cart is empty'
        });
    } else {
        //we craete an order
        const order = new Order({
            orderedItems: req.body.orderedItems,
            shippingAddress: req.body.shippingAddress,
            paymentMethod: req.body.paymentMethod,
            subTotal: req.body.subTotal,
            shippingCost: req.body.shippingCost,
            total: req.body.total,
            //here we also need to include the iformation about the user who created this order but at this point we don't have access to that inforation so we have to create a middelware in our utils.js file. We use _id here because we only need the id of this user in our Order model
            user: req.user._id,
        });
        //and we save this order to the database
        const createdOrder = await order.save();
        //we send a message to indicate that order was successfully added to the database and we pass the created order to the frontend
        res.status(201).send({
            message: 'Order created',
            order: createdOrder
        });
    }
}));

//now we need to add a new route for the authenticated user to be able to see the order details page
orderRouter.get('/:id', isAuthenticated, expressAsyncHandler(async (req, res) => {
    //we get the order from our database
    const order = await Order.findById(req.params.id);
    //checking to see if such order exists
    if (order) {
        //if it exists we just send it back
        res.send(order);
    } else {
        //otherwise we send an error 
        res.status(404).send({
            message: 'Order not found'
        });
    }
}));

export default orderRouter;