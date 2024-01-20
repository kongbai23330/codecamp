import React from 'react';
import { useNavigate } from 'react-router-dom';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import HomeIcon from '@mui/icons-material/Home';
import PublishIcon from '@mui/icons-material/Publish';
import MoreIcon from '@mui/icons-material/MoreHoriz';

const VerticalSidebar = ({ loggedIn }) => {
  const navigate = useNavigate();

  const navigateToHome = () => {
    navigate('/');
  };

  const navigateToPublish = () => {
    if (loggedIn) {
      navigate('/publish');
    } else {
      alert('You must be logged in to publish content');
    }
  };

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
      <ListItem disablePadding>
        <ListItemButton onClick={navigateToPublish}>
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
  );
};

export default VerticalSidebar;
