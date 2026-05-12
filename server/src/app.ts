import express from "express";
import cors from "cors";
import studentRoutes from "./routes/studentRoutes";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", studentRoutes);

app.get("/", (_req, res) => {
  res.send("Backend is running");
});

export default app;