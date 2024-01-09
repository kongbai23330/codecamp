// ImageCard.js
import React from "react";
import { Card, CardMedia, CardContent, Typography } from "@mui/material";
import { Link } from "react-router-dom";
const ImageCard = ({ src, label, id }) => {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <Link to={`/post/${id}`}>
        <CardMedia component="img" height="140" image={src} alt={label} />
      </Link>
      <CardContent>
        <Typography gutterBottom variant="h6" component="div">
          {label}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default ImageCard;
