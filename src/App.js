// App.js
import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Page from './component/Page'
import Post from './component/Post'
import SearchBar from './component/SearchBar'
import VerticalSidebar from './component/VerticalSidebar'
import { Box, Typography } from '@mui/material'
import SecondPage from './component/SecondPage'
import UserInfo from './component/UserInfo'
import PublishForm from './component/PublishForm'

class App extends React.Component {
  state = {
    searchVal: '',
  }
  searchValUpdate = (e) => {
    this.setState({ searchVal: e })
    console.log(e)
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
              <SearchBar updateSearch={this.searchValUpdate} />
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
              <VerticalSidebar />
            </Box>

            {/* Main content */}
            <Box sx={{ flexGrow: 1, p: 3 }}>
              <Routes>
                <Route
                  path="/"
                  element={<Page searchVal={this.state.searchVal} />}
                />
                <Route path="/SecondPage" element={<SecondPage />} />
                <Route path="/post/:id" element={<Post />} />
                <Route path="/publish" element={<PublishForm />} />
                {/* Add more routes as needed */}
              </Routes>
            </Box>
          </Box>
        </Box>
      </Router>
    )
  }
}

export default App
