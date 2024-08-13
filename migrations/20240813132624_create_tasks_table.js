/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable('tasks', function (table) {
        table.increments('id').primary();
        table.string('title', 255).notNullable();
        table.text('description').notNullable();
        table.date('due_date').notNullable();
        table.boolean('is_complete').defaultTo(false);
        table.integer('assignee_id').unsigned().references('id').inTable('users').onDelete('SET NULL');
        table.timestamps(true, true);
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.dropTable('tasks');
};
