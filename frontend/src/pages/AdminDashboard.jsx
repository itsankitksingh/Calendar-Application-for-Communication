import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Button,
  Paper,
  useTheme,
  Grid,
  Card,
  styled
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  Logout as LogoutIcon,
  Business as BusinessIcon,
  Forum as ForumIcon
} from '@mui/icons-material';
import ThemeToggle from '../components/ThemeToggle';
import CompanyManagement from '../components/CompanyManagement';
import CommunicationMethodManagement from '../components/CommunicationManagement';

// Styled components
const StyledCard = styled(Card)(({ theme }) => ({
  transition: "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
  "&:hover": {
    transform: "translateY(-5px)",
    boxShadow: theme.shadows[10],
  },
  borderRadius: "50px",
  boxShadow: theme.shadows[4],
  background: theme.palette.background.paper,
}));

const StyledPaper = styled(Paper)(({ theme }) => ({
  backgroundColor: "#FFF5E1",
  borderRadius: "50px",
  transition: "box-shadow 0.3s ease-in-out",
  "&:hover": {
    boxShadow: theme.shadows[8],
  },
}));

const AdminDashboard = () => {
  const navigate = useNavigate();
  const theme = useTheme();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    navigate('/');
  };

  const statsData = [
    { title: 'Total Companies', value: '150+', icon: <BusinessIcon sx={{ fontSize: 40 }} /> },
    { title: 'Communication Methods', value: '10', icon: <ForumIcon sx={{ fontSize: 40 }} /> },
  ];

  return (
    <Box sx={{
      minHeight: '100vh',
      bgcolor: '#FFF5E1',
      transition: 'all 0.3s ease',
      pt: 2
    }}>
      <Container maxWidth="xl">
        {/* Header */}
        <StyledPaper
          elevation={theme.palette.mode === 'dark' ? 2 : 1}
          sx={{
            p: 2,
            mb: 4,
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' }, // Stack on mobile
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: { xs: 2, sm: 0 } // Add gap when stacked
          }}
        >
          <Box display="flex" alignItems="center">
            <DashboardIcon
              sx={{
                mr: 2,
                color: 'primary.main',
                fontSize: { xs: 30, sm: 40 }, // Smaller icon on mobile
              }}
            />
            <Typography
              variant="h4"
              fontWeight="bold"
              color="primary"
              sx={{
                fontSize: { xs: '1.5rem', sm: '2rem' }, // Smaller text on mobile
                background: theme.palette.mode === 'dark'
                  ? 'linear-gradient(45deg, #90caf9 30%, #64b5f6 90%)'
                  : 'linear-gradient(45deg, #1976d2 30%, #2196f3 90%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}
            >
              Admin Dashboard
            </Typography>
          </Box>

          <Box
            display="flex"
            alignItems="center"
            gap={2}
            flexWrap="wrap" // Allow wrapping on very small screens
            justifyContent={{ xs: 'center', sm: 'flex-end' }}
            width={{ xs: '100%', sm: 'auto' }}
          >
            <Button
              variant="contained"
              color="primary"
              onClick={() => navigate('/analytical-dashboard')}
              sx={{
                borderRadius: 2,
                textTransform: 'none',
                fontSize: { xs: '0.875rem', sm: '1rem' }
              }}
            >
              View Analytics
            </Button>
            <ThemeToggle />
            <Button
              variant="contained"
              color="error"
              startIcon={<LogoutIcon />}
              onClick={handleLogout}
              sx={{
                borderRadius: 2,
                textTransform: 'none',
                fontSize: { xs: '0.875rem', sm: '1rem' }
              }}
            >
              Logout
            </Button>
          </Box>
        </StyledPaper>



       

        {/* Communication Method Management Section */}
        <StyledPaper
          elevation={theme.palette.mode === 'dark' ? 2 : 1}
          sx={{
            p: 3,
          }}
        >
          <Box
            mb={3}
            display="flex"
            alignItems="center"
          >
            <ForumIcon
              sx={{
                mr: 2,
                color: 'primary.main',
                fontSize: 30
              }}
            />
            <Typography
              variant="h5"
              fontWeight="bold"
              color="text.primary"
            >
              Communication Methods
            </Typography>
          </Box>
          <CommunicationMethodManagement />

           {/* Company Management Section */}
        <StyledPaper
          elevation={theme.palette.mode === 'dark' ? 2 : 1}
          sx={{
            p: 3,
            mb: 4,
          }}
        >
          <Box
            mb={3}
            display="flex"
            alignItems="center"
          >
            <BusinessIcon
              sx={{
                mr: 2,
                color: 'primary.main',
                fontSize: 30
              }}
            />
            <Typography
              variant="h5"
              fontWeight="bold"
              color="text.primary"
            >
              Company Management
            </Typography>
          </Box>
          <CompanyManagement />
        </StyledPaper>
        </StyledPaper>

        
      </Container>

      
    </Box>

    
  );
};

export default AdminDashboard;
