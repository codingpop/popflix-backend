import express from 'express';
import faker from 'faker';

import config from './config';

import User from './models/User';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', async (req, res) => {

  const newUser = await User.create({
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    email: faker.internet.email(),
    avatar: faker.image.avatar(),
    phoneNumber: faker.phone.phoneNumber(),
    password: faker.internet.password(),
  })
  res.status(200).json({ message: newUser });
});

app.listen(config.port);
