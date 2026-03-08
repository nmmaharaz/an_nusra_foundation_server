import express, { type Application, type Request, type Response } from "express";
import cors from "cors";
import envVars from "./config/env";

export const app:Application = express();

app.use(express.json())
app.use(cors());

app.get("/", (req: Request, res: Response) => {
   res.send(`🚀 Server is running on port ${envVars.port}`);
});
