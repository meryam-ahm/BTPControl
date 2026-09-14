# BTPControl — Backend

Backend API for **BTPControl**, a construction project management platform designed for engineers, site managers, and workers.

Built with **Laravel 12**, **PHP**, **MySQL**, and **Laravel Sanctum**.

---

## 📌 About BTPControl

BTPControl centralizes construction-site management in one platform.

The backend provides APIs for:

* Project management
* Task and planning management
* Worker management
* Attendance tracking
* Construction resources and materials
* Inspections and incidents
* Reports
* Project media and photos
* Worker activity and communication
* Authentication and role-based access

---

## 🛠️ Technologies

| Technology            | Purpose                        |
| --------------------- | ------------------------------ |
| Laravel 12            | Backend framework              |
| PHP 8.2+              | Programming language           |
| MySQL                 | Database                       |
| Laravel Sanctum       | API authentication             |
| Eloquent ORM          | Database interaction           |
| REST API              | Frontend/backend communication |
| Git / GitHub / GitLab | Version control                |

---

## 👥 User Roles

BTPControl uses role-based access control.

### Engineer

Responsible for:

* Projects
* Planning
* Execution monitoring
* Inspections
* Validation
* Project follow-up

### Site Manager

Responsible for:

* Workers
* Tasks
* Resources
* Incidents
* Attendance
* Site monitoring

### Worker

Responsible for:

* Assigned tasks
* Task progress
* Attendance
* Reports
* Site activity
* Communication

---

## 🔐 Authentication

BTPControl uses **Laravel Sanctum** for API authentication.

Authentication flow:

```text
React
  ↓
POST /api/auth/login
  ↓
Laravel verifies credentials
  ↓
Sanctum token generated
  ↓
Token returned to React
  ↓
React sends Bearer token
  ↓
Laravel authenticates the user
```

Protected requests use:

```http
Authorization: Bearer TOKEN
Accept: application/json
```

The authenticated user is retrieved with:

```php
$request->user();
```

The application uses the authenticated user's ID instead of hard-coded user IDs.

---

## 🔑 Registration

Users can create an account through:

```http
POST /api/auth/register
```

Example request:

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

Valid roles:

```text
engineer
chef_chantier
worker
```

---

## 🚪 Login

```http
POST /api/auth/login
```

Example:

```json
{
    "email": "john@example.com",
    "password": "password123"
}
```

Successful authentication returns:

```json
{
    "message": "Login successful.",
    "user": {
        "id": 1,
        "name": "John Doe",
        "email": "john@example.com",
        "phone": "+212600000000",
        "role": "worker"
    },
    "token": "SANCTUM_TOKEN",
    "token_type": "Bearer"
}
```

---

## 👤 Current User

Authenticated user:

```http
GET /api/auth/me
```

The API returns the currently authenticated user.

---

## 🚪 Logout

```http
POST /api/auth/logout
```

The current Sanctum token is revoked.

---

## 🗂️ Backend Structure

Main Laravel structure:

```text
app/
├── Http/
│   └── Controllers/
│       ├── Auth/
│       ├── Engineer/
│       ├── SiteManager/
│       └── Worker/
│
├── Models/
│
database/
├── migrations/
├── seeders/
└── factories/
│
routes/
├── api.php
└── web.php
│
bootstrap/
└── app.php
```

---

## 🧩 Architecture

The backend follows a REST API architecture:

```text
React Frontend
      ↓
     HTTP
      ↓
Laravel API Routes
      ↓
Controllers
      ↓
Eloquent Models
      ↓
MySQL Database
```

---

## 🗄️ Database

Main entities include:

```text
users
projects
project_users
tasks
attendances
resources
inspections
inspection_checks
reports
media
notifications
```

### Important relationship

A user can participate in multiple projects through:

```text
project_users
```

This allows a project to contain multiple users while storing their project-specific role.

Example:

```text
User
 ↓
project_users
 ↓
Project
```

---

## 📋 Tasks

Tasks contain information such as:

```text
title
description
project_id
assigned_to
parent_task_id
status
priority
progress
due_date
```

Task statuses include:

```text
pending
in_progress
review
completed
cancelled
```

This supports task assignment and progress monitoring across the construction project.

---

## 👷 Worker Management

Workers are associated with projects through `project_users`.

The backend can retrieve:

* Worker information
* Assigned project
* Attendance
* Assigned tasks
* Worker activity

---

## 🧱 Resources

Resources are associated with projects.

Types include:

```text
material
equipment
tool
vehicle
```

Example fields:

```text
name
type
quantity
unit
status
supplier
project_id
```

Resource status can be:

```text
available
in_use
damaged
out_of_stock
```

---

## 🔍 Inspections & Incidents

Inspections contain inspection checks.

Example:

```text
Inspection
   ↓
Inspection Checks
   ↓
OK / FAIL / PENDING
```

Failed inspection checks can be used to identify construction incidents or non-conformities.

---

## 📸 Media

The backend supports project/site media such as photos.

Media can be associated with:

```text
project
user
inspection
```

Depending on the context.

---

## 🛡️ API Security

Protected application routes use:

```php
Route::middleware('auth:sanctum')->group(function () {
    // protected routes
});
```

This ensures that only authenticated users can access protected resources.

The backend also validates:

* Required fields
* Email format
* Password confirmation
* Allowed roles
* Resource ownership/relationships where applicable

---

## ⚙️ Installation

Clone the repository:

```bash
git clone YOUR_BACKEND_REPOSITORY_URL
```

Move into the project:

```bash
cd backend
```

Install PHP dependencies:

```bash
composer install
```

Create the environment file:

```bash
cp .env.example .env
```

Generate the application key:

```bash
php artisan key:generate
```

Configure the database inside `.env`:

```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3307
DB_DATABASE=btpcontrol
DB_USERNAME=root
DB_PASSWORD=
```

Run migrations:

```bash
php artisan migrate
```

Start Laravel:

```bash
php artisan serve
```

Backend:

```text
http://127.0.0.1:8000
```

---

## 🧹 Useful Commands

Clear Laravel cache:

```bash
php artisan optimize:clear
```

List routes:

```bash
php artisan route:list
```

Run migrations:

```bash
php artisan migrate
```

Rollback migrations:

```bash
php artisan migrate:rollback
```

Run tests:

```bash
php artisan test
```

---

## 🔌 API Base URL

Development:

```text
http://127.0.0.1:8000/api
```

The React frontend communicates with this API using Axios.

---

## 🚀 Development Architecture

```text
                BTPControl
                    │
          ┌─────────┴─────────┐
          │                   │
     React Frontend       Laravel Backend
      Port 3000              Port 8000
          │                   │
          └────── REST API ───┘
                    │
                  MySQL
```

---

## 📌 Project Goal

The goal of BTPControl is to provide a practical and centralized system for managing construction projects, improving communication between project participants, and monitoring site execution.

---

## 👩‍💻 Developer

**Meryam Ahamyan**

Full Stack Web Development
Morocco
