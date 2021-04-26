// public field
// private field - id, password
// class User, methods - getAuthInfo(this method return id, email, fname, lname)
// getters, setters
// Categories repeat logic

class User {
  constructor(user) {
    this._id = user.id;
    this._password = user.password;

    this.fname = user.fname;
    this.lname = user.lname;
    this.uname = user.uname;
    this.email = user.email;
  }

  getInfo(idFlag = false) {
    const responseData = {
      fname: this.fname,
      lname: this.lname,
      uname: this.uname,
      email: this.email,
    };

    if (idFlag) {
      responseData.id = this._id;
    }

    return responseData;
  }

  getId() {
    return this._id;
  }
}

module.exports = { User };
