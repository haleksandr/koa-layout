const { Pool } = require('pg');

class Database {
  constructor() {
    this.config = {
      // user: 'testuser',
      // host: 'localhost',
      // database: 'my-fixer-db',
      // password: '12345',
      // port: 5432,
      user: 'jnbpjekc',
      host: 'queenie.db.elephantsql.com',
      database: 'jnbpjekc',
      password: 'cJmJdbusTqpnHuW5a5KE5gveOTyGmgd3',
      port: 5432,
      // user: process.env.USERNAME_DB,
      // host: process.env.HOST_DB,
      // database: process.env.DB_DB,
      // password: process.env.PASSWORD_DB,
      // port: process.env.PORT_DB,
    };

    this.pool = new Pool(this.config);
  }

  query(sql) {
    return this.pool.query(sql);
  }

  close() {
    this.pool.end();
  }
}

module.exports = new Database();
