import mongoose from 'mongoose';
import albumSchema from '../schemas/album-schema.js'

const albumModel = mongoose.model('AlbumModel', albumSchema);

export default albumModel;
