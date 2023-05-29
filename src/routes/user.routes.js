import { Router } from "express";
import schemaMiddleware from "../middlewares/schema.middleware.js";
import userSchemas from "../schemas/user.schema.js";
import userControllers from "../controllers/user.controllers.js";
import authMiddleware from "../middlewares/auth.middleware.js";

const userRoutes = Router();

userRoutes.post(
  "/user/signup",
  schemaMiddleware.validateSchema(userSchemas.create),
  userControllers.signUp
);
userRoutes.post(
  "/user/signin",
  schemaMiddleware.validateSchema(userSchemas.signIn),
  userControllers.signIn
);
userRoutes.get("/user/search", userControllers.searchUsers);
userRoutes.get("/user/:id", userControllers.searchById);

userRoutes.get(
  "/user",
  authMiddleware.validateToken,
  userControllers.getLoggedUser
);

export default userRoutes;
