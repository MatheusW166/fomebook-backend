import jwt from "jsonwebtoken";

function validateToken(req, res, next) {
  const { authorization } = req.headers;
  const token = authorization?.replace("Bearer ", "");

  if (!token) {
    return res.status(401).send({ error: "token does not exist" });
  }

  const decoded = jwt.verify(token, process.env.JWT_KEY, (err, decoded) =>
    err ? null : decoded
  );

  if (decoded === null) {
    return res.status(401).send({ error: "invalid token" });
  }

  req.session = decoded;
  next();
}

const authMiddleware = { validateToken };

export default authMiddleware;
