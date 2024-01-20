import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import { Box, Typography, IconButton, styled } from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos'; // Old name
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

// const posts = [
//   { src: 'path-to-image-2.jpg', text: 'Description for Image 2' },
//   {
//     src: '/img/Rigs_of_Vienna.jpg',
//     text: 'This is the special meal in the popular Vienna resturant: Rigs of Vienna',
//   },
//   {
//     src: '/img/swiss.jpg',
//     text: 'This is the special meal in the popular Vienna resturant: Rigs of Vienna',
//   },
// ]

const PostContainer = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  maxWidth: '80%',
  margin: 'auto',
  height: 'auto',
})

const PostImage = styled('img')({
  width: '100%',
  maxHeight: '60vh',
  objectFit: 'contain',
})

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
  [position]: theme.spacing(2), // Use 'left' or 'right' based on the 'position' prop
  transform: 'translateY(-50%)',
  zIndex: 2,
  backgroundColor: 'rgba(255,255,255,0.7)',
  '&:hover': {
    backgroundColor: 'rgba(255,255,255,0.9)',
  },
}));
// const NextButton = styled(Button)({
//   position: 'absolute',
//   right: '10px',
//   top: '50%',
//   transform: 'translateY(-50%)',
// })

const Post = () => {
  let { id } = useParams()
  const [post, setPost] = useState(null)
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(
          `http://localhost:1234/posts/detail?id=${id}`,
          {
            method: 'get',
          },
        )
        if (!response.ok) {
          throw new Error('Network response was not ok')
        }
        const data = await response.json()
        setPost(data)
      } catch (error) {
        console.error('Could not fetch post: ', error)
      }
    }

    fetchPost()
  }, [id])

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
    </PostContainer>
  );
}

export default Post
