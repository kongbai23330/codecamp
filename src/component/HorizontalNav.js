// HorizontalNav.js
import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Button } from '@mui/material';

const HorizontalNav = ({ categories }) => {
    return (
        <Box sx={{ display: 'flex', justifyContent: 'left', gap: 2, padding: '20px 0' }}>
            {categories.map((category, index) => (
                <Button key={index} component={Link} to={`/${category.toLowerCase()}`}>
                    {category}
                </Button>
            ))}
        </Box>
    );
};

export default HorizontalNav;
