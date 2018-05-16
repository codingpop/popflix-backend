import test from 'ava';
import faker from 'faker';

import User from '../../models/User';

test('User model', async (t) => {
  const user = {
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    email: faker.internet.email(),
    avatar: faker.image.avatar(),
    phoneNumber: faker.phone.phoneNumber(),
    password: faker.internet.password(),
  };

  const newUser = await User(user);

  t.deepEqual(user.firstName, newUser.firstName);
  t.deepEqual(user.lastName, newUser.lastName);
});
