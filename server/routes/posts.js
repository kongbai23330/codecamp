var express = require("express");
var router = express.Router();
const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

var Post = require("../model/Post");

router.post("/image", upload.array("images", 6), async (req, res) => {
  const { title, content } = req.body;
  let images = [];

  if (req.files) {
    images = req.files.map((file) => {
      return Buffer.from(file.buffer).toString("base64");
    });
  }
  console.log(req.body);
  try {
    const newPost = new Post({
      title,
      content,
      images,
    });

    const savedPost = await newPost.save();
    res.status(201).json(savedPost);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.get("/", async (req, res, next) => {
  try {
    const posts = await Post.find();
    res.json(posts);
  } catch (err) {
    next(err);
  }
});

router.get("/detail", async (req, res) => {
  try {
    const post = await Post.findById(req.query.id);
    if (!post) {
      return res.status(404).send("Post not found");
    }
    console.log(post);
    res.json(post);
  } catch (error) {
    res.status(500).send("Server error");
  }
});

module.exports = router;
