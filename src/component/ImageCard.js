// ImageCard.js
import React from 'react';
import { Card, CardMedia, CardContent, Typography } from '@mui/material';

const ImageCard = ({ src, label }) => {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        height="140"
        image={src}
        alt={label}
      />
      <CardContent>
        <Typography gutterBottom variant="h6" component="div">
          {label}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default ImageCard;
