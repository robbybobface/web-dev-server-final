import * as trackDao from "../../daos/track-dao.js";

const findTrackById = async (req, res) => {
    const trackId = req.params.trackId;
    // console.log(trackId);
    const track = await trackDao.findTrackById(trackId);
    // console.log('The track is ' + track);
    if (!track) {
        res.send({ error: "There is no track with this id" });
    } else {
        res.json(track);
    }
};

const findAllTracks = async (req, res) => {
    const tracks = await trackDao.findAllTracks();
    res.json(tracks);
};

const createTrack = async (req, res) => {
    const newTrack = req.body;
    const insertedTrack = await trackDao.createTrack(newTrack);
    res.json(insertedTrack);
};

const deleteTrack = async (req, res) => {
    const trackIdToDelete = req.params.uid;
    // console.log(trackIdToDelete);
    const status = await trackDao.deleteTrack(trackIdToDelete);
    // console.log(status);
    res.send(status);
};

const updateTrack = async (req, res) => {
    const trackIdToUpdate = req.params.uid;
    const updatedTrack = req.body;
    const status = await trackDao.updateTrack(trackIdToUpdate, updatedTrack);
    res.send(status);
};

export default (app) => {
    app.get('/api/tracks', findAllTracks);
    app.get('/api/tracks/:trackId', findTrackById);
    app.post('/api/tracks', createTrack);
    app.delete('/api/tracks/:uid', deleteTrack);
    app.put('/api/tracks/:uid', updateTrack);
}
