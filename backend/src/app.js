import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.routes.js";
import chatRoutes from "./routes/chat.routes.js";
import userRoutes from "./routes/user.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/chat", chatRoutes);

app.use("/api/users", userRoutes);

export default app;
