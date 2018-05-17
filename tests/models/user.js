import test from 'ava';
import faker from 'faker';
import { Types } from 'mongoose';

import '../../config';
import User from '../../models/User';

const user = {
  firstName: faker.name.firstName(),
  lastName: faker.name.lastName(),
  email: faker.internet.email(),
  avatar: faker.image.avatar(),
  phoneNumber: faker.phone.phoneNumber(),
  password: `${faker.internet.password()},@A1u`,
};

test('User model - creates a new user', async (t) => {
  const newUser = await User.create(user);

  t.is(newUser.firstName, user.firstName);
  t.is(newUser.lastName, user.lastName);
  t.is(newUser.email, user.email);
  t.is(newUser.phoneNumber, user.phoneNumber);
  t.is(newUser.role, 'user');
  t.true(newUser.password.length > 10);
  t.true(Types.ObjectId.isValid(newUser._id));
});
