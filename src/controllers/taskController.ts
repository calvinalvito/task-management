import { Request, Response } from 'express';
import { createTask, updateTask, deleteTask, getTasks, getTaskById } from '../models/taskModel';

export const create = async (req: Request, res: Response) => {
  const task = req.body;
  await createTask(task);
  res.status(201).send('Task created');
};

export const update = async (req: Request, res: Response) => {
  const { id } = req.params;
  const updates = req.body;
  await updateTask(Number(id), updates);
  res.send('Task updated');
};

export const remove = async (req: Request, res: Response) => {
  const { id } = req.params;
  await deleteTask(Number(id));
  res.send('Task deleted');
};

export const list = async (req: Request, res: Response) => {
  const tasks = await getTasks();
  res.json(tasks);
};

export const getById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const task = await getTaskById(Number(id));
  if (task) {
    res.json(task);
  } else {
    res.status(404).send('Task not found');
  }
};
