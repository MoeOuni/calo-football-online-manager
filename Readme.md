# Calo Online Football Manager ⚽️

Calo Online Football Manager is a full-stack web application built with the **MERN stack** (MongoDB, Express, React, Node.js) and **TypeScript**. It provides a platform for managing online football games in an intuitive and efficient manner.

---
## Getting Started

Follow these steps to set up the application on your local machine.

### Prerequisites

Ensure you have the following installed:

- **Node.js** (v16 or above)
- **npm** (v7 or above)

### Installation

1. **Clone the Repository**
   ```bash
   git clone <repository-url>
   cd <repository-folder>
   ```

2. **Install Dependencies**  
   Open two terminal windows to install and run the frontend and backend servers separately:  

   - **In the `client` folder**:  
     Navigate to the `client` directory and run the following commands:  
     ```bash  
     cd client  
     npm install  
     npm run dev  
     ```  
     This will install all the dependencies for the frontend and start the React development server at `http://localhost:5173`.  

   - **In the `api` folder**:  
     Navigate to the `api` directory and run the following commands:  
     ```bash  
     cd api  
     npm install  
     npm run dev  
     ```  
     This will install all the dependencies for the backend and start the API server at `http://localhost:3000`.  

---

### Verifying the Setup  

1. **API Server**  
   Open your browser or use a tool like Postman or cURL to verify that the backend server is running. Navigate to `http://localhost:3000/api` (or any available route you have defined).  

2. **Frontend Application**  
   Open your browser and go to `http://localhost:5173` to view the running React app.  

---

### Running the Full Stack  

Make sure both the frontend and backend servers are running simultaneously. The frontend communicates with the backend API at `http://localhost:3000`.  

If you encounter any issues with the setup, check the logs in the terminal windows for errors or missing configurations.  

---  

## Additional Development Notes  

### Using a Custom Database  

If you'd like to use a custom MongoDB database instead of the pre-configured one on MongoDB Atlas:  

1. Update the `MONGO_URI` in the `.env` file located in the `api` folder with your own database connection string.  
2. Restart the backend server to apply the changes:  
   ```bash  
   npm run dev  
    ```

## Folder Structure

The project is organized to ensure scalability, maintainability, and clarity. Below is the updated breakdown for both the **frontend** and **backend**, including the `hooks` folder for reusable custom hooks.

---

### Frontend (Client)

The frontend is built using **React**, **TypeScript**, and **Vite**. The folder structure is as follows:

```plaintext
client/  
├── public/             # Static assets that are directly served (e.g., favicon, images)  
├── src/                # Main source code for the React application  
│   ├── api/            # API client for interacting with the backend (using TanStack Query)  
│   ├── assets/         # Static files such as images, fonts, etc.  
│   ├── components/     # Reusable UI components used across the application  
│   ├── hooks/          # Custom React hooks for encapsulating reusable logic  
│   ├── lib/            # Utility functions, schemas, types, and localization (i18n)  
│   ├── pages/          # Page-level components for different routes  
│   ├── routes/         # Route configuration for the application  
│   ├── layouts/        # Layout components for structuring different sections of the app  
│   ├── providers/      # Context and custom providers for app-wide state management  
│   ├── App.tsx         # Root component for the React application  
│   ├── index.tsx       # Entry point for the React application  
│   └── vite.config.ts  # Vite configuration for the frontend  
├── .env                # Environment variables for the frontend  
├── package.json        # Project dependencies and scripts for the frontend  
└── tsconfig.json       # TypeScript configuration for the frontend  
```

## Backend Folder Structure

The backend is organized to ensure clarity, scalability, and ease of maintenance. Below is an overview of the folder structure:

```plaintext
api/  
├── public/              # Static assets that are directly served (e.g., favicon, images)
├── src/                 # Main source code for the backend application  
│   ├── config/          # Application configuration (e.g., environment variables)  
│   ├── controllers/     # Handles business logic for routes  
│   ├── dtos/            # Data Transfer Objects for request validation  
│   ├── exceptions/      # Custom exceptions for error handling  
│   ├── interfaces/      # TypeScript interfaces for consistent type definitions  
│   ├── middlewares/     # Middleware for authentication, validation, and error handling  
│   ├── models/          # Mongoose schemas and models for database interaction  
│   ├── routes/          # API route definitions, grouped by feature/module  
│   ├── services/        # Business logic and service-layer abstraction  
│   ├── templates/       # EJS email templates
│   ├── utils/           # Utility functions like logging and environment validation  
│   ├── app.ts           # Main Express app setup and configuration  
│   └── server.ts        # Server initialization and startup logic  
├── .env.*               # Environment variable files for different environments  
├── package.json         # Project dependencies and scripts  
└── tsconfig.json        # TypeScript configuration  
```

