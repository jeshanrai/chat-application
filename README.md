# Real-Time Chat App (MERN)
This project is a real-time chat application built as part of the **Palm Mind Technology Hiring Task**.  
It includes:

- User Authentication (Register/Login/Update/Delete)
- Live Messaging using Socket.IO
- MongoDB for storing users and chat history
- Online/offline user status tracking
- Real-time UI updates with React and Tailwind CSS

## Backend Setup & Start (with nodemon)

### 1. Go to backend folder
cd backend

### 2. Install dependencies
npm install

### 3. Copy example env and edit values
cp .env.example .env
####  Open .env and update MONGO_URI, JWT_SECRET, CLIENT_URL

### 4. Start server with nodemon
npx nodemon src/index.js

## Frontend Setup & Start (React)

### 1. Go to frontend folder
cd frontend

### 2. Install dependencies
npm install

### 3. Copy example env and edit values
cp .env.example .env
####  Open .env and update REACT_APP_BACKEND_URL

### 4. Start React development server
npm start


## Tech Stack

###  Backend
- Node.js
- Express.js
- MongoDB + Mongoose
- JWT Authentication
- Socket.IO
- JavaScript

### 🎨 Frontend
- React.js
- JavaScript
- Tailwind CSS
- Socket.IO Client

##  Features

###  User Management (CRUD + Authentication)
- User registration and login using JWT
- Secure password hashing using bcrypt
- Protected routes with authorization middleware
- Prevent duplicate email or username registration

###  Real-Time Chat (Socket.IO)
- Real-time one-to-one messaging
- Emit & listen chat events instantly
- Show online/offline status of users
- Update status when a user joins or leaves
- Save chat history to MongoDB

###  Statistics 
- Total users count

###  Frontend UI
- Responsive chat layout (message list + input box)
- Real-time UI updates without refresh
- Auto-scroll to latest message
- Tailwind CSS styled interface

###  Security
- Passwords are hashed, never stored in plain text
- JWT token-based route protection
- CORS protection with allowed origins
- Environment variables hidden using `.env`


