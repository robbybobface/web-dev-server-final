import mongoose from "mongoose";
import userSchema from "./user-schema";

const artistSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    likes: [ userSchema ]

}, { collection: 'artists' });

export default artistSchema;
