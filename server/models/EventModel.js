const mongoose = require("mongoose");
const { lengthValidator, isEmptyString } = require("./validators/validators");

const missingFieldMessage = "missing field";
// Visible to frontend as well
const fieldLengths = {
  title: { min: 1, max: 30 },
  body_preview: { min: 10, max: 150 },
};
// /Visible to frontend as well
const eventSchema = new mongoose.Schema({
  club_id: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "Clubs",
    required: [true, missingFieldMessage],
  },
  title: {
    type: mongoose.SchemaTypes.String,
    required: [true, missingFieldMessage],
    minLength: [
      fieldLengths.title.min,
      `length constraint not met - Min: ${fieldLengths.title.min}`,
    ],
    maxLength: [
      fieldLengths.title.max,
      `length constraint not met - Max: ${fieldLengths.title.max}`,
    ],
  },
  thumbnail_url: {
    type: mongoose.SchemaTypes.String,
    required: [true, missingFieldMessage],
  },
  body_preview: {
    type: mongoose.SchemaTypes.String,
    required: [true, missingFieldMessage],
    minLength: [
      fieldLengths.body_preview.min,
      `length constraint not met - Min: ${fieldLengths.body_preview.min}`,
    ],
    maxLength: [
      fieldLengths.body_preview.max,
      `length constraint not met - Max: ${fieldLengths.body_preview.max}`,
    ],
  },
  body: {
    type: mongoose.SchemaTypes.String,
    required: [true, missingFieldMessage],
  },
});

eventSchema.pre("findOneAndUpdate", function () {
  this.options.runValidators = true;
});

// Custom Validation
eventSchema.pre("validate", async function (next) {
  // length validation
  // const newRecord = this;
  let cleanRecord = true;
  // const obj = {
  //   title: { min: 8, max: 20 },
  //   body_preview: { min: 10, max: 25 },
  // };
  // for ([key, constraints] of Object.entries(obj)) {
  //   if (
  //     typeof this[key] === "string" &&
  //     !lengthValidator(this[key], constraints.min, constraints.max)
  //   ) {
  //     const errorMessage = "length constraint not met";
  //     cleanRecord = false;
  //     this.invalidate(key, errorMessage, this[key]);
  //   }
  // }
  if (cleanRecord) {
    next();
  }
});

const eventModel = mongoose.model("events", eventSchema);
module.exports = eventModel;
