// const clubServices = require("../services/clubServices");
// const eventServices = require("../services/eventServices");
// const sessionServices = require("../services/sessionServices");
// const miscServices = require("../services/miscServices");
const mongoose = require("mongoose");

function testSessions() {
  // clubServices
  //   .createClub({
  //     username: "chaaya",
  //     password: "chaaya123456",
  //     name: "Chaaya",
  //     acronym: "chaaya",
  //     tagline: "chaaya is a club and it's a dance club maybe?",
  //     description: "chaaya is a club in CBIT",
  //     profile_photo_url: "./profile",
  //     cover_photo_url: "./cover",
  //   })
  //   .then((value) => {
  //     console.log(value);
  //   });
  // _deleteMutipleEvents();
}
async function main() {
  mongoose.connect(
    "mongodb://localhost/clubbr",
    () => {
      console.log("Connection Established to server");
    },
    (e) => console.log(e)
  );
}

module.exports = {
  testSessions,
};
