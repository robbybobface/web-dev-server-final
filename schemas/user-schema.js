import mongoose from "mongoose";
import passportLocalMongoose from 'passport-local-mongoose';
import pkg from 'validator';
import {
    likedAlbumSchema,
    likedArtistSchema,
    likedSongSchema
} from "./sub-schemas/likes-schema.js";

const { isEmail } = pkg;

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        validate: [ isEmail, 'invalid email' ]
    },
    admin: {
        type: Boolean,
        default: false
    },
    likedSongs: [ likedSongSchema ],
    likedAlbums: [ likedAlbumSchema ],
    likedArtists: [ likedArtistSchema ],
    likedGenres: [ String ],
    bio: {
        type: String
    }

}, { collection: 'users' });

userSchema.plugin(passportLocalMongoose);

export default userSchema;

