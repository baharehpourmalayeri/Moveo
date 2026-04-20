# Moveo - Gym Web Application

Moveo is a fully functional, production-style gym platform designed to help users discover training sessions, book and manage their reservations through a real-time booking system based on capacity. The platform also includes authentication with register and login functionality, giving users access to personalized features such as favorite sessions and booking history.

## 🏗️ Architecture

- **Frontend**: Angular 21 with Material UI and Tailwind CSS
- **Backend**: FastAPI with PostgreSQL database
- **Authentication**: JWT-based user authentication
- **Deployment**: Docker containerized

## 📁 Project Structure

```
moveo/
├── backend/                 # FastAPI backend
│   ├── app/
│   │   ├── main.py         # FastAPI application
│   │   ├── database.py     # Database configuration
│   │   ├── routers/        # API endpoints
│   │   ├── models/         # SQLAlchemy models
│   │   ├── crud/           # Database operations
│   │   ├── schema/         # Pydantic schemas
│   │   └── utils/          # Utilities
│   ├── requirements.txt    # Python dependencies
│   ├── Dockerfile         # Backend container
│   └── db.sql             # Database schema
└── frontend/               # Angular frontend
    ├── src/
    │   ├── app/
    │   │   ├── core/       # Core services and guards
    │   │   ├── pages/      # Application pages
    │   │   ├── shared/     # Shared components
    │   │   └── environments/ # Environment configs
    │   └── assets/         # Static assets
    ├── Dockerfile         # Frontend container
    ├── nginx.conf         # Nginx configuration
    └── package.json       # Node dependencies
```

## 🚀 Quick Start

### Prerequisites

- Docker
- Node.js 20+ (for local frontend development)
- Python 3.12+ (for local backend development)
- PostgreSQL (or use Docker)

### 1. Clone the Repository

```bash
git clone https://github.com/baharehpourmalayeri/Moveo.git
cd moveo
```

### 2. Environment Setup

#### Backend Environment Variables

Create `backend/.env`:

```env
DB_USER=postgres
DB_PASSWORD=your_password
DB_HOST=localhost
DB_PORT=5432
DB_NAME=moveo

SECRET_KEY=your-secret-key-here
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30
```

#### Frontend Environment Variables

Local: `frontend/src/app/environments/environment.ts`:

```env
apiBaseUrl: http://127.0.0.1:8000
```

Production: `frontend/src/app/environments/environment.prod.ts`:

```env
apiBaseUrl: https://your-production-api-url.com
```

### 3. Database Setup

#### Using Docker (Recommended)

```bash
# Start PostgreSQL
docker run --name moveo-postgres -e POSTGRES_PASSWORD=your_password -e POSTGRES_DB=moveo -p 5432:5432 -d postgres:13
```

#### Manual Setup

```bash
# Install PostgreSQL and create database
createdb moveo
```

### 4. Backend Development

```bash
cd backend
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Run database migrations (if needed)
# The app will create tables automatically on startup

# Start development server
uvicorn app.main:app --reload
```

API will be available at: http://127.0.0.1:8000

### 5. Frontend Development

```bash
cd frontend

# Install dependencies
npm install

# Start development server
ng serve
```

Frontend will be available at: http://localhost:4200

## 🐳 Docker Deployment

### Build and Run with Docker

#### Backend

```bash
cd backend
docker build -t moveo-backend .
docker run -p 8000:8000 --env-file .env moveo-backend
```

#### Frontend

```bash
cd frontend
docker build -t moveo-frontend .
docker run -p 80:80 moveo-frontend
```

## 📚 API Documentation

When the backend is running, visit:

- **Swagger UI**: http://127.0.0.1:8000/docs
- **ReDoc**: http://127.0.0.1:8000/redoc
- **OpenAPI JSON**: http://127.0.0.1:8000/openapi.json

## 🔑 Features

### User Management

- User registration and login
- JWT-based authentication
- Password change functionality
- Profile management

### Workout Management

- Browse available workouts
- Book sessions for each workout
- View workout details
- Manage bookings
- Favorite workouts

### Coach Scheduling

- View available coaches
- Book sessions with coaches
- Manage bookings
