# Music Streaming Application (Full-Stack)

This repository contains a complete full-stack music streaming application built using **Spring Boot** for the backend and **Angular** for the frontend. The project integrates the two separate components into a single cohesive application, providing features like album and song management, user authentication, and an integrated audio player for seamless music playback.

## Table of Contents
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Setup Instructions](#setup-instructions)
- [Backend Overview](#backend-overview)
- [Frontend Overview](#frontend-overview)
- [UML Diagrams](#uml-diagrams)
- [Deployment](#deployment)
- [Testing](#testing)
- [Project Links](#project-links)
- [Contributors](#contributors)

---

## Features

### Backend (Spring Boot)
- **Album Management**:
    - List, search, filter, and sort albums with pagination.
    - Add, update, and delete albums (admin only).
- **Song Management**:
    - List, search, filter, and sort songs with pagination.
    - Upload audio files (MP3, WAV, OGG, max 15MB).
    - Add, update, and delete songs (admin only).
- **User Management**:
    - JWT-based authentication and role-based access control.
    - User registration and admin-only user role management.
- **Audio File Management**:
    - Secure audio file storage using MongoDB GridFS.
    - Support for audio file streaming.

### Frontend (Angular)
- **User Interface**:
    - Authentication (login and registration).
    - Album library and detailed album pages.
    - Search and filtering functionality for albums and songs.
- **Audio Player**:
    - Play, pause, next, and previous controls.
    - Volume and progress control.
    - State management using NgRx.
- **Admin Features**:
    - Manage albums and songs via a dedicated admin interface.
    - Upload audio files with metadata management.

---

## Tech Stack

### Backend
- Spring Boot
- Spring Security with JWT
- Spring Data MongoDB
- MongoDB (with GridFS)
- Docker
- JUnit and Mockito for testing

### Frontend
- Angular 17
- NgRx for state management
- RxJS for reactive programming
- Tailwind CSS (or Bootstrap) for UI design
- Cypress for end-to-end testing

---

## Setup Instructions

### Prerequisites
- Node.js and npm (for Angular)
- Java 8+ (for Spring Boot)
- MongoDB
- Docker (for deployment)

### Backend Setup
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Install dependencies and build the project:
   ```bash
   ./mvnw clean install
   ```
3. Start the application:
   ```bash
   java -jar target/music-streaming-backend.jar
   ```
4. Access the API at `http://localhost:8080`.

### Frontend Setup
1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the Angular development server:
   ```bash
   npm start
   ```
4. Access the application at `http://localhost:4200`.

---

## Backend Overview
- **Endpoints**:
    - `/api/user/albums`: Public album APIs.
    - `/api/admin/albums`: Admin-only album APIs.
    - `/api/user/songs`: Public song APIs.
    - `/api/admin/songs`: Admin-only song APIs.
    - `/api/auth`: Authentication endpoints (login, register).
- **Data Models**:
    - `Album`: Stores album details.
    - `Song`: Stores song details, including `audioFileId` for GridFS.
    - `User`: Manages user credentials and roles.
- **Security**:
    - JWT-based authentication.
    - Role-based access control for admin and user routes.

---

## Frontend Overview
- **Modules**:
    - `AuthModule`: Handles login and registration.
    - `LibraryModule`: Displays albums and tracks.
    - `PlayerModule`: Implements the audio player.
    - `AdminModule`: Provides CRUD functionality for albums and songs.
- **State Management**:
    - NgRx Store for managing app-wide states.
    - NgRx Effects for handling side effects like API calls.
- **UI Components**:
    - Reusable components for album cards, track lists, and forms.

---

## UML Diagrams
1. **Use Case Diagram**:
    - Demonstrates the interactions between users, admins, and the system.
2. **Class Diagram**:
    - Shows relationships between `Album`, `Song`, `User`, and other entities.

*Diagrams are included in the `diagrams/` folder.*

---

## Deployment
1. Build Docker images for both frontend and backend:
   ```bash
   docker-compose build
   ```
2. Start the application using Docker Compose:
   ```bash
   docker-compose up
   ```
3. Access the application at `http://localhost`.

---

## Testing

### Backend
- Run unit tests:
  ```bash
  ./mvnw test
  ```

### Frontend
- Run unit tests:
  ```bash
  npm test
  ```
- Run end-to-end tests:
  ```bash
  npm run e2e
  ```

---

## Project Links

- [Jira](https://benfill.atlassian.net/jira/software/projects/MUS/boards/469?issueParent=11434&sprintStarted=true&atlOrigin=eyJpIjoiYzcwMjFjOTJiMjc5NDZiMzg4ZGYyZTg4NWJkMTM4NjAiLCJwIjoiaiJ9)
- [Figma](https://www.figma.com/design/2pgt3vqyOYVAeKDhnDywmJ/SongCloud?node-id=0-1&t=SxhUm7kI4SoEGwJZ-1)

---

## Contributors
- **Anass Benfillous**: Full-stack development

---

For any issues or contributions, feel free to open an issue or submit a pull request on GitHub.

