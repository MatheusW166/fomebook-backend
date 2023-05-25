import express from "express";
import cors from "cors";
import { config } from "dotenv";
import userRoutes from "./routes/user.routes.js";
import followingRoutes from "./routes/following.routes.js";
config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(userRoutes);
app.use(followingRoutes);

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`🚀 Running on PORT ${PORT}`));
