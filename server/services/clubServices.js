const clubsModel = require("../models/ClubModel");

async function findClubByUsername(username, fieldFilter = {}) {
  return await clubsModel.findOne({ username: username }, fieldFilter).lean();
}

async function getClubsInfo(fieldFilter) {
  return await clubsModel.find({}, fieldFilter).lean();
}

async function findClubById(id, fieldFilter = {}) {
  return await clubsModel.findOne({ _id: id }, fieldFilter).lean();
}

async function authorizeClub(username, password) {
  const result = await clubsModel
    .find({
      username: username,
      password: password,
    })
    .lean();
  if (result.length != 0) return result[0];
  return false;
}

async function updateClubInfo(fieldFilter, updatedFields) {
  try {
    return [
      true,
      await clubsModel
        .findOneAndUpdate(fieldFilter, updatedFields, { new: true })
        .lean(),
    ];
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

// Gets details that are needed to show in a card
async function getPublicClubsInfo() {
  const disallowedFields = { _id: 0 };
  const allowedFields = {
    username: 1,
    acronym: 1,
    tagline: 1,
    cover_photo_url: 1,
    profile_photo_url: 1,
  };
  const fieldFilter = { ...allowedFields, ...disallowedFields };
  return await getClubsInfo(fieldFilter);
}

// Gets long description of a club with its username
async function getAuxiliaryDetails(username) {
  const disallowedFields = { _id: 0 };
  const allowedFields = {
    // username: 1,
    description: 1,
  };
  const fieldFilter = { ...allowedFields, ...disallowedFields };
  return await findClubByUsername(username, fieldFilter);
}

/**
 * Creates a club in the clubs collection
 * @param {Object} record should contain all the required fields pertaining to the clubs model
 */
async function createClub(record) {
  // return await clubsModel.create({
  //   username: record.username,
  //   password: record.password,
  //   name: record.name,
  //   acronym: record.acronym,
  //   tagline: record.tagline,
  //   description: record.description,
  //   cover_photo_url: record.cover_photo_url,
  //   profile_photo_url: record.profile_photo_url,
  // });
  return await clubsModel.create(record);
}

module.exports = {
  updateClubInfo,
  findClubById,
  authorizeClub,
  findClubByUsername,
  getPublicClubsInfo,
  getAuxiliaryDetails,

  createClub,
};
