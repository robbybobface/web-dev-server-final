import mongoose from "mongoose";
import passportLocalMongoose from 'passport-local-mongoose';
import pkg from 'validator';

const { isEmail } = pkg;

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: [ isEmail, 'invalid email' ]
    },
}, { collection: 'users' });

UserSchema.plugin(passportLocalMongoose);

export default UserSchema;

