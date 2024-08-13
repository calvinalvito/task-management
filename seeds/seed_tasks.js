/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function (knex) {
  await knex('tasks').del();

  
  await knex('tasks').insert([
    {
      title: 'Task 1',
      description: 'Description for task 1',
      due_date: '2024-08-20',
      assignee_id: 2,
      is_complete: false 
    },
    {
      title: 'Task 2',
      description: 'Description for task 2',
      due_date: '2024-08-22',
      assignee_id: 3,
      is_complete: false
    },
    {
      title: 'Task 3',
      description: 'Description for task 3',
      due_date: '2024-08-25',
      assignee_id: null, 
      is_complete: true
    }
  ]);
};
