import mongoose from 'mongoose';
import UserSchema from '../schemas/user-schema.js';

const UserModel = mongoose
    .model('User', UserSchema);

export default UserModel;
