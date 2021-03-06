import { Joi as joi } from 'celebrate';
import htmlInput from 'joi-html-input';
import objectId from 'joi-objectid';

const Joi = joi.extend(htmlInput);
Joi.objectId = objectId(Joi);

const name = Joi.string().min(2).max(50);
const string = Joi.string();
const phoneNumber = Joi.string();
const email = Joi.string().regex(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
const password = Joi.string().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/);

export const register = {
  body: Joi.object().keys({
    firstName: name.required(),
    lastName: name.required(),
    email: email.required(),
    phoneNumber: phoneNumber.required(),
    password: password.required(),
  }),
};

export const login = {
  body: Joi.object().keys({
    email: email.required(),
    password: password.required(),
  }),
};

export const uploadMovie = {
  body: Joi.object().keys({
    title: string.min(3).max(80).required(),
    synopsis: string.min(20).max(200).required(),
  }),
};

export const getOneMovie = {
  params: Joi.object().keys({
    id: Joi.objectId().required(),
  }),
};

export const likeMovie = {
  params: Joi.object().keys({
    movieId: Joi.objectId().required(),
  }),
};

export const postComment = {
  params: Joi.object().keys({
    movieId: Joi.objectId().required(),
  }),
};
