const { isError } = require('joi');
const Redis = require('ioredis');
const db = require('./db/db');
const validator = require('./validator');

async function createUser(ctx) {
  const { body } = ctx.request;
  await validator.schema.validateAsync(body);

  const createUserResponse = await db.query(
    `INSERT INTO "user" (fname, lname, uname, email) VALUES ('${body.fname}', '${body.lname}', '${body.uname}', '${body.email}') RETURNING *`
  );

  const user = createUserResponse.rows[0];

  ctx.status = 200;
  ctx.body = {
    id: user.id,
    fname: user.fname,
    lname: user.lname,
    uname: user.uname,
    email: user.email,
  };

  // await db.mset(createUserResponse.rows[0].id, JSON.stringify(body));
  await ctx.redis.set(user.id, JSON.stringify(user));
  const result = await ctx.redis.get(JSON.parse(user.id));
  console.log(result);

  console.log(ctx.body);
}

async function getUser(ctx) {
  const { body } = ctx.request;
  const { userId } = ctx.request.params;
  const getUserResponse = await db.query(
    `SELECT * FROM "user" WHERE id = '${userId}'`
  );

  const user = { ...getUserResponse.rows[0] };

  ctx.status = 302;
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

  const user = { ...getUserResponse.rows };

  ctx.status = 302;
  ctx.body = {
    id: user.id,
    fname: user.fname,
    lname: user.lname,
  };

  console.log(user);
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
  getUser,
  deleteUser,
  getUsers,
  updateUser,
};
