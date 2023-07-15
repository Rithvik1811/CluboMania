const mongoose = require("mongoose");

const sessionsSchema = new mongoose.Schema({
  session_id: {
    type: mongoose.SchemaTypes.String,
    required: true,
  },
  club_id: {
    type: mongoose.SchemaTypes.ObjectId,
    required: true,
  },
  expiry: {
    type: mongoose.SchemaTypes.Date,
    required: true,
  },
});

const sessionsModel = mongoose.model("Sessions", sessionsSchema);

module.exports = sessionsModel;
