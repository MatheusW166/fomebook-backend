import { Router } from "express";
import authMiddleware from "../middlewares/auth.middleware.js";
import followingControllers from "../controllers/following.controllers.js";

const followingRoutes = Router();

followingRoutes.get("/following/:id");

followingRoutes.use(authMiddleware.validateToken);

followingRoutes.get("/following");
followingRoutes.post("/following/:followedId", followingControllers.follow);
followingRoutes.delete("/following/:id");

export default followingRoutes;
