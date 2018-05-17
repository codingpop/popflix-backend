import { Joi as joi } from 'celebrate';
import htmlInput from 'joi-html-input';

const Joi = joi.extend(htmlInput);

const name = Joi.string().min(2).max(50);
const phoneNumber = Joi.string().required();
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
