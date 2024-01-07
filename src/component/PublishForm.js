// PublishForm.js
import React, { useState } from 'react';
import { Box, TextField, Button, Typography } from '@mui/material';

const PublishForm = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      // Assuming only image
      setSelectedImage(URL.createObjectURL(event.target.files[0]));
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Form submission logic here
    console.log('Form Submitted');
    // This is where you would handle the file upload, typically using a service like AWS S3, Firebase, or your own server
  };

  return (
    <Box component="form" noValidate autoComplete="off" onSubmit={handleSubmit}>
      <TextField fullWidth label="Title" margin="normal" />
      <TextField fullWidth label="Description" margin="normal" multiline rows={4} />
      <input
        accept="image/*"
        style={{ display: 'none' }}
        id="raised-button-file"
        multiple
        type="file"
        onChange={handleImageChange}
      />
      <label htmlFor="raised-button-file">
        <Button variant="contained" component="span" style={{ margin: '10px 0' }}>
          Upload Image
        </Button>
      </label>
      {selectedImage && (
        <Box mt={2} mb={2}>
          <Typography variant="subtitle1">Selected Image Preview:</Typography>
          <img src={selectedImage} alt="Preview" style={{ maxHeight: '300px' }} />
        </Box>
      )}
      <Button type="submit" variant="contained" color="primary">
        Publish
      </Button>
    </Box>
  );
};

export default PublishForm;
