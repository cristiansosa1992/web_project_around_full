import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import router from "./routes/index.js";
import { errorHandler } from "./middleware/error-handler.js";

mongoose
  .connect("mongodb://127.0.0.1:27017/aroundb")
  .then(() => {
    console.warn("Conectado a MongoDB");
  })
  .catch((err) => {
    console.error("Error de conexión", err);
  });

const app = express();
const PORT = 3001;

app.use(cors({ origin: "http://localhost:3000" }));
app.use(express.json());

app.use((req, res, next) => {
  req.user = {
    _id: "6a9abdf416df4b284c398d74",
  };

  next();
});

app.use(router);

app.use((req, res) => {
  res.status(404).json({
    message: "Recurso solicitado no encontrado",
  });
});

app.use(errorHandler);

app.listen(PORT);