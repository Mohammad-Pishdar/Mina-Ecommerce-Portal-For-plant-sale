import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
    orderedItems: [{
        name: {
            type: String,
            required: true
        },
        quantity: {
            type: Number,
            required: true
        },
        image: {
            type: String,
            required: true
        },
        price: {
            type: Number,
            required: true
        },
        item: {
            // here we set the item ID from the Item collection, so we can use it as a refernce. It is used as what they call a link. In this way we link this field to item model we created seperately
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Item',
            required: true
        }
    }],
    shippingAddress: {
        fullName: {
            type: String,
            required: true
        },
        address: {
            type: String,
            required: true
        },
        city: {
            type: String,
            required: true
        },
        zipCode: {
            type: String,
            required: true
        },
        state: {
            type: String,
            required: true
        },
        country: {
            type: String,
            required: true
        },
    },
    paymentMethod: {
        type: String,
        required: true
    },
    subTotal: {
        type: Number,
        required: true
    },
    shippingCost: {
        type: Number,
        required: true
    },
    total: {
        type: Number,
        required: true
    },
    //again for the user we link it to the user model
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    //here we define the status of the order in our model (whether it's paid or not yet)
    isPaid: {
        type: Boolean,
        default: false
    },
    //if the order is paid then we also need to save the date of payment to our database
    paidAt: {
        type: Date
    },
    //here we add another field to check whether the order is delivered or not
    isDelivered: {
        type: Boolean,
        default: false
    },
    //and the delivery date if it's delivered 
    deliveredAt: {
        type: Date
    }
}, {
    //this parameter makes sure that dates of placement or updates for each order are saved to database
    timestamps: true
});

//creating order model based on the above Schema
const Order = mongoose.model("Order", orderSchema);

export default Order;