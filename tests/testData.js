import faker from 'faker';

export const user = {
  firstName: faker.name.firstName(),
  lastName: faker.name.lastName(),
  email: faker.internet.email(),
  avatar: faker.image.avatar(),
  phoneNumber: faker.phone.phoneNumber(),
  password: `${faker.internet.password()},@A1u`,
};

export const movie = {
  title: faker.lorem.words(),
  synopsis: faker.lorem.words().repeat(5),
  poster: faker.image.image(),
  thumbnail: faker.image.image(),
  views: faker.random.number(),
};
