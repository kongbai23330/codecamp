// Page.js
import React, { useEffect, useState } from 'react';

import ImageCard from './ImageCard';
import { Box, styled } from '@mui/material';
import HorizontalNav from './HorizontalNav';

const Page = () => {
  const [posts, setPosts] = useState([]);
  const categories = ['food', 'transport', 'popular', 'schedule', 'Q&A'];

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('http://localhost:1234/posts', { method: 'get' });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        console.error("Could not fetch posts: ", error);
      }
    };

    fetchPosts();
  }, []);

  const ImageCardStyled = styled(ImageCard)({
    maxWidth: '250px', 
    height: 'auto', 
  });


  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <Box sx={{ display: 'flex', flexGrow: 1 }}>
        {/* Vertical sidebar, potentially including the logo */}

        <Box sx={{ flexGrow: 1, p: 5 }}>
          {/* Horizontal navigation bar */}
          <HorizontalNav categories={categories} />
          {/* Image grid */}
          <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 2 }}>
            {posts.map((post) => (
              post.images.map((image, index) => (
                <ImageCardStyled
                  key={`${post._id}_${index}`}
                  src={`data:image/jpeg;base64,${post.images[index]}`}
                  label={post.title}
                  id={post._id}
                />
              ))
            ))}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Page;
