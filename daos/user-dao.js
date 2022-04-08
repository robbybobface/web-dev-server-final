import User from "../models/user-model.js";

export const findAllUsers = () => User.find();
export const findUserByUsername = (username) => User.findOne({ username: username });
export const findUserByCredentials = (username, password) => User.find(
    { username: username, password: password });
export const createUser = (user) => User.create(user);
export const deleteUser = (uid) => User.deleteOne({ _id: uid });
export const updateUser = (uid, user) => User.updateOne({ _id: uid }, { $set: user });
