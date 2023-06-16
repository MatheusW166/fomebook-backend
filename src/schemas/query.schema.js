import Joi from "joi";

const pagination = Joi.object({
  name: Joi.string().min(1).optional(),
  limit: Joi.number().min(0).optional(),
  offset: Joi.number().min(0).optional(),
});

const querySchemas = { pagination };

export default querySchemas;
