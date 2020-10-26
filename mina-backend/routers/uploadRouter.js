import multer from 'multer';
import express from 'express';
import {
    isAuthenticated
} from '../utils.js';

const uploadRouter = express.Router();

//defining an storage for pics uploaded via multer. here we use a folder in this project to store images.
const storage = multer.diskStorage({
    destination(req, file, cb) {
        //The first parameter of the callback is null because it's a parameter for an error and there is no error here. The second pararmeter is the folder that we're going to save the files into.We have to create a folder named uploads in the root folder of this project. Since gitignore will ignore empty folders we place an empty text file into this folder to keep it in git repository.
        cb(null, 'uploads/');
    },
    filename(req, file, cb) {
        //we use date.now() to ensure that each time we uplaod a file we will have a unique file name
        cb(null, `${Date.now()}.jpg`);
    },
});

//defining uplaod middleware
const upload = multer({
    storage
});

uploadRouter.post('/', isAuthenticated, upload.single('image'), (req, res) => {
    res.send(`/${req.file.path}`);
});

export default uploadRouter;