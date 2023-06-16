import jwt from "jsonwebtoken";
import sessionRepository from "../repositories/session.repository.js";

async function validateToken(req, res, next) {
  const { authorization } = req.headers;
  const token = authorization?.replace("Bearer ", "");

  if (!token) {
    return res.status(401).send({ error: "token does not exist" });
  }

  const decoded = jwt.verify(token, process.env.JWT_KEY, (err, decoded) =>
    err ? null : decoded
  );

  if (decoded === null) {
    return res.status(401).send({ error: "token expired or invalid" });
  }

  try {
    const sessionFound = await sessionRepository.findUniqueOrThrow({
      where: { id: decoded.session },
    });

    req.session = sessionFound;
    next();
  } catch (err) {
    if ((err.code = "P2025")) {
      return res.status(401).send({ error: "session not found" });
    }
    return res.status(500).send({ error: "internal server error" });
  }
}

const authMiddleware = { validateToken };

export default authMiddleware;
