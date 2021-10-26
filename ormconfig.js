const { SnakeNamingStrategy } = require('typeorm-naming-strategies');

module.exports = {
  type: 'postgres',
  host: process.env.DB_HOSTNAME,
  port: process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: false,
  entities: ['**/*.entity.js'],
  migrations: ['migrations/*.js'],
  migrationsTableName: 'db_migrations',
  cli: {
    migrationsDir: 'migrations',
  },
  namingStrategy: new SnakeNamingStrategy(),
};
