var express = require('express')
var router = express.Router()
const multer = require('multer')
const storage = multer.memoryStorage()
const upload = multer({ storage: storage })
const authMiddleware = require('../middleware/auth')

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

// Add this to your Express router file

router.get('/', async (req, res, next) => {
  const page = parseInt(req.query.page) || 0; // Default to page 0 if not provided
  const limit = parseInt(req.query.limit) || 20; // Default limit is 20

  try {
    const posts = await Post.find()
      .skip(page * limit) // Skip the previous pages
      .limit(limit) // Limit the number of results
      .sort({ createdAt: -1 }); // Sort by creation date, newest first

    res.json(posts);
  } catch (err) {
    next(err);
  }
});


// Add this to your Express router file

router.get('/search', async (req, res) => {
  const searchQuery = req.query.q || '';
  try {
    // Use MongoDB's text search or regex search features.
    // For larger datasets, consider creating a text index and using $text operator.
    const posts = await Post.find({ 
      $or: [
        { title: new RegExp(searchQuery, 'i') },
        { content: new RegExp(searchQuery, 'i') }
        // Add other fields if you want to search through them as well.
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

module.exports = router
