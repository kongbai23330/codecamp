import React from 'react';
import { Avatar, Button, Tooltip, Box } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import LoginIcon from '@mui/icons-material/Login';

const UserInfo = ({ loggedIn, openLoginModal, onLogout }) => {
  if (!loggedIn) {
    return (
      <Tooltip title="Login">
        <Button onClick={openLoginModal} color="inherit" startIcon={<LoginIcon />}>
          Login
        </Button>
      </Tooltip>
    );
  } else {
    return (
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <Avatar sx={{ bgcolor: 'secondary.main' }}>
          <PersonIcon />
        </Avatar>
        <Button onClick={onLogout} color="inherit">
          Logout
        </Button>
      </Box>
    );
  }
};

export default UserInfo;
