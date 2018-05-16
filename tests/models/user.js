import chai from 'chai';
import faker from 'faker';

import '../../config';

import User from '../../models/User';

const user = {
  firstName: faker.name.firstName(),
  lastName: faker.name.lastName(),
  email: faker.internet.email(),
  avatar: faker.image.avatar(),
  phoneNumber: faker.phone.phoneNumber(),
  password: faker.internet.password(),
};

const { expect } = chai;

describe('User model', () => {
  it('should create a new user', async () => {
    const newUser = await User.create(user);

    expect(newUser).to.be.an('object');
  });
});
