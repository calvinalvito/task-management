import express from 'express';
import cors from 'cors';
import { json } from 'body-parser';
import knex from 'knex';
import knexConfig from '../knexfile';
import userRouter from './routes/userRoutes';
import taskRoutes from './routes/taskRoutes';

const app = express();
const port = process.env.PORT || 3000;

const db = knex(knexConfig.development);

app.use(cors());
app.use(json());

app.use('/api', userRouter);
app.use('/api', taskRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
