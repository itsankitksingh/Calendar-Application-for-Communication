const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const CompanyRoutes = require('./routes/companyRoutes');
const CommRoutes = require('./routes/communicationMethodRoutes');
const AuthRoutes = require('./routes/authRoutes');
const NotificationRoutes = require('./routes/notificationRoutes');
const CommunicationRoutes = require('./routes/communicationRoutes');
const analyticsRoutes = require('./routes/analytics');
const dotenv = require('dotenv');
const User = require("./models/User");

const app = express();
app.use(cors({
  origin: process.env.REACT_APP_FRONTEND_URL || 'http://localhost:3000',
  credentials: true
}));

app.use(bodyParser.json());
dotenv.config();

// Connect to MongoDB
mongoose.connect(`${process.env.MONGO_URL}`)
  .then(() => {
    console.log('Connected to MongoDB successfully');
    // Test the connection by counting users
    return User.countDocuments();
  })
  .then(count => {
    console.log(`Database has ${count} users`);
  })
  .catch((err) => {
    console.error('MongoDB connection error:', {
      message: err.message,
      code: err.code,
      stack: err.stack
    });
    process.exit(1);
  });

// Add error handler for MongoDB connection
mongoose.connection.on('error', (err) => {
  console.error('MongoDB error after initial connection:', err);
});

console.log('Environment check:', {
  mongoUrl: process.env.MONGO_URL?.substring(0, 20) + '...', // Log partial URL for security
  jwtSecret: process.env.JWT_SECRET ? 'Set' : 'Not set',
});


app.use("/api/companies", CompanyRoutes);
app.use("/api/communications", CommRoutes);
app.use("/api/notifications", NotificationRoutes);
app.use("/api/communications-user", CommunicationRoutes);
app.use("/api", AuthRoutes);
app.use('/api/analytics', analyticsRoutes);

// Start Server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`\n\nServer running on http://localhost:${PORT}✅\n\n`);
});