import React from 'react'
import {
  Button,
  TextField,
  Box,
  Typography,
  Modal,
  CardContent,
  Card
} from '@mui/material'
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#033375', 
    },
   
  },
});
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  boxShadow: 24,
  borderRadius: 4,
  // Add responsive width
  width: { xs: '90%', sm: 400 },
};

const LoginModal = ({ open, onClose, onLogin }) => {
  const loggedIn = (email) => {
    onClose()
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
    <ThemeProvider theme={theme}>
      <Modal
        open={open}
        onClose={onClose}
        aria-labelledby="login-modal-title"
        aria-describedby="login-modal-description"
      >
        <Card sx={style}>
          <CardContent>
            <Typography id="login-modal-title" variant="h6" component="h2" color="primary" gutterBottom>
              Sign In
            </Typography>
            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                variant="outlined"
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
                variant="outlined"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                sx={{ mt: 3, mb: 2, '&:hover': { backgroundColor: 'secondary.main' } }}
              >
                SIGN IN
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Modal>
    </ThemeProvider>
  );
}

export default LoginModal
