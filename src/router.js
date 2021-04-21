const Router = require('koa-router');
const passport = require('koa-passport');

const controllers = require('./controller');

const router = new Router();

router.get('home', controllers.home);
router.get('sign-in-1-1', controllers.signin11);
router.get('password-recovery', controllers.passwordrecovery);
router.get('password-recovery-2', controllers.passwordrecovery2);
router.get('password-recovery-3', controllers.passwordrecovery3);
router.get('sign-up-1', controllers.signup1);
router.get('sign-up-2', controllers.signup2);
router.get('sign-up-3', controllers.signup3);
router.get('sign-up-4', controllers.signup4);
router.get('sign-up-5', controllers.signup5);
router.get('sign-up-6', controllers.signup6);
router.get('profile-personal', controllers.profilepersonal);
router.get('profile-account', controllers.profileaccount);
router.get('search-results', controllers.searchresults);
router.get('search-results-map', controllers.searchresultsmap);
router.get('admin-manage-fixers', controllers.adminmanagefixers);

// CRUD
router.post('create-user', controllers.createUser); // create new user
router.post('sign-in', controllers.signIn); // AZAZAZAZA
router.get('refresh/token', controllers.refresh); // refresh token
router.get('get-user/:userId', controllers.getUser); // get one user
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
