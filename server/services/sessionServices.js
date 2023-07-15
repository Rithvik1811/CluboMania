const sessionsModel = require("../models/SessionsModel");
const { generateRandomCharacters } = require("../utils/generators");
const { incrementByDay, incrementTime } = require("../utils/time");

async function createSession(club_id) {
  const currentDate = new Date();
  const session_id = generateRandomCharacters(15);
  const timeperiod = {
    hours: 0,
    minutes: 10, //TODO: change duration during final testing
    seconds: 0,
  };
  sessionsModel.create({
    session_id: session_id,
    club_id: club_id,
    // expiry: incrementByDay(currentDate, 7),
    expiry: incrementTime(currentDate, timeperiod),
  });
  return session_id;
}

async function checkCookie(session_id) {
  const result = await sessionsModel.findOne({ session_id: session_id }).lean();
  if (!result) return false;
  // console.log(result);
  return result.club_id;
}

// Can do either by creating an index and setting expiration date (MongoDB driver is involved)
// or
// running a function every x time
// going with the latter as of now
async function expireSessions() {
  const currentUnixTimestamp = new Date().valueOf();
  const result = await sessionsModel.find({});
  const recordsToDelete = [];
  for (let i = 0; i < result.length; i++) {
    const record = result[i];
    if (currentUnixTimestamp > record.expiry.valueOf()) {
      recordsToDelete.push(record._id);
    }
  }
  console.log(recordsToDelete);
  return await sessionsModel.deleteMany({ _id: { $in: recordsToDelete } });
}
async function expireSession(session_id) {
  const result = await sessionsModel.deleteOne({ session_id });
  console.log(result);
}

function expireSessionsAsync(seconds) {
  setInterval(async () => {
    const deletedResults = await expireSessions();
    console.log(deletedResults);
  }, seconds * 1000);
}

module.exports = {
  checkCookie,
  createSession,
  expireSession,
  expireSessions,
  expireSessionsAsync,
};
