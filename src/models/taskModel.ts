import knex from 'knex';
import knexConfig from '../../knexfile';

const db = knex(knexConfig.development);

export const createTask = (task: { title: string, description?: string, due_date?: Date, assigned_to?: number }) => {
  return db('tasks').insert(task);
};

export const updateTask = (id: number, updates: { title?: string, description?: string, due_date?: Date, completed?: boolean, assigned_to?: number }) => {
  return db('tasks').where({ id }).update(updates);
};

export const deleteTask = (id: number) => {
  return db('tasks').where({ id }).del();
};

export const getTasks = () => {
  return db('tasks').select('*');
};

export const getTaskById = (id: number) => {
  return db('tasks').where({ id }).first();
};
