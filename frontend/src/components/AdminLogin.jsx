// src/components/AdminLogin.jsx
import React, { useState } from 'react';
import {
  TextField,
  Button,
  Box,
  Typography,
  Paper,
  InputAdornment,
  IconButton,
  useTheme
} from "@mui/material";
import {
  Visibility,
  VisibilityOff,
  EmailOutlined,
  LockOutlined,
  DarkMode,
  LightMode
} from '@mui/icons-material';
import { useNavigate } from "react-router-dom";
import { useThemeContext } from '../context/ThemeContext';
import axios from "axios"; // Don't forget to import axios

const AdminLogin = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const theme = useTheme();
  const colorMode = useThemeContext();

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async () => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/api/login`,
        formData
      );

      console.log('Login response:', response.data);

      // Check if the user is an admin
      if (response.data.role !== 'admin') {
        alert('Access denied. This portal is for administrators only.');
        return;
      }

      // Store the token and role in localStorage
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('role', response.data.role);

      console.log('Stored values:', {
        token: localStorage.getItem('token'),
        role: localStorage.getItem('role')
      });

      // Navigate to admin dashboard
      navigate("/admin-dashboard");
    } catch (error) {
      alert(error.response?.data?.error || 'Login failed. Please try again.');
      console.error('Login error:', error);
    }
  };

  const handleUserLogin = () => {
    navigate("/");
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: '#FFF8E1',
        transition: 'background-color 0.3s ease'
      }}
    >
      <Paper
        elevation={10}
        sx={{
          width: '100%',
          maxWidth: 450,
          p: 4,
          borderRadius: 3,
          bgcolor: 'background.paper',
          position: 'relative'
        }}
      >
        <IconButton
          onClick={colorMode.toggleColorMode}
          sx={{ position: 'absolute', right: 16, top: 16 }}
        >
          {theme.palette.mode === 'dark' ? <LightMode /> : <DarkMode />}
        </IconButton>

        <Box textAlign="center" mb={4}>
          <Typography
            variant="h4"
            sx={{
              fontWeight: 'bold',
              color: 'primary.main',
              mb: 1
            }}
          >
            Admin Portal
          </Typography>
          <Typography color="text.secondary">
            Secure Access for Administrators
          </Typography>
        </Box>

        <TextField
          fullWidth
          variant="outlined"
          label="Email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          sx={{ mb: 2 }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <EmailOutlined />
              </InputAdornment>
            ),
          }}
        />

        <TextField
          fullWidth
          variant="outlined"
          label="Password"
          name="password"
          type={showPassword ? "text" : "password"}
          value={formData.password}
          onChange={handleInputChange}
          sx={{ mb: 3 }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <LockOutlined />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <Button
          fullWidth
          variant="contained"
          onClick={handleLogin}
          sx={{ mb: 3 }}
        >
          Login
        </Button>

        <Box textAlign="center">
          <Button
            onClick={handleUserLogin}
            sx={{ textTransform: 'none' }}
          >
            Switch to User Login
          </Button>
        </Box>

        <Box>
                          Admin Email: cba@gmail.com
                          <br />
                          Admin Password: cba@gmail.com
                            <br />
                
                          User Email: abc@gmail.com
                          <br />
                          User Password: abc@gmail.com
                        </Box>
      </Paper>
    </Box>
  );
};

export default AdminLogin;
