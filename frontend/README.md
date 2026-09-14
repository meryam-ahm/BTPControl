# BTPControl — Frontend

Frontend application for **BTPControl**, a construction project management platform built with **React**.

The application provides dedicated interfaces for engineers, site managers, and workers while using one centralized authentication system.

---

## 📌 About BTPControl

BTPControl provides a unified interface for construction project management.

The frontend communicates with the Laravel backend through REST APIs.

```text
React Frontend
      ↓
    Axios
      ↓
Laravel REST API
      ↓
    MySQL
```

---

## 🛠️ Technologies

| Technology      | Purpose              |
| --------------- | -------------------- |
| React           | Frontend framework   |
| JavaScript      | Programming language |
| React Router    | Application routing  |
| Axios           | API communication    |
| Tailwind CSS    | UI styling           |
| Lucide React    | Icons                |
| Laravel Sanctum | Authentication       |
| Git             | Version control      |

---

## 👥 Role-Based Interfaces

BTPControl uses one React application with different interfaces depending on the authenticated user's role.

### Engineer

Main interface:

```text
/engineer
```

Includes:

* Project dashboard
* Execution monitoring
* Planning
* Project editing
* Project follow-up

---

### Site Manager

Main interface:

```text
/
```

Includes:

* Dashboard
* Workers
* Tasks
* Resources
* Incidents
* Project selection

---

### Worker

Main interface:

```text
/worker
```

Includes:

* Home
* Tasks
* Activity
* Profile
* Attendance
* Worker communication

---

## 🔐 Authentication

The application uses one centralized login page:

```text
/login
```

and one registration page:

```text
/register
```

Authentication flow:

```text
              Login
                ↓
        Laravel /api/auth/login
                ↓
          User + Token
                ↓
          Read user.role
                ↓
       ┌────────┼────────┐
       ↓        ↓        ↓
   Engineer    Chef     Worker
       ↓        ↓        ↓
 /engineer      /       /worker
```

The token is stored locally:

```javascript
localStorage.setItem("token", token);
```

The authenticated user is stored as:

```javascript
localStorage.setItem(
    "user",
    JSON.stringify(user)
);
```

---

## 🔑 Registration

The registration page sends:

```http
POST /api/auth/register
```

with:

```json
{
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "+212600000000",
    "password": "password123",
    "password_confirmation": "password123",
    "role": "worker"
}
```

After registration, the user is automatically authenticated and redirected according to their role.

---

## 🧭 Routing

React Router is used for role-specific navigation.

### Authentication

```text
/login
/register
```

### Engineer

```text
/engineer
/engineer/ProjectDashboard
/engineer/execution
/engineer/planning
/engineer/projects/:projectId/edit
```

### Site Manager

```text
/
/workers
/workers/:projectId
/tasks
/tasks/:projectId
/resources
/resources/:projectId
/incidents
/incidents/:projectId
```

### Worker

```text
/worker
/worker/tasks
/worker/activity
/worker/profile
```

---

## 🧩 Frontend Structure

```text
src/
│
├── App.jsx
├── Login.jsx
├── Register.jsx
│
├── Components/
│   └── Shared Components
│
├── Ingenieur/
│   ├── ProjectDashbored.jsx
│   ├── ExecutionMonitoring.jsx
│   ├── PlanningGantt.jsx
│   └── EditProject.jsx
│
├── chef_chantier/
│   ├── Dashboard.jsx
│   ├── Sidebar.jsx
│   ├── Workers.jsx
│   ├── Tasks.jsx
│   ├── Resources.jsx
│   └── Incidents.jsx
│
└── travailleur/
    ├── WorkerHome.jsx
    ├── WorkerTasks.jsx
    ├── WorkerActivity.jsx
    └── WorkerProfile.jsx
```

---

## 📱 Worker Interface

The worker interface is designed as a mobile-style experience.

```text
        Worker
          │
 ┌────────┼────────┐
 │        │        │
Home    Tasks   Activity
 │
Profile
```

The interface uses a compact mobile layout suitable for workers accessing the system from construction sites.

---

## 🎨 UI Design

BTPControl follows a modern construction-management style inspired by professional project-management applications.

Design principles include:

* Clean dashboards
* Responsive interfaces
* Clear status indicators
* Construction-focused terminology
* Simple navigation
* Consistent spacing
* Reusable components

Primary visual direction:

```text
Slate / Dark Blue
        +
      Yellow
        +
      White
        +
      Light Gray
```

---

## 🔄 API Communication

Axios is used to communicate with Laravel.

Example:

```javascript
axios.get(
    "http://127.0.0.1:8000/api/projects",
    {
        headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
        },
    }
);
```

The Bearer token identifies the authenticated user.

---

## 🔒 Protected Access

The application checks the authenticated user before displaying role-specific interfaces.

Example:

```javascript
if (user.role === "worker") {
    // Worker interface
}

if (user.role === "engineer") {
    // Engineer interface
}

if (user.role === "chef_chantier") {
    // Site Manager interface
}
```

Invalid roles are redirected to the login page.

---

## 🚪 Logout

When a user logs out:

```text
Logout
  ↓
POST /api/auth/logout
  ↓
Token removed
  ↓
User removed from localStorage
  ↓
Redirect /login
```

Example:

```javascript
localStorage.removeItem("token");
localStorage.removeItem("user");

window.location.href = "/login";
```

---

## ⚙️ Installation

Clone the repository:

```bash
git clone YOUR_FRONTEND_REPOSITORY_URL
```

Move into the project:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm start
```

The frontend runs on:

```text
http://localhost:3000
```

---

## 🔗 Backend Connection

The React application communicates with:

```text
http://127.0.0.1:8000/api
```

The Laravel backend must be running before using API-dependent features.

---

## 🌐 Application Architecture

```text
                 BTPControl
                     │
              React Application
                     │
              React Router
                     │
          ┌──────────┼──────────┐
          │          │          │
       Engineer   Site Manager  Worker
          │          │          │
          └──────────┼──────────┘
                     │
                   Axios
                     ↓
              Laravel API
                     ↓
                   MySQL
```

---

## 📦 Main Frontend Features

### Engineer

```text
Project Dashboard
Planning
Execution Monitoring
Project Management
```

### Site Manager

```text
Dashboard
Workers
Tasks
Resources
Incidents
Attendance
```

### Worker

```text
Home
Assigned Tasks
Task Progress
Attendance
Activity
Communication
```

---

## 🧪 Development

Start React:

```bash
npm start
```

Install a new package:

```bash
npm install package-name
```

Build for production:

```bash
npm run build
```

---

## 🚀 Production Build

Create the production build:

```bash
npm run build
```

The generated files are stored in:

```text
build/
```

The project can then be deployed to a suitable web server or hosting platform.

---

## 🔗 Backend + Frontend Ports

BTPControl uses one React frontend server and one Laravel backend server:

```text
React   → http://localhost:3000
Laravel → http://127.0.0.1:8000
```

The different user roles are **not separate React applications**.

They are different interfaces inside the same React application.

---

## 📌 Why One Frontend Application?

Using one React application provides:

* Centralized authentication
* Shared components
* Shared routing
* Shared API configuration
* Easier maintenance
* Consistent UI
* Role-based access control

Instead of creating three separate frontend applications, BTPControl dynamically displays the correct interface according to the authenticated user's role.

---

## 👩‍💻 Developer

**Meryam Ahamyan**

Full Stack Web Development
Morocco
