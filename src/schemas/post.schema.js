import Joi from "joi";

const create = Joi.object({
  photo: Joi.string().trim().uri().required(),
  description: Joi.string().trim().required(),
});

const postSchemas = { create };

export default postSchemas;
