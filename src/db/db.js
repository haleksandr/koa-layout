const { Pool } = require('pg');
const dotenv = require('dotenv');

dotenv.config();

class Database {
  constructor() {
    this.config = {
      // localhost
      // user: 'testuser',
      // host: 'localhost',
      // database: 'my-fixer-db',
      // password: '12345',
      // port: 5432,
      // elephantsql
      // user: 'jnbpjekc',
      // host: 'queenie.db.elephantsql.com',
      // database: 'jnbpjekc',
      // password: 'cJmJdbusTqpnHuW5a5KE5gveOTyGmgd3',
      // port: 5432,
      // .env
      user: process.env.USERNAME_DB,
      host: process.env.HOST_DB,
      database: process.env.DB_DB,
      password: process.env.PASSWORD_DB,
      port: process.env.PORT_DB,
      // redislabs
      // user: 'users',
      // host: 'redis-17506.c263.us-east-1-2.ec2.cloud.redislabs.com',
      // database: 'users',
      // password: 'KV52k8zmMVEzSda5yPWmMTuqp9wJnIuX',
      // port: 17506,
      // redis local server
      // user: 'users',
      // host: '127.0.0.1',
      // database: 'users',
      // password: 'KV52k8zmMVEzSda5yPWmMTuqp9wJnIuX',
      // port: 6379,
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
