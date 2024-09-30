import cors from "cors";
import morgan from "morgan";
import createError from "http-errors";
import dotenv from "dotenv";
import express, { NextFunction, Request, Response } from "express";
import taskRoutes from "./routes/task.routes";
import { DeleteTaskIfPassesWeekDeleted } from "./middlewares/CheckTaskDeletion";
import cron from "node-cron";

dotenv.config();

export const app = express();

const allowedOrigins = [
  "https://to-do-app-five-chi.vercel.app",
  "http://localhost:3000",
  "http://localhost:3001",
  "https://to-do-3nsa6jood-kholoudxs55khs-projects.vercel.app",
  "https://to-do-app-five-chi.vercel.app/",
  "https://to-do-app-kholoudxs55khs-projects.vercel.app/",
  "https://to-do-app-git-main-kholoudxs55khs-projects.vercel.app/",
  "to-do-3xzpydvhx-kholoudxs55khs-projects.vercel.app",
];

const corsOptions = {
  origin: function (
    origin: string | undefined,
    callback: (err: Error | null, allow?: boolean) => void
  ) {
    console.log("Received request from origin:", origin);
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      console.log("Origin not allowed:", origin);
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  credentials: true,
  optionsSuccessStatus: 204,
};

// Apply CORS middleware first
app.use(cors(corsOptions));

// Handle preflight requests
app.options("*", cors(corsOptions));

app.use(morgan("dev"));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
  console.log("Received headers:", req.headers);
  console.log("Request method:", req.method);
  console.log("Request URL:", req.url);
  next();
});

app.use("/api", taskRoutes);

cron.schedule("0 0 * * *", async () => {
  try {
    console.log("Running scheduled task to delete old tasks...");
    await DeleteTaskIfPassesWeekDeleted();
  } catch (error) {
    console.error("Error during scheduled task deletion:", error);
  }
});

app.use((req: Request, res: Response, next: NextFunction) => {
  next(createError.NotFound());
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`live at http://localhost:${PORT}`));
