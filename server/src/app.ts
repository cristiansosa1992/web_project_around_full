import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import rateLimit from "express-rate-limit";
import router from "./routes/index.js";
import { createUser, login } from "./controllers/users.js";
import { errorHandler } from "./middleware/error-handler.js";

dotenv.config({ path: new URL("../.env", import.meta.url) });

const app = express();
app.set("trust proxy", 1);
const PORT = Number(process.env.PORT) || 3001;
const DATABASE_URL =
  process.env.DATABASE_URL || "mongodb://127.0.0.1:27017/aroundb";
const CLIENT_ORIGIN = process.env.CLIENT_ORIGIN || "http://localhost:3000";

mongoose
  .connect(DATABASE_URL, {
    maxPoolSize: 10,
  })
  .then(() => {
    console.warn("Conectado a MongoDB");
  })
  .catch((err) => {
    console.error("Error de conexión", err);
  });

const signupLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: {
    message: "Demasiados intentos de registro. Inténtalo más tarde.",
  },
});

const signinLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20,
  message: {
    message: "Demasiados intentos de inicio de sesión. Inténtalo más tarde.",
  },
});

app.use(cors({ origin: CLIENT_ORIGIN }));
app.use(express.json());

app.get("/health", (_req, res) => {
  res.status(200).json({
    success: true,
    data: { status: "ok" },
    error: null,
  });
});

// Rutas públicas de registro e inicio de sesión
app.post("/signup", signupLimiter, createUser);
app.post("/signin", signinLimiter, login);

app.use(router);

app.use((req, res) => {
  res.status(404).json({
    message: "Recurso solicitado no encontrado",
  });
});

app.use(errorHandler);

app.listen(PORT);

