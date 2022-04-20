import mongoose from 'mongoose';
import artistSchema from "../schemas/artist-schema.js";

const artistModel = mongoose.model('ArtistModel', artistSchema);

export default artistModel;
