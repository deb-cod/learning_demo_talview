/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema
        .createTable('user_data', function (table) {
            table.increments('id');
            table.string('first_name', 255).notNullable();
            table.string('last_name', 255).notNullable();
            table.string('email').notNullable().unique();
            table.string('working_sector', 225).notNullable();
            table.string('car_make', 225).notNullable();
            table.string('car_model', 225).notNullable();
            table.integer('car_model_year', 225).notNullable();
            table.string('car_vin_number', 50).notNullable();
            table.timestamps(true,true);
        });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTableIfExists('user_data');
};



