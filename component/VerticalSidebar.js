// VerticalSidebar.js
import React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import HomeIcon from '@mui/icons-material/Home';
import PublishIcon from '@mui/icons-material/Publish';
import MoreIcon from '@mui/icons-material/MoreHoriz';

const VerticalSidebar = () => {
  return (
    <List>
      <ListItem disablePadding>
        <ListItemButton>
          <ListItemIcon>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText primary="Discovering" />
        </ListItemButton>
      </ListItem>
      {/* ... more list items */}
      <ListItem disablePadding>
        <ListItemButton>
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
