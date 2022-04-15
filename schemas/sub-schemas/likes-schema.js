import mongoose from "mongoose";

export const likedSongSchema = new mongoose.Schema({
    songId: {
        type: String
    }
});

export const likedAlbumSchema = new mongoose.Schema({
    albumId: {
        type: String
    }
});

export const likedArtistSchema = new mongoose.Schema({
    artistId: {
        type: String
    }
});


