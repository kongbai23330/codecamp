// Page.js
import React from 'react'
import ImageCard from './ImageCard'
import { Box, styled } from '@mui/material'

class Page extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      posts: [],
    }
  }

  componentDidMount() {
    this.fetchPosts()
  }

  fetchPosts = async () => {
    try {
      const response = await fetch('http://localhost:1234/posts', {
        method: 'get',
      })
      if (!response.ok) {
        throw new Error('Network response was not ok')
      }
      const data = await response.json()
      this.setState({ posts: data })
    } catch (error) {
      console.error('Could not fetch posts: ', error)
    }
  }

  render() {
    const { posts } = this.state
    const { searchVal = '' } = this.props // Assuming searchVal is passed as a prop

    const ImageCardStyled = styled(ImageCard)({
      maxWidth: '250px',
      height: 'auto',
    })

    return (
      <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
        <Box sx={{ display: 'flex', flexGrow: 1 }}>
          <Box sx={{ flexGrow: 1, p: 5 }}>
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: 'repeat(5, 1fr)',
                gap: 2,
              }}
            >
              {posts
                .filter((post) =>
                  post.title.toLowerCase().includes(searchVal.toLowerCase()),
                )
                .map((post) => (
                  // post.images.map((image, index) => (
                  //   <ImageCardStyled
                  //     key={`${post._id}_${index}`}
                  //     src={`data:image/jpeg;base64,${post.images[index]}`}
                  //     label={post.title}
                  //     id={post._id}
                  //   />
                  // )),
                  <ImageCardStyled
                    key={`${post._id}`}
                    src={`data:image/jpeg;base64,${post.images[0]}`}
                    label={post.title}
                    id={post._id}
                  />
                ))}
            </Box>
          </Box>
        </Box>
      </Box>
    )
  }
}

export default Page
