import { Router } from "express";
import authMiddleware from "../middlewares/auth.middleware.js";
import schemaMiddleware from "../middlewares/schema.middleware.js";
import postSchemas from "../schemas/post.schema.js";
import postControllers from "../controllers/post.controllers.js";

const postRoutes = Router();

postRoutes.post(
  "/post",
  schemaMiddleware.validateSchema(postSchemas.create),
  authMiddleware.validateToken,
  postControllers.newPost
);
postRoutes.get("/post/:userId", postControllers.searchByUserId);

export default postRoutes;
