import albumModel from "../models/album-model.js";

export const findAllAlbums = () => albumModel.find();
export const findAlbumById = (albumId) => albumModel.findOne({ albumId: albumId });
export const createAlbum = (album) => albumModel.create(album);
export const deleteAlbum = (uid) => albumModel.deleteOne({ _id: uid });
export const updateAlbum = (uid, album) => albumModel.updateOne({ _id: uid }, { $set: album });
