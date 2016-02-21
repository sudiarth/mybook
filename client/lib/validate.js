// validate form

trimInput = function(value) {
  return value.replace(/^\s*|\s*$/g, '');
};

isNotEmpty = function(value) {
  if (value && value !== ''){
      return true;
  }
  return false;
};

isEmpty = function(value) {
  if (value && value === ''){
      return true;
  }
};

isAge = function(birthday) {
  age = moment(birthday).fromNow().split(" ")[0];
  if (age >= 18){
      return true;
  }
  Session.set('alert', 'Your age under 18 years old');
  return false;
};

isValidDate = function(date) {
  age = moment(date).fromNow().split(" ")[0];
  if (age/24 >= 0){
      return true;
  }
  Session.set('alert', 'Your birthday date is invalid');
  return false;
};

isBaby = function(usg) {
  baby = moment(usg).fromNow().split(" ")[0];
  if (baby >= 1){
      return true;
  }
  Session.set('alert', 'Your baby aged under 1 day old');
  return false;
};

isEmail = function(value) {
  var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  if (filter.test(value)) {
      return true;
  }
  Session.set('alert', 'Please enter a valid email address.');
  return false;
};

isValidPassword = function(password) {
  if (password.length < 6) {
      Session.set('alert', 'Your password should be 6 characters or longer.');
      return false;
  }
  return true;
};

areValidPasswords = function(password, confirm) {
  if (!isValidPassword(password)) {
      return false;
  }
  if (password !== confirm) {
      Session.set('alert', 'Your two passwords are not equivalent.');
      return false;
  }
  return true;
};