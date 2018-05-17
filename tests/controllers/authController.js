import test from 'ava';
import request from 'supertest';

import app from '../../app';
import { user } from '../testData';

test.before(async (t) => {
  const res = await request(app)
    .post('/api/v1/users/register')
    .send({ ...user, avatar: undefined });

  t.context.res = res; // eslint-disable-line no-param-reassign
});

test('Register a new user', async (t) => {
  const { res } = t.context;

  t.is(res.status, 201);
  t.is(res.body.user.firstName, user.firstName);
  t.is(res.body.user.lastName, user.lastName);
  t.is(res.body.user.phoneNumber, user.phoneNumber);
  t.is(res.body.user.email, user.email);
  t.truthy(res.body.token);
  t.truthy(res.body.user._id);
});

test('Log in a user', async (t) => {
  const registeredUser = t.context.res.body.user;

  const res = await request(app)
    .post('/api/v1/users/login')
    .send({
      email: registeredUser.email,
      password: user.password,
    });

  t.is(res.status, 200);
  t.is(res.body.user.firstName, user.firstName);
  t.is(res.body.user.lastName, user.lastName);
  t.is(res.body.user.phoneNumber, user.phoneNumber);
  t.is(res.body.user.email, user.email);
  t.truthy(res.body.token);
  t.truthy(res.body.user._id);
});
