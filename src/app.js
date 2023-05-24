import express from "express";
import cors from "cors";
import { config } from "dotenv";
config();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (_, res) => res.send("Hello World!"));

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`🚀 Running on PORT ${PORT}`));
