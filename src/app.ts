import express, { type Application, type Request, type Response } from "express";
import cors from "cors";
import envVars from "./config/env";
import { globalError } from "./middleware/globalErrorHandlers";
import { notFound } from "./middleware/notFound";
import cookieParser from "cookie-parser";
import { router } from "./route";

export const app: Application = express();

app.use(express.json())
app.use(cors());
app.use(cookieParser())

app.use("/api/v1", router)

app.get("/", (req: Request, res: Response) => {
   res.send(`🚀 Server is running on port ${envVars.port}`);
});

app.use(globalError)
app.use(notFound)