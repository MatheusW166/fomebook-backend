import Joi from "joi";

const create = Joi.object({
  name: Joi.string().trim().min(3).required(),
  email: Joi.string().trim().email().required(),
  password: Joi.string().trim().required(),
  photo: Joi.string().trim().uri().optional(),
  bio: Joi.string().trim().max(200).optional(),
});

const signIn = Joi.object({
  email: Joi.string().trim().email().required(),
  password: Joi.string().trim().required(),
});

const userSchemas = { create, signIn };

export default userSchemas;
