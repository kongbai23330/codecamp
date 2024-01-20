// PublishForm.js
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Box, TextField, Button, Grid, Stack } from '@mui/material'

const PublishForm = ({ user }) => {
  const navigate = useNavigate()
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [imagePreviews, setImagePreviews] = useState([])

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

  const buttonStyle = {
    backgroundColor: '#0052A3',
    color: '#fff',
    '&:hover': {
      backgroundColor: '#003c7e', 
    },
  };

  return (
    <Box component="form" noValidate autoComplete="off" onSubmit={handleSubmit} sx={{ p: 3 }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Title"
            margin="normal"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Description"
            margin="normal"
            multiline
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <Stack direction="row" spacing={2} justifyContent="flex-start">
            <input
              accept="image/*"
              style={{ display: 'none' }}
              id="raised-button-file"
              multiple
              type="file"
              onChange={handleImageChange}
            />
            <label htmlFor="raised-button-file">
              <Button variant="contained" component="span" sx={buttonStyle}>
                Upload Image(s)
              </Button>
            </label>
            <Button type="submit" variant="contained" sx={buttonStyle}>
              Publish
            </Button>
          </Stack>
        </Grid>
        <Grid item xs={12}>
          <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 2 }}>
            {imagePreviews.map((preview, index) => (
              <img
                key={index}
                src={preview}
                alt={`Preview ${index}`}
                style={{ width: '100%', height: 'auto' }}
              />
            ))}
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default PublishForm;