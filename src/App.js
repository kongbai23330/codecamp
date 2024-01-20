import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Page from './component/Page';
import Post from './component/Post';
import { Box, Typography } from '@mui/material';
import SearchBar from './component/SearchBar';
import VerticalSidebar from './component/VerticalSidebar';
import SecondPage from './component/SecondPage';
import UserInfo from './component/UserInfo';
import PublishForm from './component/PublishForm';
import LoginModal from './component/LoginModal';

class App extends React.Component {
  state = {
    searchVal: '',
    isLoginOpen: false,
    loggedIn: null,
  };

  componentDidMount = async () => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const response = await fetch('http://localhost:1234/users/verify', {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });
        const data = await response.json();
        if (response.ok) {
          this.setState({ loggedIn: data.email });
        } else {
          console.error(data.message);
          // Handle error, e.g. token might be invalid or expired
          this.userLoggedOut();
        }
      } catch (error) {
        console.error('Error verifying token:', error);
      }
    }
  };

  searchValUpdate = (e) => {
    this.setState({ searchVal: e.target.value });
  };

  openLoginModal = () => {
    this.setState({ isLoginOpen: true });
  };

  closeLoginModal = () => {
    this.setState({ isLoginOpen: false });
  };

  userLoggedIn = (email) => {
    this.setState({ loggedIn: email });
    this.closeLoginModal();
  };

  userLoggedOut = () => {
    localStorage.removeItem('token');
    this.setState({ loggedIn: null });
  };

  render() {
    return (
      <Router>
        <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
          {/* Header area with title and search bar */}
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              p: 2,
              bgcolor: 'white',
            }}
          >
            <Typography
              variant="h4"
              sx={{
                color: '#033375',
                marginLeft: '10px',
              }}
            >
              TravelFinland
            </Typography>
            <Box
              sx={{
                flexGrow: 1,
                display: 'flex',
                justifyContent: 'center',
              }}
            >
              <SearchBar updateSearch={this.searchValUpdate} />
            </Box>
            <UserInfo
              loggedIn={this.state.loggedIn}
              openLoginModal={this.openLoginModal}
              onLogout={this.userLoggedOut}
            />
          </Box>

          {/* Main content area */}
          <Box sx={{ display: 'flex', flexGrow: 1 }}>
            {/* Sidebar */}
            <Box sx={{ pt: '64px', width: '256px' }}>
              <VerticalSidebar loggedIn={this.state.loggedIn} />
            </Box>

            {/* Main content */}
            <Box sx={{ flexGrow: 1, p: 3 }}>
              <Routes>
                <Route path="/" element={<Page searchVal={this.state.searchVal} />} />
                <Route path="/SecondPage" element={<SecondPage />} />
                <Route path="/post/:id" element={<Post />} />
                <Route path="/publish" element={<PublishForm user={this.state.loggedIn} />} />
              </Routes>
            </Box>
          </Box>
          <LoginModal
            open={this.state.isLoginOpen}
            onClose={this.closeLoginModal}
            onLogin={this.userLoggedIn}
          />
        </Box>
      </Router>
    );
  }
}

export default App;
