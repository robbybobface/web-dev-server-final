import mongoose from "mongoose";
import userSchema from "./user-schema.js";

const trackSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    artists: [ {
        type: String,
        required: true,
    } ],
    trackId: {
        type: String,
        required: true,
    },
    likes: [ userSchema ]

}, { collection: 'tracks' });

export default trackSchema;

