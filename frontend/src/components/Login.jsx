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
  AdminPanelSettings,
  DarkMode,
  LightMode,
  Margin
} from '@mui/icons-material';
import { useThemeContext } from '../context/ThemeContext';
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
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
      
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("role", response.data.role);

      if (response.data.role === "admin") {
        alert("Please use admin login for administrator access");
        navigate("/admin-login");
      } else {
        navigate("/user-dashboard");
      }
    } catch (error) {
      alert("Error logging in: " + (error.response?.data?.error || 'Login failed'));
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
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
          Welcome Back
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ textAlign: 'center', marginBottom: 3 }}
        >
          Login to your account
        </Typography>

        <TextField
          fullWidth
          variant="outlined"
          label="Email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          sx={{
            marginBottom: 2,
          }}
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
          sx={{ marginBottom: 2 }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <LockOutlined />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => setShowPassword(!showPassword)}
                  edge="end"
                >
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
          sx={{ marginTop: 2 }}
        >
          Login
        </Button>

        <Box
          display="flex"
          justifyContent="space-between"
          mt={2}
        >
          <Button
            startIcon={<AdminPanelSettings />}
            onClick={() => navigate("/admin-login")}
            sx={{ textTransform: 'none' }}
          >
            Admin Login
          </Button>

          <Button
            onClick={() => navigate("/register")}
            sx={{ textTransform: 'none' }}
          >
            Create Account
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

export default Login;