async function home(ctx) {
  await ctx.render('home');
}

async function signin11(ctx) {
  await ctx.render('sign-in-1-1', { title: 'Sign in' });
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
  await ctx.render('profile-personal', { title: 'Password recovery' });
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
};
