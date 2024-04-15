// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
const knexfile={
  
  development: {
    client: 'postgresql',
    connection: {
      database: 'github_upload',
      user:     'postgres',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }
};

export default knexfile;


