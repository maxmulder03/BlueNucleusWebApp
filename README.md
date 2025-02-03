

# BlueNucleus Web App 

A full-stack web application with React frontend, Spring Boot backend, and MySQL database.

## Quick Start 🏃‍♂️
## Using Docker (Recommended) 🐳

### Prerequisites
- Docker installed and running
- Docker Compose installed
- Git installed
- Docker daemon running (`sudo systemctl start docker` for Linux users)
- Ports 5173, 8080, and 3306 available on your machine

### Quick Start
```bash
# Clone the repository
git clone https://github.com/maxmulder03/BlueNucleusWebApp.git
cd BlueNucleusWebApp

# Build and start services
docker-compose up --build
```

The app will be available at:
- Frontend: http://localhost:5173
- Backend API: http://localhost:8080/api
- MySQL: localhost:3306

### Troubleshooting
If you encounter errors:
```bash
# Make sure Docker is running
sudo systemctl status docker

# Stop any services using required ports
sudo lsof -i :5173    # Check port 80
sudo lsof -i :8080  # Check port 8080
sudo lsof -i :3306  # Check port 3306

# Clean up Docker resources if needed
docker-compose down
docker system prune -a
```

### Stopping the App
```bash
# Stop the containers
docker-compose down
```

### Manual Setup

#### Frontend
```bash
cd frontend
npm install
npm run dev  # Runs on http://localhost:5173
```

#### Backend
```bash
cd backend
./gradlew build
./gradlew bootRun  # Runs on http://localhost:8080
```

#### Database
```bash
# Connect to MySQL
mysql -u root -p

# Create database and user
CREATE DATABASE bluenucleus;
CREATE USER 'user'@'localhost' IDENTIFIED BY 'password';
GRANT ALL PRIVILEGES ON bluenucleus.* TO 'user'@'localhost';
```

make sure to setup `MySQL` before running `backend`

## Project Structure 📁

```
BlueNucleusWebApp/
├── frontend/          # React + Vite frontend
├── backend/          # Spring Boot backend
├── docker-compose.yml
└── README.md
```

### Tech Stack
- **Frontend**: React 18, Vite, Material UI
- **Backend**: Java 17, Spring Boot 3.4.1
- **Database**: MySQL 8
- **Testing**: Playwright for integration tests
- **Containerization**: Docker & Docker Compose

## Development 🛠️

### Running Tests
```bash
# Frontend tests
cd frontend
npm test

# Backend tests
cd backend
./gradlew test

# Integration tests
npx playwright test
```

### API Documentation
Base URL: `http://localhost:8080/api`

| Endpoint | Method | Description |
|----------|--------|-------------|
| /api/users/getUsers | GET | Get all users |
| /api/users/create | POST | Create new user |

