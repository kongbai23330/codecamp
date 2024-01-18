import React from 'react'
import {
  Button,
  TextField,
  Box,
  Typography,
  Modal,
  Divider,
} from '@mui/material'
import GoogleIcon from '@mui/icons-material/Google'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  borderRadius: 1,
}

const LoginModal = ({ open, onClose, onLogin }) => {
  const loggedIn = (email) => {
    onLogin(email)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const email = data.get('email')
    const password = data.get('password')

    try {
      const response = await fetch('http://localhost:1234/users/auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        }),
      })

      const result = await response.json()
      if (result.token) {
        // Store the token in local storage or in a cookie
        localStorage.setItem('token', result.token)
        // Update the application state to indicate the user is logged in
        loggedIn(email)
        alert('Authentication successful')
      } else {
        alert('Authentication failed')
      }
      // Handle response here
    } catch (error) {
      // Handle errors here
      console.error('Error during the POST request:', error)
    }
  }

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="login-modal-title"
      aria-describedby="login-modal-description"
    >
      <Box sx={style}>
        <Typography id="login-modal-title" variant="h6" component="h2">
          Sign In
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            sign in
          </Button>
          <Divider sx={{ my: 2 }}>OR</Divider>
          <Button
            type="button"
            fullWidth
            variant="outlined"
            startIcon={<GoogleIcon />}
            sx={{ mb: 2 }}
          >
            Login with Google
          </Button>
        </Box>
      </Box>
    </Modal>
  )
}

export default LoginModal
