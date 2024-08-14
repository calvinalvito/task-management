import knex from 'knex';
import knexConfig from '../../knexfile';

const db = knex(knexConfig.development);

interface User {
  username: string;
  email: string;
  password: string;
  role: string;
}

export const createUser = (user: User) => {
  return db('users').insert(user);
};

export const getAllUsers = () => {
  return db('users').select('*');
};

export const getUserByUsername = (username: string) => {
  return db('users').where({ username }).first();
};

export const getUserByIdFromDb = (id: number) => {
  return db('users').where({ id }).first();
};

export const updateUserInDb = (id: number, updates: Partial<User>) => {
  return db('users').where({ id }).update(updates);
};

export const deleteUserFromDb = (id: number) => {
  return db('users').where({ id }).del();
};
