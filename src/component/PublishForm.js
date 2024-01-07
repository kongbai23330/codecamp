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

    const handleSubmit = async (event) => {
        event.preventDefault();

        const formData = new FormData();
        const hardcodedTitle = "hello";  // Hardcoded value
        const hardcodedContent = "hello"; // Hardcoded value
        const imageInput = document.getElementById('raised-button-file');

        formData.append('title', hardcodedTitle);
        formData.append('content', hardcodedContent);

        if (imageInput.files[0]) {
            formData.append('image', imageInput.files[0]);
        }

        try {
            const response = await fetch('http://localhost:1234/posts/image', {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                console.log('Post created successfully');
                // Handle success - perhaps redirecting to another page or clearing the form
            } else {
                console.log('Error in creating post, Status:', response.status);
                const errorText = await response.text(); // or response.json() if the server sends JSON response
                console.log('Error details:', errorText);
                // Display or handle the detailed error message
            }
        } catch (error) {
            console.error('There was an error submitting the form', error);
            // Handle network error
        }
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