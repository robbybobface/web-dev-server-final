import mongoose from "mongoose";
import userSchema from "./user-schema";

const trackSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    artist: [ {
        type: String,
        required: true,
    } ],
    trackId: {
        String,
        required: true,
    },
    likes: [ userSchema ]

}, { collection: 'tracks' });

export default trackSchema;

