// PublishForm.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, TextField, Button, Card, CardContent, Grid, IconButton, Tooltip } from '@mui/material';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import CloseIcon from '@mui/icons-material/Close';

const PublishForm = ({ user }) => {
  const navigate = useNavigate()
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [imagePreviews, setImagePreviews] = useState([])
  const [images, setImages] = useState([]);
  const handleImageChange = (event) => {
    if (event.target.files) {
      const files = event.target.files
      const previews = []

      for (let i = 0; i < files.length; i++) {
        previews.push(URL.createObjectURL(files[i]))
      }

      setImagePreviews(previews)
    }
  }
  const handleRemoveImage = (index) => {
    // Remove the image from the images and imagePreviews array
    const newImages = [...images];
    const newImagePreviews = [...imagePreviews];
    newImages.splice(index, 1);
    newImagePreviews.splice(index, 1);
    setImages(newImages);
    setImagePreviews(newImagePreviews);

    // Revoke the object URL to avoid memory leaks
    URL.revokeObjectURL(imagePreviews[index]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault()

    const formData = new FormData()
    const imageInput = document.getElementById('raised-button-file')

    formData.append('title', title)
    formData.append('content', description)
    formData.append('creator', user)

    for (let i = 0; i < imageInput.files.length; i++) {
      formData.append('images', imageInput.files[i])
    }
    const token = localStorage.getItem('token')
    try {
      const response = await fetch('http://localhost:1234/posts/image', {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      })

      if (response.ok) {
        alert('Post created successfully')
        navigate('/')
      } else {
        const errorText = await response.text()
        alert('Error in creating post, Status:', errorText)
      }
    } catch (error) {
      console.error('There was an error submitting the form', error)
    }
  }

  return (
    <Card sx={{ maxWidth: 1000, mx: 'auto', mt: 2, mb: 4 }}>
      <CardContent>
        <Box component="form" noValidate autoComplete="off" onSubmit={handleSubmit}>
          <Grid container direction="column" spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Title"
                margin="normal"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </Grid>
            <Grid item xs={120}>
              <TextField
                fullWidth
                label="Description"
                margin="normal"
                multiline
                rows={10}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <input
                accept="image/*"
                style={{ display: 'none' }}
                id="raised-button-file"
                multiple
                type="file"
                onChange={handleImageChange}
              />
              <Tooltip title="Upload Image">
                <IconButton color="primary" aria-label="upload picture" component="span">
                  <label htmlFor="raised-button-file">
                    <PhotoCamera />
                  </label>
                </IconButton>
              </Tooltip>
              
            </Grid>

            <Grid item xs={12}>
              <Box sx={{ display: 'flex', justifyContent: 'flex-start', flexWrap: 'wrap' }}>
                {imagePreviews.map((preview, index) => (
                  <Box key={index} sx={{ position: 'relative', width: '100px', marginRight: '8px', marginBottom: '8px' }}>
                    <img src={preview} alt={`Preview ${index}`} style={{ width: '100%', height: 'auto' }} />
                    <IconButton
                      size="small"
                      sx={{
                        position: 'absolute',
                        top: 0,
                        right: 0,
                        color: 'grey.100',
                        '&:hover': { color: 'error.main' },
                      }}
                      onClick={() => handleRemoveImage(index)}
                    >
                      <CloseIcon fontSize="small" />
                    </IconButton>
                  </Box>
                ))}
              </Box>
            </Grid>
            <Grid item xs={12} container justifyContent="flex-end">
              <Button type="submit" variant="contained" color="primary">
                Publish
              </Button>
            </Grid>
          </Grid>
        </Box>
      </CardContent>
    </Card>
  );
}

export default PublishForm
