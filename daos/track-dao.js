import trackModel from "../models/track-model.js";

export const findAllTracks = () => trackModel.find();
export const findTrackById = (trackId) => trackModel.findOne({ trackId: trackId });
export const createTrack = (track) => trackModel.create(track);
export const deleteTrack = (uid) => trackModel.deleteOne({ _id: uid });
export const updateTrack = (uid, track) => trackModel.updateOne({ _id: uid }, { $set: track });
