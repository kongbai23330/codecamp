var express = require('express')
var router = express.Router()
const multer = require('multer')
const storage = multer.memoryStorage()
const upload = multer({ storage: storage })
const authMiddleware = require('../middleware/auth')
const Comment = require('../model/Comment');

var Post = require('../model/Post')

router.post(
  '/image',
  authMiddleware,
  upload.array('images', 6),
  async (req, res) => {
    const { title, content, creator } = req.body
    let images = []
    if (req.files) {
      images = req.files.map((file) => {
        return Buffer.from(file.buffer).toString('base64')
      })
    }
    try {
      const newPost = new Post({
        title,
        content,
        images,
        creator,
      })
      const savedPost = await newPost.save()
      res.status(201).json(savedPost)
    } catch (error) {
      res.status(400).json({ message: error.message })
    }
  },
)

router.get('/', async (req, res, next) => {
  const page = parseInt(req.query.page) || 0; 
  const limit = parseInt(req.query.limit) || 20; 

  try {
    const posts = await Post.find()
      .skip(page * limit)
      .limit(limit) 
      .sort({ createdAt: -1 });

    res.json(posts);
  } catch (err) {
    next(err);
  }
});

router.get('/search', async (req, res) => {
  const searchQuery = req.query.q || '';
  try {
    const posts = await Post.find({ 
      $or: [
        { title: new RegExp(searchQuery, 'i') },
        { content: new RegExp(searchQuery, 'i') }
      ]
    });
    res.json(posts);
  } catch (error) {
    res.status(500).send('Server error');
  }
});



router.get('/detail', async (req, res) => {
  try {
    const post = await Post.findById(req.query.id)
    if (!post) {
      return res.status(404).send('Post not found')
    }
    res.json(post)
  } catch (error) {
    res.status(500).send('Server error')
  }
})


router.post('/comment', authMiddleware, async (req, res) => {
  const { content, postId } = req.body;
  const creator = req.user.email;
  console.log(req.user, 'admin')
  try {
    const newComment = new Comment({
      content,
      postId,
      creator
    });

    const savedComment = await newComment.save();
    res.status(201).json(savedComment);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.get('/comments', async (req, res) => {
  console.log(23432423)
  const postId = req.query.postId;

  try {
    const comments = await Comment.find({ postId }).sort({ createdAt: -1 });
    res.json(comments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


module.exports = router;
