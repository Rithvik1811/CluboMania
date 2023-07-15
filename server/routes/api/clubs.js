const express = require("express");
const router = express.Router();
const clubServices = require("../../services/clubServices");
const eventServices = require("../../services/eventServices");
const sessionServices = require("../../services/sessionServices");
const miscServices = require("../../services/miscServices");

async function isAuthorized(cookie_header) {
  if (cookie_header === undefined) return false;
  const cookies = await retrieveCookies(cookie_header);
  const session_id = cookies.session_id;
  const id = await sessionServices.checkCookie(session_id);
  if (!id) return false;
  return id;
}

async function retrieveCookies(cookies) {
  const cookie_obj = {};
  cookies.split(";").forEach((cookie) => {
    const pairs = cookie.split("=");
    cookie_obj[pairs[0].trim()] = pairs[1];
  });
  return cookie_obj;
}

// GET REQUESTS
/**
 * Get Public Club Details
 * Sends the public information of all clubs
 */
router.get("/clubs", async (req, res) => {
  const resultQuery = await clubServices.getPublicClubsInfo();
  return res.json(resultQuery);
});

/**
 * Auxiliary Public Club Details
 */
router.get("/club/:club_username", async (req, res) => {
  if (req.query["auxiliary_details"] === "true") {
    const resultQuery = await clubServices.getAuxiliaryDetails(
      req.params.club_username
    );
    if (!resultQuery) return res.status(403).json({});
    return res.json(resultQuery);
  }
  if (req.query["full_details"] === "true") {
    const resultQuery = await clubServices.findClubByUsername(
      req.params.club_username,
      { _id: 0, password: 0, __v: 0 }
    );
    if (!resultQuery) return res.status(403).json({});
    return res.json(resultQuery);
  }
  return res.status(400).json({ msg: "incorrect request" });
});

/**
 * Get events from club username
 * request params:
 * club_username: username of the club
 *
 */
router.get("/events/:club_username", async (req, res) => {
  const username = req.params.club_username;
  const clubIdObject = await clubServices.findClubByUsername(username, {
    _id: 1,
  });
  // const result = await eventServices.findEventsByClubId(club_id, { title: 1 });
  const eventObjectList = await eventServices.findEventsByClubId(clubIdObject, {
    _id: 1,
  });
  if (!eventObjectList) return res.status(403).json({});
  const eventIdList = [];
  eventObjectList.forEach((result) => eventIdList.push(result._id.toString()));
  return res.json(eventIdList);
});

/**
 * Fetches the club details of the logged in club user
 * Authorized User Protection
 */
// router.get("/login", async (req, res) => {
//   const auth = await isAuthorized(req.headers.cookie);
//   if (auth) return res.json(auth);
//   return res.status(403).json({ msg: "user not authorized" });
// });

/**
 * Fetches the basic details of an event
 * request params:
 * event_id: MongoDB Id of the event
 *
 * user params:
 * fields[] = [title, body, pic_url]
 */
router.get("/event/:event_id", async (req, res) => {
  const event_id = req.params.event_id;
  if (!miscServices.checkValidId(event_id))
    return res.status(404).json({ error: "Invalid ID" });
  const disallowedFields = ["_id", "club_id", "__v"];
  const userFields = req.query.fields;
  // console.log(userFields);
  const fieldFilter = {};
  disallowedFields.forEach((key) => {
    // TODO: Mark it and send a 403
    fieldFilter[key] = 0;
  });
  const result = await eventServices.findEventById(event_id, fieldFilter);
  if (!result) return res.status(403).json({ msg: "Event does not exist" });

  const finalResult = {};
  userFields.forEach((key) => {
    const value = result.get(key);
    if (value) finalResult[key] = value;
  });
  return res.send(finalResult);
});

/**
 * Fetches the full internal details of the club
 * Authorized User Protection
 */
router.get("/login", async (req, res) => {
  const auth = await isAuthorized(req.headers.cookie);
  if (!auth) return res.status(401).send({ msg: "not authorized" });
  const clubDetails = await clubServices.findClubById(auth, { _id: 0, __v: 0 });
  if (!clubDetails) return res.status(403).json({});
  return res.json(clubDetails);
});

// -------------POST REQUESTS -----------------
/**
 * Authenticates user and send a session id back and asks the
 * browser to store it in a cookie
 */
router.post("/login", async (req, res) => {
  const club_details = await clubServices.authorizeClub(
    req.body.username,
    req.body.password
  );
  if (!club_details) return res.status(401).json({ msg: "unauthorized" });
  const session_id = await sessionServices.createSession(club_details._id);
  const disallowedFields = ["_id", "__v"];
  disallowedFields.forEach((key) => {
    delete club_details[key];
  });
  return res.cookie("session_id", session_id).json(club_details);
});

/**
 * Create Event
 * Authorized User Protection
 */
router.post("/create_event", async (req, res) => {
  const auth = await isAuthorized(req.headers.cookie);
  if (!auth) return res.status(401).send({ msg: "not authorized" });
  const result = await eventServices.createEvent({
    club_id: auth._id,
    title: req.body.title,
    thumbnail_url: req.body.thumbnail_url,
    body_preview: req.body.body_preview,
    body: req.body.body,
  });
  if (result[0]) {
    const fieldsToDelete = ["club_id", "__v"];
    fieldsToDelete.forEach((field) => {
      delete result[1][field];
    });
    return res.send(result[1]);
  } else {
    // Send Bad Request
    return res.status(400).send({ errors: result[1] });
  }
});

/**
 * club logout
 * Authorized User Protection
 */
router.post("/logout", async (req, res) => {
  const cookie_header = req.headers.cookie;
  if (cookie_header === undefined)
    return res.status(401).json({ msg: "not authorized" });
  const cookies = await retrieveCookies(cookie_header);
  sessionServices.expireSession(cookies.session_id);
  return res.status(200).json({ msg: "Cookie deleted" });
});
// -------------PUT REQUESTS -----------------
/**
 * Edits event info
 * Authorized User Protection
 */
router.put("/edit_event", async (req, res) => {
  const auth = await isAuthorized(req.headers.cookie);
  if (!auth) return res.status(401).send({ msg: "not authorized" });
  // const requiredFields = ["_id"];
  const fieldFilter = { _id: req.body["id"], club_id: auth };
  delete req.body["id"];
  if (fieldFilter["_id"] === undefined)
    return res.status(400).send({ msg: "missing id" });
  if (!miscServices.checkValidId(fieldFilter["_id"]))
    return res.status(400).send({ msg: "invalid id" });

  const validFields = ["title", "thumbnail_url", "body_preview", "body"];
  for (field of Object.keys(req.body)) {
    if (validFields.indexOf(field) === -1) {
      return res
        .status(400)
        .send({ field: field, msg: "invalid field to update" });
    }
  }
  const result = await eventServices.updateEvent(fieldFilter, req.body);

  if (result[0]) {
    const fieldsToDelete = ["club_id", "__v"];
    fieldsToDelete.forEach((field) => {
      delete result[1][field];
    });
    return res.send(result[1]);
  } else {
    // Send Bad Request
    return res.status(400).send({ errors: result[1] });
  }
});

/**
 * Edits club info
 * Authorized User Protection
 */
router.put("/club_info", async (req, res) => {
  const auth = await isAuthorized(req.headers.cookie);
  if (!auth) return res.status(401).send({ msg: "not authorized" });
  const fieldFilter = { _id: auth };
  // const validFields = [
  //   "username",
  //   "password",
  //   "short_name",
  //   "long_name",
  //   "short_desc",
  //   "long_desc",
  //   "profile_photo",
  //   "cover_photo",
  // ];
  const validFields = [
    "username",
    "password",
    "acronym",
    "name",
    "tagline",
    "description",
    "profile_photo_url",
    "cover_photo_url",
  ];
  for (field of Object.keys(req.body)) {
    if (validFields.indexOf(field) === -1) {
      return res
        .status(400)
        .send({ field: field, msg: "invalid field to update" });
    }
  }
  const result = await clubServices.updateClubInfo(fieldFilter, req.body);

  // TODO: if field filter failed (wrong ID) then send response error
  // Example if you give a event id instead of club id
  if (result[0]) {
    const fieldsToDelete = ["_id", "__v"];
    fieldsToDelete.forEach((field) => {
      delete result[1][field];
    });
    return res.send(result[1]);
  } else {
    // Send Bad Request
    return res.status(400).send({ errors: result[1] });
  }
});

// -------------DELETE REQUESTS -----------------

/**
 * Deletes an event by id
 * Authorized User Protection
 */
router.delete("/delete_event", async (req, res) => {
  const auth = await isAuthorized(req.headers.cookie);
  if (!auth) return res.status(401).send({ msg: "not authorized" });
  // const requiredFields = ["_id"];
  const fieldFilter = { _id: req.body["id"], club_id: auth };
  // delete req.body["_id"];
  if (fieldFilter["_id"] === undefined)
    return res.status(400).send({ msg: "missing id" });
  if (!miscServices.checkValidId(fieldFilter["_id"]))
    return res.status(400).send({ msg: "invalid id" });
  const result = await eventServices.deleteEvent(fieldFilter);
  return res.json({ deleted: result[0] });
});

// router.post("/edit_info", async (req, res) => {
//   const new_info = req.body;
//   console.log(new_info);
//   const s = await isAuthorized(req.headers.cookie);
//   console.log(s);
//   const result = await clubServices.getPublicClubsInfo(s);
//   console.log(result);
//   res.json(result);
// });

module.exports = router;
