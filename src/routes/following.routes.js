import { Router } from "express";
import authMiddleware from "../middlewares/auth.middleware.js";
import followingControllers from "../controllers/following.controllers.js";

const followingRoutes = Router();

followingRoutes.get(
  "/following/:userId",
  followingControllers.searchFollowingById
);
followingRoutes.post(
  "/following/:followedId",
  authMiddleware.validateToken,
  followingControllers.follow
);
followingRoutes.delete(
  "/following/:followedId",
  authMiddleware.validateToken,
  followingControllers.unFollow
);

export default followingRoutes;
