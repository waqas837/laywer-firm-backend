module.exports = ({ env }) => ({
  connection: {
    client: "mysql", // This should be 'mysql', even though we installed 'mysql2'.
    connection: {
      host: env("DATABASE_HOST"),
      port: env.int("DATABASE_PORT"),
      database: env("DATABASE_NAME"),
      user: env("DATABASE_USERNAME"),
      password: env("DATABASE_PASSWORD"),
      ssl: env.bool("DATABASE_SSL"),
    },
  },
});
