// App.js
import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Page from './component/Page'
import Post from './component/Post'
import { Box, Typography } from '@mui/material'
import SearchBar from './component/SearchBar'
import VerticalSidebar from './component/VerticalSidebar'
import SecondPage from './component/SecondPage'
import UserInfo from './component/UserInfo'
import PublishForm from './component/PublishForm'
import LoginModal from './component/LoginModal'

class App extends React.Component {
  state = {
    searchVal: '',
    isLoginOpen: false,
    loggedIn: null,
  }

  componentDidMount = async () => {
    const token = localStorage.getItem('token')
    if (token) {
      const response = await fetch('http://localhost:1234/users/verify', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      const data = await response.json()
      if (response.ok) {
        this.userLoggedIn(data.email)
      }
    }
  }
  onSearch = async (searchQuery) => {
    try {
      const response = await fetch(`http://localhost:1234/posts/search?q=${encodeURIComponent(searchQuery)}`);
      const results = await response.json();
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      this.setState({ searchVal: searchQuery, posts: results });
    } catch (error) {
      console.error('Search failed:', error);
    }
  };
  searchValUpdate = (e) => {
    this.setState({ searchVal: e })
  }

  openLoginModal = () => {
    this.setState({ isLoginOpen: true })
  }

  closeLoginModal = () => {
    this.setState({ isLoginOpen: false })
  }

  userLoggedIn = (email) => {
    this.setState({ loggedIn: email })
  }

  userLoggedOut = () => {
    localStorage.removeItem('token')
    this.setState({ loggedIn: null })
  }

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
              <SearchBar onSearch={this.onSearch} />
            </Box>
            <Box
              sx={{
                flexGrow: 0,
              }}
            >
              <UserInfo />
            </Box>
          </Box>

          {/* Main content area */}
          <Box sx={{ display: 'flex', flexGrow: 1 }}>
            {/* Sidebar */}
            <Box sx={{ pt: '64px', width: '256px' }}>
              <VerticalSidebar
                openLoginModal={this.openLoginModal}
                loggedIn={this.state.loggedIn}
                onLogout={this.userLoggedOut}
              />
            </Box>

            {/* Main content */}
            <Box sx={{ flexGrow: 1, p: 3 }}>
              <LoginModal
                open={this.state.isLoginOpen}
                onClose={this.closeLoginModal}
                onLogin={this.userLoggedIn}
              />
              <Routes>
                <Route
                  path="/"
                  element={<Page searchVal={this.state.searchVal} />}
                />
                <Route path="/SecondPage" element={<SecondPage />} />
                <Route path="/post/:id" element={<Post />} />
                <Route
                  path="/publish"
                  element={<PublishForm user={this.state.loggedIn} />}
                />
              </Routes>
            </Box>
          </Box>
        </Box>
      </Router>
    )
  }
}

export default App
