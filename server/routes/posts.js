var express = require('express');
var router = express.Router();
var multer = require('multer');
var upload = multer({ dest: 'uploads/' });

var Post = require('../models/post');

router.get('/', async (req, res) => {
    try {
        const posts = await Post.find();
        res.json(posts);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});
// POST route for creating a new post
router.post('/', upload.array('images'), function (req, res, next) {
    // Convert multer's req.files to an array of image paths
    var imagePaths = req.files.map(file => file.path);

    // Create a new post using the title, content from req.body, and image paths
    var newPost = new Post({
        title: req.body.title,
        content: req.body.content,
        images: imagePaths
    });

    // Save the post to the database
    newPost.save(function (err, post) {
        if (err) { return next(err); }
        res.status(201).json(post);
    });
});

// GET route for fetching all posts
router.get('/', function (req, res, next) {
    Post.find(function (err, posts) {
        if (err) { return next(err); }
        res.json(posts);
    });
});
module.exports = router;