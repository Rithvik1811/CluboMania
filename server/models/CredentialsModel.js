const mongoose = require("mongoose");

const credentialsSchema = new mongoose.Schema({
  club_id: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "Clubs",
    required: true,
  },
  username: {
    type: mongoose.SchemaTypes.String,
    required: true,
  },
  password: {
    type: mongoose.SchemaTypes.String,
    required: true,
  },
});

credentialsSchema.pre("findOneAndUpdate", function () {
  this.options.runValidators = true;
});

const credentialsModel = mongoose.model("Credentials", credentialsSchema);

module.exports = credentialsModel;
