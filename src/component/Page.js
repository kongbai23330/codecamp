// Page.js
import React from 'react';

import ImageCard from './ImageCard';
import { Box, styled } from '@mui/material';
import HorizontalNav from './HorizontalNav';

const Page = () => {
  const categories = ['food', 'transport', 'popular', 'schedule', 'Q&A'];
  const images = [
    { src: 'img/Rigs_of_Vienna.jpg', label: 'Rigs of Vienna', id: 1 },
    { src: 'img/swiss.jpg', label: 'swiss', id: 2 },
    { src: 'img/Rigs_of_Vienna.jpg', label: 'Rigs of Vienna', id: 3 },
    { src: 'img/Rigs_of_Vienna.jpg', label: 'Rigs of Vienna', id: 4 },
    { src: 'img/Rigs_of_Vienna.jpg', label: 'Rigs of Vienna', id: 5 },
    { src: 'img/Rigs_of_Vienna.jpg', label: 'Rigs of Vienna', id: 6 },
    // ...other images
  ];

  const ImageCardStyled = styled(ImageCard)({
    maxWidth: '250px', // Adjust width as needed
    height: 'auto', // Adjust height as needed to maintain aspect ratio
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
            {images.map((image) => (
              <ImageCardStyled key={image.id} src={image.src} label={image.label} id={image.id} />
            ))}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Page;
