import { Router } from "express";
import authMiddleware from "../middlewares/auth.middleware.js";
import followingControllers from "../controllers/following.controllers.js";

const followingRoutes = Router();

followingRoutes.get(
  "/following/:userId",
  followingControllers.searchFollowingById
);

followingRoutes.use(authMiddleware.validateToken);

followingRoutes.get("/following", followingControllers.searchFollowing);
followingRoutes.post("/following/:followedId", followingControllers.follow);
followingRoutes.delete("/following/:followedId", followingControllers.unFollow);

export default followingRoutes;
