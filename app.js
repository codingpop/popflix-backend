import express from 'express';

import config from './config';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => res.status(200).json({ message: 'Welcome!' }));

app.listen(config.port);
