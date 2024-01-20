// Page.js
import React from 'react';
import ImageCard from './ImageCard';
import { Box, styled } from '@mui/material';

class Page extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      page: 0,
      hasMore: true,
    };
  }

  componentDidMount() {
    this.fetchPosts();
    window.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  fetchPosts = async () => {
    const { page, posts } = this.state;

    if (this.state.hasMore) {
      try {
        const response = await fetch(`http://localhost:1234/posts?page=${page}&limit=20`, { method: 'get' });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const newPosts = await response.json();
        this.setState({
          posts: [...posts, ...newPosts],
          page: page + 1,
          hasMore: newPosts.length === 20, // assuming 20 is the limit per page
        });
      } catch (error) {
        console.error('Could not fetch posts:', error);
      }
    }
  };

  handleScroll = () => {
    const { innerHeight, scrollY } = window;
    const { offsetHeight } = document.documentElement;

    if (innerHeight + scrollY >= offsetHeight - 500) { // Fetch more posts a bit before reaching the bottom
      this.fetchPosts();
    }
  };

  render() {
    const { posts } = this.state;

    const ImageCardStyled = styled(ImageCard)({
      maxWidth: '250px',
      height: 'auto',
    });

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
              {posts.map((post) => (
                <ImageCardStyled
                  key={post._id}
                  src={`data:image/jpeg;base64,${post.images[0]}`}
                  label={post.title}
                  id={post._id}
                />
              ))}
            </Box>
          </Box>
        </Box>
      </Box>
    );
  }
}

export default Page;
