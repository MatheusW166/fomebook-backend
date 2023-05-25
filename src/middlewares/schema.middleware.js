function mapErrorDetails(detail) {
  const key =
    detail.context.key ??
    detail.context.label ??
    detail.context.value ??
    "message";
  return {
    [key]: detail.message,
  };
}

function validateSchema(schema) {
  return (req, res, next) => {
    const { error, value } = schema.validate(req.body, {
      abortEarly: false,
    });
    if (error?.details?.length) {
      return res.status(422).send({
        error: [error.details.map(mapErrorDetails)],
      });
    }
    req.body = value;
    next();
  };
}

const schemaMiddleware = { validateSchema };

export default schemaMiddleware;
