var express = require('express');
var router = express.Router();
const multer = require('multer');
const storage = multer.memoryStorage(); // Use memory storage
const upload = multer({ storage: storage });

var Post = require('../model/Post');

// router.get('/', async (req, res) => {
//     try {
//         const posts = await Post.find();
//         res.json(posts);
//     } catch (err) {
//         res.status(500).json({ message: err.message });
//     }
// });
// POST route for creating a new post
router.post('/', async (req, res) => {
    const { title, content, images } = req.body;

    try {
        const newPost = new Post({
            title,
            content,
            images // Assuming you send images as an array of strings (URLs)
        });

        const savedPost = await newPost.save();
        res.status(201).json(savedPost);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});
router.post('/image', upload.single('image'), async (req, res) => {
    const { title, content } = req.body;
    let images = [];

    if (req.file) {
        // Convert the file to a Base64 string
        const imgBase64 = Buffer.from(req.file.buffer).toString('base64');
        images.push(imgBase64);
    }

    try {
        const newPost = new Post({
            title,
            content,
            images // Now this contains Base64 strings of images
        });

        const savedPost = await newPost.save();
        res.status(201).json(savedPost);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});
// GET route for fetching all posts
router.get('/', async (req, res, next) => {
    try {
        const posts = await Post.find();
        res.json(posts);
    } catch (err) {
        next(err);
    }
});

module.exports = router;