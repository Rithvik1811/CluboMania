const mongoose = require("mongoose");
const { passwordValidator } = require("./validators/validators");

const clubSchema = new mongoose.Schema({
  username: {
    type: mongoose.SchemaTypes.String,
    required: true,
    lowercase: true,
  },
  password: {
    type: mongoose.SchemaTypes.String,
    required: true,
    validate: {
      validator: passwordValidator,
      message: (props) => `Failed Validation ${props.value}`,
    },
  },
  name: {
    type: mongoose.SchemaTypes.String,
    required: true,
  },
  acronym: {
    type: mongoose.SchemaTypes.String,
    required: true,
  },
  tagline: {
    type: mongoose.SchemaTypes.String,
    required: true,
  },
  description: {
    type: mongoose.SchemaTypes.String,
    required: true,
  },
  cover_photo_url: {
    type: mongoose.SchemaTypes.String,
    required: true,
  },
  profile_photo_url: {
    type: mongoose.SchemaTypes.String,
    required: true,
  },
});

clubSchema.pre("findOneAndUpdate", function () {
  this.options.runValidators = true;
});

const clubsModel = mongoose.model("Clubs", clubSchema);

module.exports = clubsModel;
