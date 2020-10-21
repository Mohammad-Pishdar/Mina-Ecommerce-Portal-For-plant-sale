import mongoose from 'mongoose';

//defining item schema
const itemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    category: {
        type: String,
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
    rating: {
        type: Number,
        required: true
    },
    reviews: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    numberOfItemInInvetory: {
        type: Number,
        required: true
    },
}, {
    //enabling timestamps for item schema
    timestamps: true,
})

//creating item model based on the above Schema
const Item = mongoose.model("Item", itemSchema);

export default Item;