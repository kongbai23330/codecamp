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

const VerticalSidebar = () => {
  const navigate = useNavigate()

  const navigateToPublish = () => {
    navigate('/publish')
  }

  const navigateToHome = () => {
    navigate('/')
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
