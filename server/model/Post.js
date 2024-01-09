var mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  images: [String],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

var Post = mongoose.model("Post", postSchema);

module.exports = Post;
