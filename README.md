# Job Portal - MERN Stack

A comprehensive job portal application built using the MERN stack (MongoDB, Express.js, React, Node.js). This platform allows job seekers to search and apply for jobs, and recruiters to post and manage job listings.

---

## Table of Contents

- [Features](#features)
- [Project Structure](#project-structure)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Environment Variables](#environment-variables)
  - [Running the Application](#running-the-application)
- [API Endpoints](#api-endpoints)
- [Folder Structure](#folder-structure)
- [Contributing](#contributing)
- [License](#license)
- [Acknowledgements](#acknowledgements)

---

## Features

- User authentication (JWT-based)
- Role-based access (Job Seeker & Recruiter)
- Job posting, editing, and deletion (Recruiter)
- Job search and filtering (Job Seeker)
- Application tracking for both users and recruiters
- Profile management (with resume upload)
- Responsive UI (Tailwind CSS, shadcn/ui)
- RESTful API
- Error handling and validation
- Modern React with hooks and Redux Toolkit

---

## Project Structure

```
Job Portal - Mern Stack/
│
├── backend/
│   ├── .env
│   ├── package.json
│   ├── src/
│   │   ├── controllers/
│   │   ├── middlewares/
│   │   ├── models/
│   │   ├── routers/
│   │   └── utils/
│   └── ...
│
├── frontend/
│   ├── package.json
│   ├── index.html
│   ├── src/
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   ├── components/
│   │   ├── redux/
│   │   └── utils/
│   └── ...
│
├── .gitignore
└── README.md
```

---

## Tech Stack

**Frontend:**
- React
- Redux Toolkit
- Tailwind CSS
- shadcn/ui
- Axios

**Backend:**
- Node.js
- Express.js
- MongoDB & Mongoose
- JWT for authentication
- Multer & Cloudinary for file uploads

**Other:**
- ESLint
- dotenv
- Vite (for frontend build)

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18+ recommended)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- [MongoDB](https://www.mongodb.com/) (local or Atlas)

### Installation

1. **Clone the repository:**
   ```sh
   git clone https://github.com/your-username/job-portal-mern.git
   cd "Job Portal - Mern Stack"
   ```

2. **Install backend dependencies:**
   ```sh
   cd backend
   npm install
   ```

3. **Install frontend dependencies:**
   ```sh
   cd ../frontend
   npm install
   ```

### Environment Variables

Create a `.env` file in the `backend` directory with the following content:

```
PORT=8000
DB_NAME=JobPortal
MONGODB_URI=your_mongodb_uri
CORS_ORIGIN=http://localhost:5173
CLOUD_NAME=your_cloudinary_cloud_name
CLOUD_API_KEY=your_cloudinary_api_key
CLOUD_API_SECRET=your_cloudinary_api_secret
JWT_SECRET=your_jwt_secret
```

> **Note:** Never commit your `.env` files to version control. See `.gitignore` for details.

### Running the Application

1. **Start the backend server:**
   ```sh
   cd backend
   npm start
   ```
   The backend will run on [http://localhost:8000](http://localhost:8000).

2. **Start the frontend development server:**
   ```sh
   cd frontend
   npm run dev
   ```
   The frontend will run on [http://localhost:5173](http://localhost:5173).

---

## API Endpoints

Here are some example endpoints (see code for full details):

- `POST /api/auth/register` — Register a new user
- `POST /api/auth/login` — Login and receive JWT
- `GET /api/jobs` — List all jobs
- `POST /api/jobs` — Create a new job (Recruiter only)
- `GET /api/jobs/:id` — Get job details
- `PUT /api/jobs/:id` — Update job (Recruiter only)
- `DELETE /api/jobs/:id` — Delete job (Recruiter only)
- `POST /api/applications` — Apply for a job
- `GET /api/applications` — List applications (User/Recruiter)

---

## Folder Structure

- **backend/src/controllers/** — Route handler logic
- **backend/src/models/** — Mongoose schemas and models
- **backend/src/routers/** — Express route definitions
- **backend/src/middlewares/** — Authentication, error handling, etc.
- **frontend/src/components/** — React UI components
- **frontend/src/redux/** — Redux Toolkit slices and store
- **frontend/src/utils/** — Helper functions

---

## Contributing

Contributions are welcome! Please open an issue or submit a pull request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/YourFeature`)
3. Commit your changes (`git commit -am 'Add some feature'`)
4. Push to the branch (`git push origin feature/YourFeature`)
5. Open a pull request

---

## License

This project is licensed under the MIT License.

---

## Acknowledgements

- [shadcn/ui](https://ui.shadcn.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Vite](https://vitejs.dev/)
- [MongoDB](https://www.mongodb.com/)
- [Cloudinary](https://cloudinary.com/)

---

> **Made with ❤️ using the MERN stack.**
