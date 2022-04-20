import mongoose from "mongoose";
import userSchema from "./user-schema.js";

const artistSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    artistId: {
        type: String,
        required: true
    },
    likes: [ userSchema ]

}, { collection: 'artists' });

export default artistSchema;
