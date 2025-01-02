import React, { useState, useEffect } from "react";
import {
  Grid,
  Button,
  Typography,
  Tooltip,
  Box,
  Card,
  Paper,
  Container,
  Chip,
  IconButton,
  useTheme
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { styled } from "@mui/material/styles";
import DashboardIcon from '@mui/icons-material/Dashboard';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import LogoutIcon from '@mui/icons-material/Logout';
import EventIcon from '@mui/icons-material/Event';
import { DarkMode, LightMode } from '@mui/icons-material';
import { useThemeContext } from '../context/ThemeContext';

import CommunicationModal from "../components/CommunicationModal";
import CommunicationCalendar from "../components/CommunicationCalendar";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const StyledCard = styled(Card)(({ theme }) => ({
  transition: "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
  "&:hover": {
    transform: "scale(1.05)",
    boxShadow: theme.shadows[8],
  },
  borderRadius: theme.spacing(3),
  boxShadow: theme.shadows[6],
  background: theme.palette.background.alt,
  border: `2px solid ${theme.palette.primary.light}`,
}));

const UserDashboard = () => {
  const [communications, setCommunications] = useState([]);
  const [over, setOver] = useState([]);
  const [today, setToday] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [selectedCompanyId, setSelectedCompanyId] = useState([]);
  const [selected, setSelected] = useState(false);
  const [rowSelectionModel, setRowSelectionModel] = useState([]);

  const navigate = useNavigate();
  const theme = useTheme();
  const colorMode = useThemeContext();

  const columns = [
    {
      field: "name",
      headerName: "Company Name",
      width: 300,
      renderCell: (params) => (
        <Typography variant="subtitle1" color="secondary.main">{params.row.company.name}</Typography>
      ),
    },
    {
      field: "lastCommunications",
      headerName: "Last 5 Communications",
      width: 400,
      renderCell: (params) => (
        <Tooltip key={params.row._id} title={params.row.notes} arrow>
          <Typography variant="body2" color="text.primary">{`${params.row.type.name} - ${new Date(
            params.row.date
          ).toLocaleDateString()}`}</Typography>
        </Tooltip>
      ),
    },
    {
      field: "nextCommunication",
      headerName: "Next Scheduled Communication",
      width: 400,
      renderCell: (params) => {
        const date = new Date(params.row.date);
        date.setDate(date.getDate() + 5);
        const updatedDateString = date.toLocaleDateString();
        return (
          <Typography variant="body2" color="success.main">{`${params.row.type.name} - ${updatedDateString}`}</Typography>
        );
      },
    },
  ];

  const handleCommunicationPerformed = () => {
    const x = rowSelectionModel;
    let mySet = new Set();
    let arr = [];

    for (let i = 0; i < x.length; i++) {
      mySet.add(x[i].slice(24, x[i].length));
    }

    mySet.forEach((el) => arr.push({ name: el }));

    setSelectedCompanyId(arr);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleLogCommunication = (data) => {
    data.company.forEach((el) => {
      setCommunications((prev) => [
        ...prev,
        {
          company: { name: el.name },
          date: data.date,
          type: { name: data.type },
          notes: data.notes,
        },
      ]);
    });
    handleCloseModal();
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/");
  };

  const fetchCommsFromAPI = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/api/communications-user`
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching communications:", error);
      return [];
    }
  };

  const fetchNotificationsFromAPI = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/api/notifications`
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching notifications:", error);
      return [];
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const communicationsData = await fetchCommsFromAPI();
      setCommunications(communicationsData);
      const ndata = await fetchNotificationsFromAPI();
      const over = ndata.filter((el) => el.type === "overdue");
      const today = ndata.filter((el) => el.type === "due today");
      setOver(over);
      setToday(today);
    };
    fetchData();
  }, []);

  return (
    <Box
      sx={{
        minHeight: '100vh',
        bgcolor: 'rgba(255, 239, 213, 0.5)',
        transition: 'background-color 0.5s ease'
      }}
    >
      <Container maxWidth="lg">
        <Box py={4}>

          <Paper
            elevation={1}
            sx={{
              display: "flex",
              flexDirection: { xs: 'column', sm: 'row' },
              justifyContent: "space-between",
              alignItems: "center",
              gap: { xs: 3, sm: 1 },
              mb: 4,
              p: 3,
              borderRadius: 3,
              bgcolor: 'rgba(255, 248, 220, 0.5)',
            }}
          >
            <Box display="flex" alignItems="center">
              <DashboardIcon
                sx={{
                  mr: 3,
                  color: "secondary.main",
                  fontSize: { xs: 35, sm: 50 }
                }}
              />
              <Typography
                variant="h3"
                fontWeight="medium"
                color="secondary.main"
                sx={{
                  fontSize: { xs: '1.8rem', sm: '2.2rem' }
                }}
              >
                Dashboard Overview
              </Typography>
            </Box>

            <Box
              display="flex"
              alignItems="center"
              gap={3}
              justifyContent={{ xs: 'center', sm: 'flex-end' }}
              width={{ xs: '100%', sm: 'auto' }}
            >
              <Button
                variant="outlined"
                color="secondary"
                onClick={() => navigate('/analytical-dashboard')}
                sx={{
                  borderRadius: "20px",
                  textTransform: "capitalize",
                  fontSize: { xs: '0.9rem', sm: '1rem' }
                }}
              >
                Analytics
              </Button>
              <IconButton
                onClick={colorMode.toggleColorMode}
                sx={{
                  bgcolor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
                  '&:hover': {
                    bgcolor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.2)',
                  },
                  borderRadius: 2,
                }}
              >
                {theme.palette.mode === 'dark' ? <LightMode /> : <DarkMode />}
              </IconButton>
              <Button
                startIcon={<LogoutIcon />}
                variant="contained"
                color="warning"
                onClick={handleLogout}
                sx={{
                  borderRadius: "20px",
                  textTransform: "capitalize",
                  fontSize: { xs: '0.9rem', sm: '1rem' }
                }}
              >
                Logout
              </Button>
            </Box>
          </Paper>

          {/* Notification Section */}
          <Box mb={4}>
            <Typography
              variant="h5"
              fontWeight="medium"
              gutterBottom
              display="flex"
              alignItems="center"
              color="primary.main"
            >
              <NotificationsActiveIcon sx={{ mr: 2, color: "info.main" }} />
              Alerts
            </Typography>
            <Grid container spacing={4}>
              <Grid item xs={12} md={6}>
                <StyledCard>
                  <Box p={4}>
                    <Typography variant="h6" fontWeight="bold" color="error.main" gutterBottom>
                      Overdue Tasks
                      <Chip
                        label={over.length}
                        color="error"
                        size="small"
                        sx={{ ml: 2 }}
                      />
                    </Typography>
                    {over.length > 0 ? (
                      over.map((x, idx) => (
                        <Typography
                          key={idx}
                          variant="body2"
                          color="text.primary"
                          sx={{ mb: 1 }}
                        >
                          {x.company.name} - {x.message}
                        </Typography>
                      ))
                    ) : (
                      <Typography variant="body2" color="text.secondary">
                        No overdue tasks
                      </Typography>
                    )}
                  </Box>
                </StyledCard>
              </Grid>
              <Grid item xs={12} md={6}>
                <StyledCard>
                  <Box p={4}>
                    <Typography variant="h6" fontWeight="bold" color="primary.main" gutterBottom>
                      Today's Tasks
                      <Chip
                        label={today.length}
                        color="primary"
                        size="small"
                        sx={{ ml: 2 }}
                      />
                    </Typography>
                    {today.length > 0 ? (
                      today.map((x, idx) => (
                        <Typography
                          key={idx}
                          variant="body2"
                          color="text.primary"
                          sx={{ mb: 1 }}
                        >
                          {x.company.name} - {x.message}
                        </Typography>
                      ))
                    ) : (
                      <Typography variant="body2" color="text.secondary">
                        No tasks due today
                      </Typography>
                    )}
                  </Box>
                </StyledCard>
              </Grid>
            </Grid>
          </Box>

          {/* Communication Calendar */}
          <Box mb={4}>
            <CommunicationCalendar communications={communications} />
          </Box>

          {/* Data Grid */}
          <Paper
            elevation={1}
            sx={{
              mb: 4,
              borderRadius: 3,
              overflow: "hidden",
              bgcolor: 'rgba(255, 248, 220, 0.5)'
            }}
          >
            <Box
              p={3}
              display="flex"
              alignItems="center"
              borderBottom={1}
              borderColor="divider"
            >
              <EventIcon sx={{ mr: 2, color: "success.main" }} />
              <Typography variant="h5" fontWeight="medium" color="text.primary">
                History Logs
              </Typography>
            </Box>
            <DataGrid
              rows={communications}
              getRowId={(row) => row._id + row.company.name}
              columns={columns}
              pageSize={5}
              checkboxSelection
              onRowSelectionModelChange={(newRowSelectionModel) => {
                setRowSelectionModel(newRowSelectionModel);
                setSelected(newRowSelectionModel.length > 0);
              }}
              rowSelectionModel={rowSelectionModel}
              sx={{
                border: 'none',
                '& .MuiDataGrid-cell': {
                  borderColor: theme.palette.divider,
                },
                '& .MuiDataGrid-columnHeaders': {
                  bgcolor: 'rgba(255, 248, 220, 0.5)',
                  borderBottom: `1px solid ${theme.palette.divider}`,
                },
                '& .MuiDataGrid-row:hover': {
                  bgcolor: theme.palette.action.hover,
                }
              }}
            />
          </Paper>

          {/* Communication Button */}
          <Box display="flex" justifyContent="flex-end" mb={4}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleCommunicationPerformed}
              disabled={!selected}
              sx={{
                borderRadius: "20px",
                textTransform: "capitalize",
                px: 4,
                py: 2,
                boxShadow: theme.shadows[5],
                '&:hover': {
                  boxShadow: theme.shadows[10],
                }
              }}
            >
              Log Entry
            </Button>
          </Box>

          {/* Communication Modal */}
          <CommunicationModal
            open={openModal}
            onClose={handleCloseModal}
            onSubmit={handleLogCommunication}
            company={selectedCompanyId}
          />

        </Box>
      </Container>
    </Box>
  );
};

export default UserDashboard;
