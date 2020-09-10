const mongoose = require("mongoose");
const Joi = require("joi");

const newsArticleSchema = new mongoose.Schema({
  title: {
    type: String,
    minlength: 2,
    maxlength: 100,
    required: true,
  },
  description: {
    type: String,
    maxlength: 150,
  },
  articleLink: {
    type: String,
  },
});

const NewsArticle = mongoose.model("NewsArticle", newsArticleSchema);

function validateNewsArticle(newsArticle) {
  const schema = {
    title: Joi.string.min(2).max(100).required(),
    description: Joi.string().max(150),
    articleLink: Joi.string(),
  };

  return Joi.validate(newsArticle, schema);
}

module.exports.NewsArticle = NewsArticle;
module.export.validateNewsArticle = validateNewsArticle;
