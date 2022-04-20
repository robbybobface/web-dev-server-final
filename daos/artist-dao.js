import artistModel from "../models/artist-model.js";

export const findAllArtists = () => artistModel.find();
export const findArtistById = (artistId) => artistModel.findOne({ artistId: artistId });
export const createArtist = (artist) => artistModel.create(artist);
export const deleteArtist = (uid) => artistModel.deleteOne({ _id: uid });
export const updateArtist = (uid, artist) => artistModel.updateOne({ _id: uid }, { $set: artist });
