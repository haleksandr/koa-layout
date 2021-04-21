const Router = require('koa-router');
const passport = require('koa-passport');

const controllers = require('./users.controller');

const router = new Router();

router.post('create-user', controllers.createUser); // create new user
router.post('sign-in', controllers.signIn); // sign in
router.get('refresh/token', controllers.refresh); // refresh token
// router.get('get-user/:userId', controllers.getUser); // get one user
router.get(
  'profile',
  passport.authenticate('jwt', { session: false }),
  controllers.profile
);
router.get('get-users', controllers.getUsers); // get all users
router.put('update-user/:userId', controllers.updateUser); // change user information
router.delete('delete-user/:userId', controllers.deleteUser); // delete user

module.exports = {
  router,
};
