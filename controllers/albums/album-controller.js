import * as albumDao from '../../daos/album-dao.js';

const findAlbumById = async (req, res) => {
    const albumId = req.params.albumId;
    // console.log(trackId);
    const album = await albumDao.findAlbumById(albumId);
    // console.log('The track is ' + track);
    if (!album) {
        res.send({ error: "There is no album with this id" });
    } else {
        res.json(album);
    }
};

const findAllAlbums = async (req, res) => {
    const albums = await albumDao.findAllAlbums();
    res.json(albums);
};

const createAlbum = async (req, res) => {
    const newAlbum = req.body;
    const insertedAlbum = await albumDao.createAlbum(newAlbum);
    res.json(insertedAlbum);
};

const deleteAlbum = async (req, res) => {
    const albumIdToDelete = req.params.uid;
    const status = await albumDao.deleteAlbum(albumIdToDelete);
    res.send(status);
};

const updateAlbum = async (req, res) => {
    const albumIdToUpdate = req.params.uid;
    const updatedAlbum = req.body;
    const status = await albumDao.updateAlbum(albumIdToUpdate, updatedAlbum);
    res.send(status);
};

export default (app) => {
    app.get('/api/albums', findAllAlbums);
    app.get('/api/albums/:albumId', findAlbumById);
    app.post('/api/albums', createAlbum);
    app.delete('/api/albums/:uid', deleteAlbum);
    app.put('/api/albums/:uid', updateAlbum);
}
