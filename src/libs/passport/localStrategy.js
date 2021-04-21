const LocalStrategy = require('passport-local');
const jwt = require('jwt-simple');

const { UserDB } = require('../../models/user/UserDB');

const opts = {
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback: true,
  session: false,
};

module.exports = new LocalStrategy(opts, async (req, email, password, done) => {
  UserDB.checkPassword(email, password)
    .then((checkPasswordResponse) => {
      console.log(checkPasswordResponse);
      if (!checkPasswordResponse.flag) {
        return done({ message: checkPasswordResponse.message }, false);
      }

      const { user } = checkPasswordResponse;

      const accessTokenPayload = {
        // id: user.getId(),
        id: user.id,
        expiresIn: new Date().setTime(new Date().getTime() + 200000),
      };

      const refreshTokenPayload = {
        email: user.email,
        expiresIn: new Date().setTime(new Date().getTime() + 100000),
      };

      const accessToken = jwt.encode(accessTokenPayload, 'super_secret');
      const refreshToken = jwt.encode(
        refreshTokenPayload,
        'super_secret_refresh'
      );

      user.tokens = { accessToken, refreshToken };

      return done(null, user);
    })
    .catch((err) => done({ message: err.message }, false));
});
