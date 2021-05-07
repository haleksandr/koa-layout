const Router = require('koa-joi-router');
const passport = require('koa-passport');

const { UsersController } = require('./users.controller');
const UserValidator = require('./users.validator');

const router = new Router();

router.get(
  'profile',
  passport.authenticate('jwt', { session: false }),
  UsersController.profile
);
router.get('refresh/token', UsersController.refresh); // refresh token
router.post('create-user', UsersController.createUser); // create new user
// router.post('/', UserValidator.signUp, UsersController.createUser);
router.post('sign-in', UsersController.signIn); // sign in
router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  UsersController.userList
);
router.get('users', UsersController.userList);
router.delete('delete-user/:userId', UsersController.deleteUser);
router.put('update-personal-information/:userId', UsersController.updatePersonalInformation); // change personal information
router.put('update-account-information/:userId', UsersController.updateAccountInformation); // change account information

router.put(
  '/photo',
  passport.authenticate('jwt', { session: false }),
  UsersController.updatePhoto
);

// router.get('get-user/:userId', controllers.getUser); // get one user
// router.get('get-users', userControllers.getUsers); // get all users
// router.put('update-user/:userId', userControllers.updateUser); // change user information
// router.delete('delete-user/:userId', userControllers.deleteUser); // delete user

module.exports = router;
