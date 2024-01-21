import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import { Box, Typography, IconButton, styled, TextField, Button } from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos'; // Old name
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const PostContainer = styled(Box)({
  display: 'flex', 
  flexDirection: 'row', 
  justifyContent: 'flex-start', 
  maxWidth: '100%', 
  margin: 'auto',
  height: 'auto',
});

const PostImage = styled('img')({
  width: '100%',
  maxHeight: '60vh',
  objectFit: 'contain',
})

const PostContentContainer = styled(Box)({
  width: '60%', 
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center', 
  marginRight: '3px',
});

const CommentsContainer = styled(Box)({
  width: '38%',
  marginLeft: '10px',
  maxHeight: '500px', 
  // overflowY: 'auto'
});

const CommentsListContainer = styled(Box)({
  maxHeight: '280px', // 设置评论列表的最大高度
  overflowY: 'auto', // 超出部分显示滚动条
  marginBottom: '5px', // 和发表评论的区域保持一定间距
});

const ImageSlider = styled(Box)({
  position: 'relative',
  width: '100%', // Make sure the slider takes up the full width of its container
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center', // Center the image
});

const ArrowButton = styled(IconButton)(({ theme, position }) => ({
  position: 'absolute',
  top: '50%',
  [position]: theme.spacing(2), 
  transform: 'translateY(-50%)',
  zIndex: 2,
  backgroundColor: 'rgba(255,255,255,0.7)',
  '&:hover': {
    backgroundColor: 'rgba(255,255,255,0.9)',
  },
}));

const Post = () => {
  let { id } = useParams()
  const [post, setPost] = useState(null)
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');

  useEffect(() => {
    const fetchPostAndComments = async () => {
      try {
        const postResponse = await fetch(`http://localhost:1234/posts/detail?id=${id}`);
        const commentsResponse = await fetch(`http://localhost:1234/posts/comments?postId=${id}`);
        if (!postResponse.ok || !commentsResponse.ok) {
          throw new Error('Network response was not ok');
        }
        const postData = await postResponse.json();
        const commentsData = await commentsResponse.json();
        setPost(postData);
        setComments(commentsData);
      } catch (error) {
        console.error('Could not fetch post or comments: ', error);
      }
    };

    fetchPostAndComments();
  }, [id])

  const handleCommentSubmit = async () => {
    try {
      const response = await fetch('http://localhost:1234/posts/comment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({
          content: newComment,
          postId: id
        }),
      });
      if (!response.ok) {
        throw new Error('Failed to post comment');
      }
      const commentData = await response.json();
      setComments([commentData, ...comments]);
      setNewComment('');
    } catch (error) {
      console.error('Error submitting comment:', error);
    }
  };

  if (!post) {
    return <Typography>Loading...</Typography>
  }
  const handlePrev = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : post.images.length - 1));
  };

  const handleNext = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % post.images.length);
  };


  return (
    <PostContainer>
      <PostContentContainer>
        <Typography variant="h5">{post.title}</Typography>
        <Typography variant="body2">
          Post by {post.creator} at {new Date(post.createdAt).toLocaleString()}
        </Typography>
        <ImageSlider>
          <ArrowButton position="left" onClick={handlePrev}>
            <ArrowBackIosIcon />
          </ArrowButton>
          <PostImage
            src={'data:image/jpeg;base64,' + post.images[currentImageIndex]}
            alt={`Post ${post.title}`}
          />
          <ArrowButton position="right" onClick={handleNext}>
            <ArrowForwardIosIcon />
          </ArrowButton>
        </ImageSlider>
        <Typography variant="body1" sx={{ marginTop: '20px' }}>{post.content}</Typography>
      </PostContentContainer>

      <CommentsContainer>
        <Box sx={{ marginBottom: '20px' }}>
          <TextField
            label="Add a comment"
            multiline
            rows={4}
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            variant="outlined"
            fullWidth
            sx={{ marginBottom: '10px' }}
          />
          <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button variant="contained" color="primary" onClick={handleCommentSubmit}>
              Submit Comment
            </Button>
          </Box>
        </Box>

        <Typography variant="h6">Comments</Typography>
        <CommentsListContainer>
          {comments.length > 0 ? comments.map((comment) => (
            <Box key={comment._id} sx={{ marginTop: '10px' }}>
              <Typography variant="body2">{comment.creator}: {comment.content}</Typography>
            </Box>
          )) : <Typography variant="body2">No comments yet.</Typography>}
        </CommentsListContainer>
      </CommentsContainer>

    </PostContainer>
  );

}

export default Post
