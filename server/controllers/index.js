const mongoose = require("mongoose");
const express = require("express");
const clubServices = require("../services/clubServices");
const { expireSessionsAsync } = require("../services/sessionServices");

const app = express();
const PORT = process.env.PORT || 9000;

app.use(express.json());

// Raw response
// app.use(function (req, res, next) {
//   var data = "";
//   req.setEncoding("utf8");
//   req.on("data", function (chunk) {
//     data += chunk;
//   });
//   req.on("end", function () {
//     req.body = data;
//     next();
//   });
// });

app.use("/api", require("../routes/api/clubs"));
// app.use("/console", require("../routes/console"));

app.listen(PORT, () => {
  console.log(`server running on http://localhost:${PORT}`);
  mongoose.connect(
    "mongodb://localhost:27017/clubomania",
    () => {
      console.log("Connection Established to server");
    },
    (e) => console.log(e)
  );
  // clubServices
  // .createClub({
  //   username: "edc",
  //   password: "edc123456",
  //   name: "Entrepreneurship Development Cell",
  //   acronym: "EDC",
  //   tagline: "Entrepreneu 'rising' ideas",
  //   description:
  //     "Entrepreneurship Development Cell (EDC), CBIT, is a student coordinated club supervised by experienced faculty members. The motto of the club is Entrepreneu 'rising ideas'. The club has a vision  to pave a path towards Entrepreneurial India. The institute aims to groom and support all students with entrepreneurial interests and start up ideas",
  //   profile_photo_url:
  //     "https://instagram.fhyd14-1.fna.fbcdn.net/v/t51.2885-19/234001538_133626902205570_4273246450249704301_n.jpg?stp=dst-jpg_s320x320&_nc_ht=instagram.fhyd14-1.fna.fbcdn.net&_nc_cat=106&_nc_ohc=3xW3KOZwZi0AX_1ZPGc&edm=AOQ1c0wBAAAA&ccb=7-5&oh=00_AfCSiqGK0KWb2oZOUeKgeHNiJxD6nsa1gQgVXaBK2irYQQ&oe=63921824&_nc_sid=8fd12b",
  //   cover_photo_url:
  //     "https://scontent.fhyd14-1.fna.fbcdn.net/v/t39.30808-6/307588511_160002659979220_53307338162365756_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=gXlTC4aEP7IAX-HWsOW&_nc_ht=scontent.fhyd14-1.fna&oh=00_AfBJk3X3YMx3y8LXzEOQYzoUBIGLFq_wxVTSZy6hLV55sg&oe=63918457",
  // })
  // .then((value) => {
  //   console.log(value);
  // });
  // expireSessionsAsync(60);
});
