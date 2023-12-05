
# Full Stack React & REST API Project

This repository hosts the tenth project for the Treehouse Full Stack JavaScript Techdegree. It features a comprehensive full-stack web application, harnessing the power of React for the frontend and leveraging Express for the backend REST API.

## Project Overview

The core of this project is a dynamic web application. It's crafted using React to manage the frontend interface and Express to handle the backend REST API.

## Key Features

- **Frontend Development**: Utilizes React, implementing components for streamlined user authentication and efficient course management.
- **Backend Infrastructure**: Features an Express-based REST API that manages user and course data.
- **Cross-Origin Resource Sharing (CORS)**: Fully enabled to facilitate requests between the client and server from different origins.

## Getting Started

### Installation Steps:

1. **Repository Setup**: Clone this repository to your local machine.
2. **Dependency Installation**:
   - Navigate to the API directory (`cd api`) and run `npm install`.
   - For the client setup, enter the client directory (`cd client`) followed by `npm install`.
3. **Application Launch**:
   - Start both applications simultaneously from the root directory using `npm start`.
   - The API will be accessible on port 5000, and the Client interface on port 3000.

## Application Components

- **Authentication Modules**: Includes `UserSignIn` and `UserSignUp` for user authentication processes.
- **Course Management Tools**: Comprises `CreateCourse`, `UpdateCourse`, and `CourseDetail` for comprehensive course handling.
- **Utility Components**: Features `PrivateRoute` and `ErrorsDisplay` for enhanced functionality and user experience.

## REST API Details

- **API Access**: Available at `http://localhost:5000`.
- **Functional Endpoints**: Catering to user and course-related operations.
- **CORS Integration**: Ensures smooth handling of cross-origin requests.

## Development Practices

- Utilize `npm start` for initiating both the client and the API services.
- Conduct cross-browser testing to ensure uniform performance and appearance.
