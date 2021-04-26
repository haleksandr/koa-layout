const passport = require('koa-passport');
const jwt = require('jwt-simple');

const UserDB = require('./models/UserDB');
// const AWSS3 = require('../utils/uploadS3'); // !!!
// const validator = require('../validator');
// const db = require('../db/db');

class UsersController {
  static async signIn(ctx, next) {
    await passport.authenticate('local', (err, user) => {
      if (user) {
        ctx.body = user;
      } else {
        ctx.status = 400;
        if (err) {
          ctx.body = { error: err };
        }
      }
    })(ctx, next);
  }

  static async profile(ctx) {
    ctx.body = {
      user: ctx.state.user,
    };
  }

  static async createUser(ctx) {
    const { fname, lname, uname, email, password } = ctx.request.body;

    ctx.status = 201;
    ctx.body = (
      await UserDB.createUser(fname, lname, uname, email, password)
    ).getInfo();
  }

  static async refresh(ctx) {
    const token = ctx.headers.authorization.split(' ')[1];
    const decodedToken = jwt.decode(token, 'super_secret_refresh');

    if (decodedToken.expiresIn <= new Date().getTime()) {
      const error = new Error(
        'Refresh token expired, please sign in into your account.'
      );
      error.status = 400;

      throw error;
    }

    const user = await UserDB.getUserByEmail(decodedToken.email);

    const accessToken = {
      id: user.getId(),
      expiresIn: new Date().setTime(new Date().getTime() + 2000000),
    };
    const refreshToken = {
      email: user.email,
      expiresIn: new Date().setTime(new Date().getTime() + 1000000),
    };

    ctx.body = {
      accessToken: jwt.encode(accessToken, 'super_secret'),
      accessTokenExpirationDate: accessToken.expiresIn,
      refreshToken: jwt.encode(refreshToken, 'super_secret_refresh'),
      refreshTokenExpirationDate: refreshToken.expiresIn,
    };
  }

  static async userList(ctx) {
    const users = (await UserDB.userList()).map((user) => user.getInfo());

    ctx.body = {
      users,
    };
  }

  // static async updatePhoto(ctx) {
  //   const photoUrl = await AWSS3.uploadS3(
  //     ctx.request.body.photo,
  //     'users',
  //     `photos_${ctx.state.user.email}`
  //   );

  //   await UserDB.updateUserPhoto(photoUrl, ctx.state.user.email);
  //   ctx.body = { photoUrl };
  // }
}

module.exports = { UsersController };
// async function createUser(ctx) {
//   const { body } = ctx.request;
//   // await validator.schema.validateAsync(body);

//   body.password = crypto
//     .pbkdf2Sync(body.password, 'salt', 100000, 64, 'sha256')
//     .toString('hex');

//   const createUserResponse = await db.query(
//     `INSERT INTO "user" (fname, lname, uname, email, password) VALUES ('${body.fname}', '${body.lname}', '${body.uname}', '${body.email}', '${body.password}') RETURNING *`
//   );

//   // const createUserResponse = await db.query(
//   //   `INSERT INTO "user" (fname, lname) VALUES ('${body.fname}', '${body.lname}') RETURNING *`
//   // );

//   const user = { ...createUserResponse.rows[0] };

//   // await ctx.redis.set(user.id, JSON.stringify(user));
//   // await db.set(user.id, JSON.stringify(user));

//   ctx.status = 201;
//   ctx.body = {
//     id: user.id,
//     fname: user.fname,
//     lname: user.lname,
//     uname: user.uname,
//     email: user.email,
//     // password: user.password,
//   };
// }

// async function signIn(ctx) {
//   await passport.authenticate('local', (err, user) => {
//     if (user) {
//       ctx.body = user;
//     } else {
//       ctx.status = 400;
//       if (err) {
//         ctx.body = { error: err };
//       }
//     }
//   })(ctx);
// }

// async function refresh(ctx) {
//   const token = ctx.headers.authorization.split(' ')[1];
//   const decodedToken = jwt.decode(token, 'super_secret_refresh');

//   if (decodedToken.expiresIn <= new Date().getTime()) {
//     const error = new Error(
//       'Refresh token expired, please sign in into your account.'
//     );
//     error.status = 400;

//     throw error;
//   }

//   const user = await UserDB.getUserByEmail(decodedToken.email);

//   const accessToken = {
//     // id: user.getId(),
//     id: user.id,
//     expiresIn: new Date().setTime(new Date().getTime() + 2000000),
//   };
//   const refreshToken = {
//     email: user.email,
//     expiresIn: new Date().setTime(new Date().getTime() + 1000000),
//   };

//   ctx.body = {
//     accessToken: jwt.encode(accessToken, 'super_secret'),
//     accessTokenExpirationDate: accessToken.expiresIn,
//     refreshToken: jwt.encode(refreshToken, 'super_secret_refresh'),
//     refreshTokenExpirationDate: refreshToken.expiresIn,
//   };
// }

// async function getUser(ctx) {
//   const { body } = ctx.request;
//   const { userId } = ctx.request.params;
//   const getUserResponse = await db.query(
//     `SELECT * FROM "user" WHERE id = '${userId}'`
//   );

//   const user = { ...getUserResponse.rows[0] };

//   ctx.status = 302;
//   ctx.body = {
//     id: user.id,
//     fname: user.fname,
//     lname: user.lname,
//     uname: user.uname,
//     email: user.email,
//   };
//   console.log(ctx.body);
// }

// async function getUsers(ctx) {
//   const { body } = ctx.request;
//   const getUserResponse = await db.query(`SELECT * FROM "user"`);

//   const user = { ...getUserResponse.rows };

//   ctx.status = 302;
//   ctx.body = {
//     id: user.id,
//     fname: user.fname,
//     lname: user.lname,
//   };

//   console.log(user);
// }

// async function deleteUser(ctx) {
//   const { body } = ctx.request;
//   const { userId } = ctx.request.params;
//   const deleteUserResponse = await db.query(
//     `DELETE FROM "user" WHERE id = ${userId} RETURNING *`
//   );

//   const user = { ...deleteUserResponse.rows[0] };

//   ctx.status = 204;
//   ctx.body = {
//     message: 'DELETE',
//     fname: user.fname,
//   };
// }

// async function updateUser(ctx) {
//   const { id, fname, lname } = ctx.request.body;
//   const { userId } = ctx.request.params;

//   const updateUserResponse = await db.query(
//     `UPDATE "user" SET fname = '${fname}', lname = '${lname}' WHERE id = '${userId}' RETURNING *`
//   );

//   const user = { ...updateUserResponse.rows };

//   ctx.status = 202;
//   ctx.body = {
//     id: user.id,
//     fname: user.fname,
//     lname: user.lname,
//   };
// }

// module.exports = {
//   createUser,
//   signIn,
//   refresh,
//   getUser,
//   getUsers,
//   deleteUser,
//   updateUser,
// };
