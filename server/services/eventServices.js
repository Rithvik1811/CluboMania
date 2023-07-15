const eventModel = require("../models/EventModel");

// Save for later
async function findClubByEventId(id) {
  const event = await eventModel.findOne({ _id: id });
  return clubsModel.findOne({ _id: event.club_id });
}

async function findEventById(id, fieldFilter) {
  return eventModel.findOne({ _id: id }, fieldFilter);
}
async function findEventsByClubId(id, fieldFilter = {}) {
  return eventModel.find({ club_id: id }, fieldFilter).lean();
}

async function deleteEvents(fieldFilter) {
  return await eventModel.deleteOne(fieldFilter);
}

async function _deleteMutipleEvents(fieldFilter = {}) {
  return await eventModel.deleteMany(fieldFilter);
}

// for creation the controller will handle the security of the data
/**
 * { club_id, title, thumbnail_url, body_preview, body }
 * @param {Object} event event details to be added to the DB
 * @returns Array - [Boolean, (event details | Array of errors)]
 */
async function createEvent(event) {
  try {
    return [true, (await eventModel.create(event)).toObject()];
  } catch (err) {
    console.log(Object.keys(err.errors));
    const errorArr = [];
    for (field in err.errors) {
      errorArr.push({
        field: err.errors[field].properties.path,
        message: err.errors[field].properties.message,
        value: err.errors[field].properties.value,
      });
      // console.log(err.errors[field].properties.path);
      // console.log(err.errors[field].properties.message);
      // console.log(err.errors[field].properties.value);
      // console.log("----------------");
    }
    return [false, errorArr];
  }
}

async function updateEvent(fieldFilter, updatedFields) {
  try {
    const result = await eventModel
      .findOneAndUpdate(fieldFilter, updatedFields, { new: true })
      .lean();
    if (result === null) {
      const errorArr = [{ msg: "event not found" }];
      return [false, errorArr];
    }
    return [true, result];
  } catch (err) {
    console.log(Object.keys(err.errors));
    const errorArr = [];
    for (field in err.errors) {
      errorArr.push({
        field: err.errors[field].properties.path,
        message: err.errors[field].properties.message,
        value: err.errors[field].properties.value,
      });
    }
    return [false, errorArr];
  }
}

async function deleteEvent(fieldFilter) {
  try {
    const result = await eventModel.deleteOne(fieldFilter).lean();
    if (result === null) {
      const errorArr = [{ msg: "event not found" }];
      return [false, errorArr];
    }
    return [true, result];
  } catch (err) {
    console.log(Object.keys(err.errors));
    const errorArr = [];
    for (field in err.errors) {
      errorArr.push({
        field: err.errors[field].properties.path,
        message: err.errors[field].properties.message,
        value: err.errors[field].properties.value,
      });
    }
    return [false, errorArr];
  }
}

module.exports = {
  deleteEvent,
  updateEvent,
  findEventById,
  findEventsByClubId,
  createEvent,
};
