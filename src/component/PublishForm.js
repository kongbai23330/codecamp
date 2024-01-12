// PublishForm.js
import React, { useState } from 'react'
import { Box, TextField, Button } from '@mui/material'

const PublishForm = () => {
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

    for (let i = 0; i < imageInput.files.length; i++) {
      formData.append('images', imageInput.files[i])
    }

    try {
      const response = await fetch('http://localhost:1234/posts/image', {
        method: 'POST',
        body: formData,
      })

      if (response.ok) {
        console.log('Post created successfully')
      } else {
        console.log('Error in creating post, Status:', response.status)
        const errorText = await response.text()
        console.log('Error details:', errorText)
      }
    } catch (error) {
      console.error('There was an error submitting the form', error)
    }
  }

  return (
    <Box component="form" noValidate autoComplete="off" onSubmit={handleSubmit}>
      <TextField
        fullWidth
        label="Title"
        margin="normal"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <TextField
        fullWidth
        label="Description"
        margin="normal"
        multiline
        rows={4}
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <input
        accept="image/*"
        style={{ display: 'none' }}
        id="raised-button-file"
        multiple
        type="file"
        onChange={handleImageChange}
      />
      <label htmlFor="raised-button-file">
        <Button variant="contained" component="span">
          Upload Image(s)
        </Button>
      </label>
      <Box>
        {imagePreviews.map((preview, index) => (
          <img
            key={index}
            src={preview}
            alt={`Preview ${index}`}
            style={{ maxHeight: '100px', margin: '10px' }}
          />
        ))}
      </Box>
      <Button type="submit" variant="contained" color="primary">
        Publish
      </Button>
    </Box>
  )
}

export default PublishForm
