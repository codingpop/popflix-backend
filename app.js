import express from 'express';

import config from './config';
import routes from './routes';
import ErrorController from './controllers/ErrorController';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/v1/users', routes.auth);

app.use(ErrorController.handle);

app.get('/se', async (req, res) => {
  res.status(200).json({ message: 'Welcome!' });
});

app.listen(config.port);

export default app;
