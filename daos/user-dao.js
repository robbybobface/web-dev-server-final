import userModel from "../models/user-model.js";

export const findAllUsers = () => userModel.find().sort({ admin: -1 });
export const findUserByUsername = (username) => userModel.findOne({ username: username });
export const findUserByEmail = (email) => userModel.findOne({ email: email });
export const findUserByCredentials = (username, password) => userModel.find(
    { username: username, password: password });
export const createUser = (user) => userModel.create(user);
export const deleteUser = (uid) => userModel.deleteOne({ _id: uid });
export const updateUser = (uid, user) => userModel.updateOne({ _id: uid }, { $set: user });
