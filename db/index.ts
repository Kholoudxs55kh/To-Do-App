import cors from "cors";
import morgan from "morgan";
import createError from "http-errors";
import dotenv from "dotenv";
import express, { NextFunction, Request, Response } from "express";
import taskRoutes from "./routes/task.routes";
import { DeleteTaskIfPassesWeekDeleted } from "./middlewares/CheckTaskDeletion";

export const app = express();

app.use(cors());

dotenv.config();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(morgan("dev"));

app.use("/api", taskRoutes);

DeleteTaskIfPassesWeekDeleted();

app.use((req: Request, res: Response, next: NextFunction) => {
  next(createError.NotFound());
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`live at http://localhost:${PORT}`));
