module.exports.validateRegisterInput = (
  username,
  email,
  password,
  confirmPassword
) => {
  const errors = {};
  //username validation
  if (username.trim() === '') {
    errors.username = 'Username must not be empty';
  } else if (username.length <= 4) {
    errors.username = 'Username must be 5 characters long';
  } else {
    const regEx = /^(?=.*[a-zA-Z])(?=.*[0-9])[A-Za-z0-9]+$/;
    if (!username.match(regEx)) {
      errors.username = 'Username must consists of alphabets and numbers only';
    }
  }
  //email validation
  if (email.trim() === '') {
    errors.email = 'Email must not be empty';
  } else {
    const regEx = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!email.match(regEx)) {
      errors.email = 'Email must be a valid email address';
    }
  }
  //password validation
  if (password.trim() === '') {
    errors.password = 'Password must not be empty';
  } else if (password !== confirmPassword) {
    errors.confirmpassword = 'Passwords must match';
  }
  return {
    errors,
    valid: Object.keys(errors).length < 1,
  };
};

module.exports.validateLoginInput = (username, password) => {
  const errors = {};
  //username validation
  if (username.trim() === '') {
    errors.username = 'Username must not be empty';
  } //password validation
  if (password.trim() === '') {
    errors.password = 'Password must not be empty';
  }
  return {
    errors,
    valid: Object.keys(errors).length < 1,
  };
};
