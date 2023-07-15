function generateRandomNumber(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

function generateRandomCharacters(length) {
  let randomString = ``;
  for (let i = 0; i < length; i++) {
    randomString += String.fromCharCode(generateRandomNumber(97, 122));
  }
  return randomString;
}

module.exports = { generateRandomNumber, generateRandomCharacters };
