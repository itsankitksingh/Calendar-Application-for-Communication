# Calendar Management Platform

This repository hosts a React-powered Calendar Management Platform created for streamlined communication tracking and interaction with companies. The application provides distinct modules for Administrator and User roles, alongside a reporting feature for analyzing communication trends. It integrates a modern, responsive interface to enhance user experience.

---

## Description

This platform is designed to facilitate the organization and monitoring of company interactions. Users can manage company data, configure communication preferences, and generate insightful reports to identify patterns in their communication.

## Live Demo

You can view a live demo of the application at [https://sparkling-wisp-b94429.netlify.app/](https://sparkling-wisp-b94429.netlify.app/)

## Features

### Admin Module
- Add, update, and delete companies.
- Configure communication methods and periodicity.
- Edit company details (name and communication preferences).
- Manage a centralized list of companies.

### User Module
- Dashboard to view communications and schedules.
- Log communication details (type, date, notes).
- View overdue and upcoming communications.
- Calendar view for tracking communication history.

### Reporting Module
- Generate visual insights for communication trends.
- Display communication frequency by type.
- Overdue communication trends.
- Interactive charts using Chart.js.

### Login and Registration
- Secure user authentication using JSON Web Tokens (JWT).
- User registration for creating new accounts.

### Responsive Design
- Optimized for various screen sizes and devices.

### clickable button
- Clickable buttons for easy navigation.
- Navigatin from user dashboard to anlytical dashboard
- Navigatin from anlytical dashboard to user dashboard
- Navigatin from admin dashboard to analytical dashboard

### Mobile Responsive
- Fully responsive design for optimal viewing on mobile devices.


### Dark Mode and Light Mode
- Toggle between dark and light modes for a personalized experience.

---


## Dependencies

The application requires the following npm packages:

- React (`react`, `react-dom`)
- React Router DOM (`react-router-dom`)
- Material-UI (`@emotion/react`, `@emotion/styled`, `@mui/icons-material`, `@mui/material`, `@mui/x-data-grid`)
- Axios (`axios`)
- Day.js (`dayjs`)
- React Tooltip (`react-tooltip`)

Install them using:
```bash
npm install react react-dom react-router-dom chart.js react-chartjs-2
```

---

## Hosting info

- Backend host on render : ``` https://www.render.com```

- Frontend host on netlify : ```https://www.netlify.com/```


## File Structure

### entnt-frontend/
```
entnt-frontend/
├── public/
│   ├── favicon.ico
│   ├── index.html
│   ├── manifest.json
│   └── robots.txt
├── src/
|   ├── components/
│   │   ├── CommunicationCalendar.jsx
│   │   ├── CommunicationModal.jsx
│   │   ├── CompanyManagement.jsx
│   │   ├── Login.jsx
│   │   ├── ProtectedRoutes.jsx
│   │   ├── Register.jsx
│   │   └── ThemeToggle.jsx
│   ├── context/
│   │   └── ThemeContext.jsx
│   ├── pages/
│   │   ├── AdminDashboard.jsx
|   │   ├── AnalyticsDashboard.jsx
│   │   └── UserDashboard.jsx
│   ├── App.jsx
│   ├── index.css
│   └── index.jsx
├── package.json
├── package-lock.json
└── README.md
```
### entnt-backend/
```
entnt-backend/
├── controllers/
│   ├── analyticsController.js
│   ├── authController.js
│   ├── communicationController.js
│   ├── communicationMethodController.js
│   ├── companyController.js
│   ├── notificationController.js
├── routes/
|   ├── analytics.js
│   ├── authRoutes.js
│   ├── communicationRoutes.js
│   ├── communicationMethodRoutes.js
│   ├── companyRoutes.js
│   ├── notificationRoutes.js
├── middleware/
│   └── authMiddleware.js
├── models/
│   ├── communication.js
│   ├── communicationMethod.js
│   ├── company.js
│   ├── notification.js
│   ├── user.js
├── server.js
├── package.json
├── package-lock.json
└── README.md
```

---

## How to Use

1. **Admin Module**:
   - Add and configure companies via the Admin dashboard.
   - Edit company details as needed.

2. **User Module**:
   - Log communication details and view them on the dashboard.
   - Use the calendar to track communication history.

3. **Reporting Module**:
   - View charts and insights to understand communication patterns.


## LIVE DEMO Pictures
Link to the live demo: [https://sparkling-wisp-b94429.netlify.app/](https://sparkling-wisp-b94429.netlify.app/)

#### Desktop View

![Screenshot 2025-01-02 214055](https://github.com/user-attachments/assets/0f101b73-1fbd-4633-a232-0acab586af59)
![Screenshot 2025-01-02 214121](https://github.com/user-attachments/assets/b75d7418-a999-420e-8e38-933b0ef3aeb3)
![Screenshot 2025-01-02 214128](https://github.com/user-attachments/assets/9ca62a4b-e0f2-49ed-83ff-8da8bdbd1120)
![Screenshot 2025-01-02 214153](https://github.com/user-attachments/assets/6ed3a619-b062-4c45-a254-fb1bc950103b)
