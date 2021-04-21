const crypto = require('crypto');

const db = require('../../db/db');
const User = require('./User');

class UserDB {
  static async getUserById(id) {
    const userResponse = await db.query(
      `SELECT * FROM "user" WHERE id = ${id}`
    );

    if (!userResponse.rowCount) {
      // return { flag: false, message: 'User does not exist' };
      throw new Error('User does not exist');
    }

    // const user = { ...userResponse.rows[0] };
    return { ...userResponse.rows[0] };
  }

  static async getUserByEmail(email) {
    const userResponse = await db.query(
      `SELECT * FROM "user" WHERE email = '${email}'`
    );

    if (!userResponse.rowCount) {
      // return { flag: false, message: 'User does not exist' };
      throw new Error(`User with email: ${email} does don exist`);
    }

    // const user = { ...userResponse.rows[0] };
    return { ...userResponse.rows[0] };
  }

  static async checkPassword(email, password) {
    const userResponse = await db.query(
      `SELECT * FROM "user" WHERE email = '${email}'`
    );

    if (!userResponse.rowCount) {
      return { flag: false, message: `User with ${email} does not exist` };
    }

    const user = { ...userResponse.rows[0] };

    const passwordHash = crypto
      .pbkdf2Sync(password, 'salt', 100000, 64, 'sha256')
      .toString('hex');

    if (user.password === passwordHash) {
      return { user, flag: true };
    }

    return { flag: false, message: 'Incorrect password' };
  }
}

module.exports = { UserDB };
