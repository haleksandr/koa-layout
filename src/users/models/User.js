// public field
// private field - id, password
// class User, methods - getAuthInfo(this method return id, email, fname, lname)
// getters, setters
// Categories repeat logic

class User {
  constructor(user) {
    this.id = user.id;
    this.fname = user.fname;
    this.lname = user.lname;
    this.uname = user.uname;
    this.email = user.email;
    this.password = user.password;
  }

  get getInfo() {
    return this.fname;
  }
}

module.exports = {
  User,
};
