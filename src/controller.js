const { isError } = require('joi');
const db = require('./db/db');
const validator = require('./validator');

async function createUser(ctx) {
  const { body } = ctx.request;
  await validator.schema.validateAsync(body);

  const createUserResponse = await db.query(
    `INSERT INTO "user" (fname, lname) VALUES ('${body.fname}', '${body.lname}') RETURNING *`
  );

  const user = createUserResponse.rows[0];
  ctx.status = 201;
  ctx.body = {
    id: user.id,
    firstName: user.fname,
    lastName: user.lname,
  };

  console.log(ctx.body);
}

async function getUser(ctx) {
  const { body } = ctx.request;
  const { userId } = ctx.request.params;
  const getUserResponse = await db.query(
    `SELECT * FROM "user" WHERE id = '${userId}'`
  );
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
};
