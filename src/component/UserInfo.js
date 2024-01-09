import React from 'react';
import { Avatar } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';

// UserInfo.js

const UserInfo = () => {
    return (
        <div className="user-info">
            <Avatar sx={{ bgcolor: "secondary.main" }}>
                <PersonIcon />
            </Avatar>
        </div>
    );
};

export default UserInfo;
