import express from "express";
import cors from "cors";
import { json } from "body-parser";
import knex from "knex";
import knexConfig from "../knexfile";
import userRouter from "./routes/userRoutes";
import taskRoutes from "./routes/taskRoutes";

const app = express();
const port = process.env.PORT || 3000;

const db = knex(knexConfig.development);

// Middleware
app.use(cors());
app.use(json());

// Routes
app.use("/api", userRouter);
app.use("/api", taskRoutes);

// Check database connection
const checkDatabaseConnection = async () => {
  try {
    await db.raw("SELECT 1+1 as result");
    console.log("==========Database Connected Successfully==========");
  } catch (error: unknown) {
    console.error("Error Connecting to Database:", (error as Error).message);
  }
};
checkDatabaseConnection();

// Start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

export default app;
