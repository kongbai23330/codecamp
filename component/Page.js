// Page.js
import React from 'react';
import SearchBar from './HorizontalNav';
import ImageCard from './ImageCard';
import HorizontalNav from './Sidebar';
import VerticalSidebar from './VerticalSidebar';
import { Box } from '@mui/material';

const Page = () => {
  const categories = ['Discovering', 'food', 'transport', 'popular', 'schedule', 'Q&A'];
  const images = [
    { src: 'path-to-your-image.jpg', label: 'Restaurant A' },
    // ...other images
  ];

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      {/* Header with only a logo and the SearchBar, no background color */}
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', p: 2 }}>
        <h1 style={{ color: 'blue' }}>Travel Finland</h1>
        <SearchBar />
      </Box>
      {/* Main content area */}
      <Box sx={{ display: 'flex', flexGrow: 1 }}>
        <VerticalSidebar /> {/* Vertical sidebar */}
        <Box sx={{ flexGrow: 1, p: 3 }}>
          <HorizontalNav categories={categories} /> {/* Horizontal navbar */}
          <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 2 }}>
            {images.map((image, index) => (
              <ImageCard key={index} src={image.src} label={image.label} />
            ))}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Page;
