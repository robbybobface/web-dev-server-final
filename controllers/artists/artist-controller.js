import * as artistDao from "../../daos/artist-dao.js";

const findArtistById = async (req, res) => {
    const artistId = req.params.artistId;
    const artist = await artistDao.findArtistById(artistId);
    console.log(artist)
    if (!artist) {

        res.send({ error: "There is no artist with this id" });
    } else {
        res.json(artist);
    }
};

const findAllArtists = async (req, res) => {
    const artists = await artistDao.findAllArtists();
    res.json(artists);
};

const createArtist = async (req, res) => {
    const newArtist = req.body;
    const insertedArtist = await artistDao.createArtist(newArtist);
    res.json(insertedArtist);
};

const deleteArtist = async (req, res) => {
    const artistIdToDelete = req.params.uid;
    const status = await artistDao.deleteArtist(artistIdToDelete);
    res.send(status);
};

const updateArtist = async (req, res) => {
    const artistIdToUpdate = req.params.uid;
    const updatedArtist = req.body;
    const status = await artistDao.updateArtist(artistIdToUpdate, updatedArtist);
    res.send(status);
};

export default (app) => {
    app.get('/api/artists', findAllArtists);
    app.get('/api/artists/:artistId', findArtistById);
    app.post('/api/artists', createArtist);
    app.delete('/api/artists/:uid', deleteArtist);
    app.put('/api/artists/:uid', updateArtist);
}
