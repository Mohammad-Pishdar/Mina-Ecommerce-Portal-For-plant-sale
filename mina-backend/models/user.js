import mongoose from 'mongoose';

//creating a user schema 
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    isAdmin: {
        type: Boolean,
        default: false,
        required: true
    }
}, {
    //this will add two fields next to each user in database called createdAt and updatedAt
    timestamps: true
});

//now we can create a user model
const User = mongoose.model("User", userSchema);
//and export it 
export default User;