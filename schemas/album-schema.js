import mongoose from "mongoose";
import userSchema from "./user-schema.js";

const albumSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    artist: [ {
        type: String,
        required: true,
    } ],
    albumId: {
        type: String,
        required: true,
    },
    likes: [ userSchema ]

}, { collection: 'albums' });

export default albumSchema;

