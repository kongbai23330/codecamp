// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Page from './component/Page';
import Post from './component/post';
import SearchBar from './component/SearchBar';
import VerticalSidebar from './component/VerticalSidebar';
import { Box, Typography } from '@mui/material';
import SecondPage from './component/SecondPage';
import UserInfo from './component/UserInfo';

function App() {
  return (
    <Router>
      <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
        {/* Header area with title and search bar */}
        <Box sx={{
          display: 'flex',
          justifyContent: 'space-between', // This will push the children to the edges
          alignItems: 'center',
          p: 2,
          bgcolor: 'white'
        }}>
          <Typography
            variant="h4"
            sx={{
              color: '#033375',
              marginLeft: '10px' // Use margin instead of absolute positioning
            }}
          >
            TravelFinland
          </Typography>
          <Box sx={{
            flexGrow: 1,
            display: 'flex',
            justifyContent: 'center' // Center the search bar in the available space
          }}>
            <SearchBar />
          </Box>
          <Box sx={{
            flexGrow: 0 // Ensure UserInfo doesn't grow and stays on the right
          }}>
            <UserInfo />
          </Box>
        </Box>


        {/* Main content area */}
        <Box sx={{ display: 'flex', flexGrow: 1 }}>
          <Box sx={{ pt: '64px' }}> {/* Padding top to push the sidebar down */}
            <VerticalSidebar /> {/* Left sidebar */}
          </Box>
          <Box sx={{ flexGrow: 1 }}>
            <Routes>
              <Route exact path="/" element={<Page />} />
              <Route exact path="/SecondPage" element={<SecondPage />} />
              <Route path="/post/:id" element={<Post />} />
              {/* Add more routes as needed */}
            </Routes>
          </Box>
        </Box>
      </Box>
    </Router>
  );
}

export default App;