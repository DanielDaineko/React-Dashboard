# React Dashboard

A modern React dashboard application with authentication, charts, filters, and REST API integration.

This project was created to practice building a structured React application with authentication, data visualization, and interactive UI components.

---

# Features

• User authentication (login/logout)  
• Protected routes using React Router  
• Dashboard layout with sidebar and topbar  
• Data fetching from REST API  
• Interactive charts using Chart.js  
• Statistics cards with dynamic values  
• Orders list with status indicators  
• Search orders  
• Filter orders by status  
• Period selector (7 / 30 / 90 days)  
• Loading and error states  
• Responsive layout

---

# Tech Stack

### Frontend

• React  
• React Router DOM  
• Vite  
• JavaScript  
• CSS

### Libraries

• Axios  
• Chart.js  
• React Chart.js 2

### API

DummyJSON API  
https://dummyjson.com

Used endpoints:

• `/auth/login`  
• `/products`  
• `/users`  
• `/carts`

---

# Project Structure

```text
react-dashboard/
├─ src/
│ ├─ api/
│ │ ├─ authApi.js
│ │ └─ dashboardApi.js
│ │
│ ├─ components/
│ │ ├─ Charts/
│ │ │ ├─ SalesLineChart.jsx
│ │ │ ├─ CategoryBarChart.jsx
│ │ │ └─ RevenueDoughnutChart.jsx
│ │ │
│ │ ├─ Layout/
│ │ │ ├─ Sidebar.jsx
│ │ │ └─ Topbar.jsx
│ │ │
│ │ └─ UI/
│ │ ├─ StatCard.jsx
│ │ ├─ Loader.jsx
│ │ ├─ ErrorMessage.jsx
│ │ └─ DashboardFilters.jsx
│ │
│ ├─ context/
│ │ ├─ authContext.js
│ │ └─ AuthProvider.jsx
│ │
│ ├─ hooks/
│ │ ├─ useAuth.js
│ │ └─ useDashboardData.js
│ │
│ ├─ pages/
│ │ ├─ LoginPage.jsx
│ │ └─ DashboardPage.jsx
│ │
│ ├─ routes/
│ │ └─ PrivateRoute.jsx
│ │
│ ├─ utils/
│ │ └─ formatCurrency.js
│ │
│ ├─ App.jsx
│ ├─ main.jsx
│ ├─ index.css
│ │
│ └─ styles
│
├─ index.html
├─ package.json
├─ vite.config.js
└─ README.md
```
---

# How to Run Locally

### 1. Clone the repository
`git clone <your-repository-url>`
### 2. Go to project folder
`cd react-dashboard`
### 3. Install dependencies
`npm install`
### 4. Run development server
`npm run dev`
### 5. Open in browser
`http://localhost:5173`

---

# Demo Login

Use DummyJSON demo credentials:
`username: emilys`
`password: emilyspass`

---

# Dashboard Functionality

### Authentication Flow

1. User enters login credentials
2. App sends request to DummyJSON API
3. API returns user data and token
4. Token is stored in localStorage
5. User is redirected to the dashboard
6. Protected routes prevent unauthorized access

---

### Dashboard Data Flow

1. Dashboard loads products, users, and carts from API
2. Data is processed in a custom React hook
3. Statistics are calculated on the client
4. Charts are generated based on the filtered data
5. Filters update charts and order list dynamically

---

# What I Practiced

• Building a structured React project  
• Working with REST APIs  
• Creating reusable components  
• Using React hooks (useState, useEffect, useMemo)  
• Implementing authentication logic  
• Building interactive dashboards  
• Data visualization with Chart.js  
• Handling loading and error states  
• Creating responsive layouts

---

# Possible Improvements

• Dark mode  
• Table sorting  
• Pagination  
• Export data to CSV  
• Unit tests  
• TypeScript version  
• Real backend with JWT refresh  
• Deploy project on Vercel
