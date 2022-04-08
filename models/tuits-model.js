import mongoose from 'mongoose';
import tuitsSchema from '../schemas/tuits-schema.js';

const tuitsModel = mongoose
    .model('TuitModel', tuitsSchema);

export default tuitsModel;
