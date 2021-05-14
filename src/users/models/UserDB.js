const crypto = require('crypto');

const { User } = require('./User');
const db = require('../../db/db');

class UserDB {
  static async getUserById(id) {
    const userResponse = await db.query(
      `SELECT * FROM "user" WHERE id = ${id}`
    );

    if (!userResponse.rowCount) {
      // return { flag: false, message: 'User does not exist' };
      throw new Error(`User with id: ${id}, does not exist`);
    }

    // const user = { ...userResponse.rows[0] };
    // return { ...userResponse.rows[0] };
    return new User(userResponse.rows[0]);
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
    // return { ...userResponse.rows[0] };
    return new User(userResponse.rows[0]);
  }

  static async checkPassword(email, password) {
    const userResponse = await db.query(
      `SELECT * FROM "user" WHERE email = '${email}'`
    );

    if (!userResponse.rowCount) {
      return { message: `User with ${email} does not exist`, flag: false };
    }

    const user = { ...userResponse.rows[0] };

    if (
      crypto
        .pbkdf2Sync(password, 'salt', 100000, 64, 'sha256')
        .toString('hex') !== user.password
    ) {
      return { message: 'Incorect password', flag: false };
    }

    return { user: new User(user), flag: true };
    // const passwordHash = crypto
    //   .pbkdf2Sync(password, 'salt', 100000, 64, 'sha256')
    //   .toString('hex');

    // if (user.password === passwordHash) {
    //   return { user, flag: true };
    // }

    // return { flag: false, message: 'Incorrect password' };
  }

  static async createUser(fname, lname, uname, email, password) {
    const passwordHash = crypto
      .pbkdf2Sync(password, 'salt', 100000, 64, 'sha256')
      .toString('hex');

    const createUserResponse = await db
      .query(
        `INSERT INTO "user" (fname, lname, uname, email, password) VALUES ('${fname}', '${lname}', '${uname}', '${email}', '${passwordHash}') RETURNING *`
      )
      .catch((err) => {
        if (err.constraint === 'user_email') {
          const error = new Error('User whith the same email already exist');
          error.status = 400;
          throw error;
        }
        throw new Error(err.message);
      });

    return new User(createUserResponse.rows[0]);
  }

  static async userList() {
    const userListResponse = await db.query('SELECT * FROM "user"');

    const users = userListResponse.rows.map((userDb) => new User(userDb));

    return users;
  }

  static async deleteUser(userId) {
    const userDeleteResponse = await db.query(
      `DELETE FROM "user" WHERE id = ${userId} RETURNING *`
    );

    // const user = { ...deleteUserResponse.rows[0] };
    return new User(userDeleteResponse.rows[0]);
  }

  static async updateAccountInformation(uname, email, userId) {
    const userUpdateAccountInformation = await db.query(
      `UPDATE "user" SET uname = '${uname}', email = '${email}' WHERE id = '${userId}' RETURNING *`
    );

    return new User(userUpdateAccountInformation.rows);
  }

  static async updatePersonalInformation(fname, lname, gender, countrycode, phonenumber, country, company, userId) {
    const userUpdatePersonalInformation = await db.query(
      `UPDATE "user" SET fname = '${fname}', lname = '${lname}', gender = '${gender}', countrycode = '${countrycode}', phonenumber = '${phonenumber}', country = '${country}', company = '${company}' WHERE id = '${userId}'`
    );

    return new User(userUpdatePersonalInformation.rows);
  }

  static async updateUserPhoto(photoUrl, email) {
    await db.query(
      `UPDATE "user" SET photo = '${photoUrl}' WHERE email = '${email}'`
    );
  }
}

module.exports = { UserDB };
