function passwordValidator(password) {
  return password.length >= 8 && password.length <= 128;
}

function lengthValidator(string, minLength, maxLength) {
  return string.length >= minLength && string.length <= maxLength;
}
function isEmptyString(string) {
  return string.length >= minLength && string.length <= maxLength;
}

module.exports = {
  passwordValidator,
  lengthValidator,
  isEmptyString,
};
