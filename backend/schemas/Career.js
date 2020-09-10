const mongoose = require("mongoose");
const Joi = require("joi");
const Schema = mongoose.Schema;

const careerSchema = new Schema({
  title: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 100,
  },
  location: {
    type: String,
    required: true,
    enum: ["Omaha, NE", "Lincoln, NE", "Remote"],
  },
  appLink: {
    type: String,
  },
});

const Career = mongoose.model("Career", careerSchema);

function validateCareer(career) {
  const schema = {
    title: Joi.string().min(2).max(100).required(),
    location: Joi.string()
      .valid(["Omaha, NE", "Lincoln, NE", "Remote"])
      .required(),
    appLink: Joi.string(),
  };

  return Joi.validate(career, schema);
}

module.exports.Career = Career;
module.exports.validateCareer = validateCareer;
