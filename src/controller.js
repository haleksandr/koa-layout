async function profile(ctx) {
  await ctx.render('index', { name: 'Sasha' });
}

module.exports = {
  profile,
};
