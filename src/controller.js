const crypto = require('crypto');
const passport = require('koa-passport');
const { isError } = require('joi');
const jwt = require('jwt-simple');
// const Redis = require('ioredis');
const db = require('./db/db');
const validator = require('./validator');
const { UserDB } = require('./models/user/UserDB');

async function profile(ctx) {
  const { user } = ctx.state;

  ctx.body = {
    user,
  };
}

async function createUser(ctx) {
  const { body } = ctx.request;
  await validator.schema.validateAsync(body);

  body.password = crypto
    .pbkdf2Sync(body.password, 'salt', 100000, 64, 'sha256')
    .toString('hex');

  const createUserResponse = await db.query(
    `INSERT INTO "user" (fname, lname, uname, email, password) VALUES ('${body.fname}', '${body.lname}', '${body.uname}', '${body.email}', '${body.password}') RETURNING *`
  );

  // const createUserResponse = await db.query(
  //   `INSERT INTO "user" (fname, lname) VALUES ('${body.fname}', '${body.lname}') RETURNING *`
  // );

  const user = { ...createUserResponse.rows[0] };
  //   console.log(await ctx.redis.get('fname'));
  // await ctx.redis.set(user.id, JSON.stringify(user));
  // await db.set(user.id, JSON.stringify(user));

  ctx.status = 201;
  ctx.body = {
    id: user.id,
    fname: user.fname,
    lname: user.lname,
    uname: user.uname,
    email: user.email,
    // password: user.password,
  };

  // await db.mset(db.query.rows[0].id, JSON.stringify(body));
  // await ctx.redis.set(user.id, JSON.stringify(user));
  // const result = await ctx.redis.get(JSON.parse(user.id));
  // console.log(result);

  // console.log(ctx.body);
  // console.log(process.env.USERNAME_DB);
}

async function signIn(ctx) {
  await passport.authenticate('local', (err, user) => {
    if (user) {
      ctx.body = user;
    } else {
      ctx.status = 400;
      if (err) {
        ctx.body = { error: err };
      }
    }
  })(ctx);
}

async function refresh(ctx) {
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
    // id: user.getId(),
    id: user.id,
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

async function getUser(ctx) {
  const { body } = ctx.request;
  const { userId } = ctx.request.params;
  const getUserResponse = await db.query(
    `SELECT * FROM "user" WHERE id = '${userId}'`
  );

  const user = { ...getUserResponse.rows[0] };

  ctx.status = 200;
  ctx.body = {
    id: user.id,
    fname: user.fname,
    lname: user.lname,
    uname: user.uname,
    email: user.email,
  };
  console.log(ctx.body);
}

async function getUsers(ctx) {
  const { body } = ctx.request;
  const getUserResponse = await db.query(`SELECT * FROM "user"`);
  // console.log(getUserResponse);
  // const user = { ...getUserResponse.rows };
  const users = getUserResponse.rows;

  ctx.status = 200;
  ctx.body = {
    users,
  };

  console.log(users);

  // users.map((el) => {
  //   // console.log(el);
  //   // console.log(el.id, el.fname, el.lname);
  //   ctx.body = {
  //     id: el.id,
  //     fname: el.fname,
  //     lname: el.lname,
  //   };
  // });
  // ctx.body = {
  //   id: user.id,
  //   fname: user.fname,
  //   lname: user.lname,
  // };

  // console.log(users);
}

async function deleteUser(ctx) {
  const { body } = ctx.request;
  const { userId } = ctx.request.params;
  const deleteUserResponse = await db.query(
    `DELETE FROM "user" WHERE id = ${userId} RETURNING *`
  );

  const user = { ...deleteUserResponse.rows[0] };

  ctx.status = 204;
  ctx.body = {
    message: 'DELETE',
    fname: user.fname,
  };
}

async function updateUser(ctx) {
  const { id, fname, lname } = ctx.request.body;
  const { userId } = ctx.request.params;

  const updateUserResponse = await db.query(
    `UPDATE "user" SET fname = '${fname}', lname = '${lname}' WHERE id = '${userId}' RETURNING *`
  );

  const user = { ...updateUserResponse.rows };

  ctx.status = 202;
  ctx.body = {
    id: user.id,
    fname: user.fname,
    lname: user.lname,
  };
}

async function home(ctx) {
  await ctx.render('home');
}

async function signin11(ctx) {
  await ctx.render('sign-in-1-1', { title: 'Sign in' });
  // console.log(ctx.request.query);
  // const { body } = ctx.request;
  // console.log('tik');
  // console.log(ctx.request);
  console.log(db);
}

async function passwordrecovery(ctx) {
  await ctx.render('password-recovery', { title: 'Password recovery' });
}

async function passwordrecovery2(ctx) {
  await ctx.render('password-recovery-2', { title: 'Password recovery' });
}

async function passwordrecovery3(ctx) {
  await ctx.render('password-recovery-3', { title: 'Password recovery' });
}

async function signup1(ctx) {
  await ctx.render('sign-up-1', { title: 'Password recovery' });
}

async function signup2(ctx) {
  await ctx.render('sign-up-2', { title: 'Password recovery' });
}

async function signup3(ctx) {
  await ctx.render('sign-up-3', { title: 'Password recovery' });
}

async function signup4(ctx) {
  await ctx.render('sign-up-4', { title: 'Password recovery' });
}

async function signup5(ctx) {
  await ctx.render('sign-up-5', { title: 'Password recovery' });
}

async function signup6(ctx) {
  await ctx.render('sign-up-6', { title: 'Password recovery' });
}

async function profilepersonal(ctx) {
  const users = (await db.query('SELECT * FROM "user"')).rows;
  console.log(users);
  await ctx.render('profile-personal', {
    title: 'Password recovery',
    name: 'string',
  });
}

async function profileaccount(ctx) {
  await ctx.render('profile-account', { title: 'Password recovery' });
}

async function searchresults(ctx) {
  await ctx.render('search-results', { title: 'Password recovery' });
}

async function searchresultsmap(ctx) {
  await ctx.render('search-results-map', { title: 'Password recovery' });
}

async function adminmanagefixers(ctx) {
  await ctx.render('admin-manage-fixers', { title: 'Password recovery' });
}

module.exports = {
  home,
  signin11,
  passwordrecovery,
  passwordrecovery2,
  passwordrecovery3,
  signup1,
  signup2,
  signup3,
  signup4,
  signup5,
  signup6,
  profilepersonal,
  profileaccount,
  searchresults,
  searchresultsmap,
  adminmanagefixers,
  createUser,
  signIn,
  getUser,
  deleteUser,
  getUsers,
  updateUser,
  profile,
  refresh,
};
