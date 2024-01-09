import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Box, Button, Typography, styled } from '@mui/material'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'

const posts = [
  { src: 'path-to-image-2.jpg', text: 'Description for Image 2' },
  {
    src: '/img/Rigs_of_Vienna.jpg',
    text: 'This is the special meal in the popular Vienna resturant: Rigs of Vienna',
  },
  {
    src: '/img/swiss.jpg',
    text: 'This is the special meal in the popular Vienna resturant: Rigs of Vienna',
  },
]

const PostContainer = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100vh',
})

const PostImage = styled('img')({
  maxWidth: '80%',
  maxHeight: '60vh',
})

const NextButton = styled(Button)({
  position: 'absolute',
  right: '10px',
  top: '50%',
  transform: 'translateY(-50%)',
})

const Post = () => {
  let { id } = useParams()
  const [post, setPost] = useState(null)

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

  return (
    <PostContainer>
      <PostImage
        src={'data:image/jpeg;base64,' + post.images[0]}
        alt={`Post ${post.title}`}
      />
      <Typography variant="body1">{post.content}</Typography>
      {/* Handle next post logic */}
    </PostContainer>
  )
}

export default Post
