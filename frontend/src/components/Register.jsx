import React, { useState } from "react";
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
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useThemeContext } from '../context/ThemeContext';

const Register = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: "user",
  });
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const theme = useTheme();
  const colorMode = useThemeContext();

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async () => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/api/register`,
        formData
      );
      alert(response.data.message);
      navigate("/");
    } catch (error) {
      alert("Error registering user: " + (error.response?.data?.error || 'Registration failed'));
    }
  };

  return (
    <Box 
      sx={{ 
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: '#FFF8E1', // Very light orange background
        padding: 2,
      }}
    >
      <Paper 
        elevation={5}
        sx={{ 
          width: '90%',
          maxWidth: 380,
          padding: 4,
          borderRadius: 4,
          position: 'relative',
          boxShadow: theme.shadows[8],
        }}
      >
        <IconButton
          onClick={colorMode.toggleColorMode}
          sx={{ position: 'absolute', right: 16, top: 16 }}
        >
          {theme.palette.mode === 'dark' ? <LightMode /> : <DarkMode />}
        </IconButton>

        <Typography 
          variant="h5" 
          sx={{ 
            fontWeight: 600,
            color: 'primary.main',
            marginBottom: 2,
            textAlign: 'center',
          }}
        >
          Create Account
        </Typography>
        <Typography color="text.secondary" sx={{ textAlign: 'center', marginBottom: 3 }}>
          Join our platform today
        </Typography>

        <TextField
          fullWidth
          variant="outlined"
          label="Email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          sx={{ marginBottom: 2 }}
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
          sx={{ marginBottom: 3 }}
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
          onClick={handleRegister}
          sx={{ marginTop: 2 }}
        >
          Register
        </Button>

        <Box textAlign="center" marginTop={2}>
          <Typography variant="body2" color="text.secondary">
            Already have an account?{' '}
            <Button
              onClick={() => navigate("/")}
              sx={{ textTransform: 'none' }}
            >
              Login here
            </Button>
          </Typography>
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

export default Register;
