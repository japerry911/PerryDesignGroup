const mongoose = require("mongoose");
const Joi = require("joi");

const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 100,
  },
  location: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 100,
  },
  designType: {
    type: String,
    minlength: 1,
    maxlength: 100,
    default: "Misc.",
  },
  description: {
    type: String,
    required: true,
    minlength: 30,
    maxlength: 1000,
  },
  images: {
    type: Array,
  },
});

const Project = mongoose.model("Project", projectSchema);

function validateProject(project) {
  const schema = {
    title: Joi.string().min(2).max(100).required(),
    location: Joi.string().min(2).max(100).required(),
    designType: Joi.string().min(1).max(100),
    description: Joi.string().min(30).max(1000).required(),
    images: Joi.array().items({
      url: Joi.string().required(),
      public_id: Joi.string.required(),
    }),
  };

  return Joi.validate(project, schema);
}

module.exports.Project = Project;
module.exports.validateProject = validateProject;
