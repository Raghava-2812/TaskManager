# 📌 Task Manager App

A full-stack Task Manager application built with the MERN stack (MongoDB, Express, React, Node.js).
Users can sign up, log in, add, edit, delete, and mark tasks as complete.
Each user has their own tasks securely stored in MongoDB with JWT authentication.

## 🚀 Features

🔐 User authentication (Sign Up & Login) using JWT

📝 Add, edit, delete tasks

✅ Mark tasks as complete / pending

👥 Each user has separate tasks

🎨 Modern responsive UI

🌍 Backend + Frontend deployed online

💾 Database: MongoDB Atlas

## 🛠 Tech Stack

Frontend: React, Axios, CSS
Backend: Node.js, Express, JWT
Database: MongoDB Atlas
Deployment: Render (backend), Vercel (frontend)

## 📂 Project Structure
TaskManager/
│── backend/        # Express + MongoDB server
│   ├── models/     # Mongoose models
│   ├── routes/     # API routes
│   └── server.js   # Entry point
│
│── frontend/       # React app
│   ├── src/
│   │   ├── components/  # Auth, TaskList, Navbar
│   │   ├── App.js
│   │   └── index.js
│   └── package.json
│
└── README.md

##⚡ Installation & Setup
### 1. Clone Repo
git clone https://github.com/Raghava-2812/TaskManager.git
cd TaskManager

### 2. Setup Backend
cd backend
npm install


#### Create a .env file inside backend/:

PORT=5000
MONGO_URI=your_mongodb_atlas_url
JWT_SECRET=yourSecretKey


#### Run backend:

npm start


* Backend will run at: * http://localhost:5000

### 3. Setup Frontend
cd ../frontend
npm install
npm start


* Frontend will run at: * http://localhost:3000

### 🌍 Deployment

Backend → Render

Frontend → Vercel

Database → MongoDB Atlas

* Update frontend API URLs from http://localhost:5000 → your backend URL. *
