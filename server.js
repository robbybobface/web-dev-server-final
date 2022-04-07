import express from 'express';
import cors from 'cors';
import userController from "./controllers/user-controller.js";

const app = express();
app.use(cors());

app.use(express.json());

userController(app);
app.get('/', (req, res) => {
    res.send('Web-Dev Final Project');
});

app.listen(process.env.PORT || 4000);
