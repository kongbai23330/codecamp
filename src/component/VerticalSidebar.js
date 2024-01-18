// VerticalSidebar.js
import React from 'react'
import { useNavigate } from 'react-router-dom' // Correctly imported useNavigate
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import HomeIcon from '@mui/icons-material/Home'
import PublishIcon from '@mui/icons-material/Publish'
import MoreIcon from '@mui/icons-material/MoreHoriz'

const VerticalSidebar = ({ openLoginModal, loggedIn, onLogout }) => {
  const navigate = useNavigate()

  const navigateToPublish = () => {
    navigate('/publish')
  }

  const navigateToHome = () => {
    navigate('/')
  }

  const openLoginCB = () => {
    openLoginModal()
  }

  const handleLogout = () => {
    onLogout()
  }

  return (
    <List>
      <ListItem disablePadding>
        <ListItemButton onClick={navigateToHome}>
          <ListItemIcon>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText primary="Discovering" />
        </ListItemButton>
      </ListItem>
      {/* ... more list items */}
      <ListItem disablePadding>
        <ListItemButton onClick={navigateToPublish}>
          {' '}
          {/* Attach the event handler here */}
          <ListItemIcon>
            <PublishIcon />
          </ListItemIcon>
          <ListItemText primary="Publish" />
        </ListItemButton>
      </ListItem>
      <ListItem disablePadding>
        <ListItemButton onClick={openLoginCB} disabled={Boolean(loggedIn)}>
          <ListItemIcon>
            <MoreIcon />
          </ListItemIcon>
          <ListItemText primary={loggedIn ? loggedIn : 'Login'} />
        </ListItemButton>
      </ListItem>
      {loggedIn ? (
        <ListItem disablePadding>
          <ListItemButton onClick={handleLogout}>
            <ListItemIcon>
              <MoreIcon />
            </ListItemIcon>
            <ListItemText primary="Logout" />
          </ListItemButton>
        </ListItem>
      ) : (
        <></>
      )}
      <ListItem disablePadding>
        <ListItemButton>
          <ListItemIcon>
            <MoreIcon />
          </ListItemIcon>
          <ListItemText primary="More" />
        </ListItemButton>
      </ListItem>
    </List>
  )
}

export default VerticalSidebar
