const bcrypt = require('bcrypt');

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('users').del();

  // Hash passwords
  const hashedPasswordAdmin = await bcrypt.hash('adminpassword', 10);
  const hashedPasswordUser1 = await bcrypt.hash('user1password', 10);
  const hashedPasswordUser2 = await bcrypt.hash('user2password', 10);

  // Inserts seed entries
  await knex('users').insert([
    { username: 'admin', email: 'admin@example.com', password: hashedPasswordAdmin, role: 'Admin' },
    { username: 'user1', email: 'user1@example.com', password: hashedPasswordUser1, role: 'User' },
    { username: 'user2', email: 'user2@example.com', password: hashedPasswordUser2, role: 'User' }
  ]);
};
