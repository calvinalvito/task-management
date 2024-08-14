import express from "express";
import cors from "cors";
import { json } from "body-parser";
import knex from "knex";
import knexConfig from "../knexfile";
import userRouter from "./routes/userRoutes";
import taskRoutes from "./routes/taskRoutes";

const app = express();

// Konversi PORT dari string ke number
const port = parseInt(process.env.PORT || "3000", 10);

// Inisialisasi database
const db = knex(knexConfig.development);

// Middleware
app.use(cors());
app.use(json());

// Rute
app.use("/api", userRouter);
app.use("/api", taskRoutes);

// Cek koneksi database
const checkDatabaseConnection = async () => {
  try {
    await db.raw("SELECT 1+1 as result");
    console.log("==========Database Connected Successfully==========");
  } catch (error: unknown) {
    console.error("Error Connecting to Database:", (error as Error).message);
  }
};
checkDatabaseConnection();

// Mulai server
app.listen(port, "0.0.0.0", () => {
  console.log(`Server is running on port ${port}`);
});

export default app;
