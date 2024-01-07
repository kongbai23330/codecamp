var express = require('express');
var router = express.Router();
var multer = require('multer');
var upload = multer({ dest: 'uploads/' });

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

// GET route for fetching all posts
router.get('/', function (req, res, next) {
    Post.find(function (err, posts) {
        if (err) { return next(err); }
        res.json(posts);
    });
});
module.exports = router;