import express from "express";
import taskRoutes from "./routes/task.routes";
import morgan from "morgan";
import cron from "node-cron";
import { DeleteTaskIfPassesWeekDeleted } from "./middlewares/CheckTaskDeletion";
import cors from "cors";

const app = express();

// app.use(handlerCors);
// app.use(nextCorsHandler);

const allowedOrigins = [
  "https://to-do-app-five-chi.vercel.app",
  "https://to-do-3nsa6jood-kholoudxs55khs-projects.vercel.app",
  "http://localhost:3000",
  "http://localhost:3001",
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,   })
);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan("dev"));

app.use('/api/task',taskRoutes);

cron.schedule("0 0 * * *", async () => {
  try {
    await DeleteTaskIfPassesWeekDeleted();
  } catch (error) {
    console.error("Error during scheduled task deletion:", error);
  }
});

app.use((req, res) => {
  res.status(404).send("Not Found");
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
