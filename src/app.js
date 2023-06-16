import express from "express";
import cors from "cors";
import { config } from "dotenv";
import userRoutes from "./routes/user.routes.js";
import followingRoutes from "./routes/following.routes.js";
import postRoutes from "./routes/post.routes.js";
config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(userRoutes);
app.use(followingRoutes);
app.use(postRoutes);

const PORT = process.env.PORT ?? 5000;
app.listen(PORT, () => console.log(`🚀 Running on PORT ${PORT}`));
