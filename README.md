# React + Node Student CRUD with 2-Level Encryption

## Project Overview

This project is a secure full-stack student management system built using:

- React + TypeScript (Frontend)
- Node.js + Express + TypeScript (Backend)
- MongoDB Atlas (Database)

The application implements CRUD operations with a custom 2-level AES encryption flow for enhanced data security.

---

# Features

## Authentication UI
- Login form with:
  - Email validation
  - Password validation
  - Animated modern UI

## Student Registration
Student form includes:
- Full Name
- Email
- Phone Number
- Date of Birth
- Gender
- Address
- Course Enrolled
- Password

## CRUD Operations
- Create student
- Read student list
- Update student
- Delete student

## Security
- Frontend AES encryption
- Backend second-level AES encryption
- Secure encrypted storage in MongoDB

---

# Tech Stack

## Frontend
- React.js
- TypeScript
- Axios
- CryptoJS
- Vite
- CSS3

## Backend
- Node.js
- Express.js
- TypeScript
- MongoDB + Mongoose
- CryptoJS
- dotenv

---

# Folder Structure

```txt
task-react-node-typescript/
 ┣ client/
 ┃ ┣ src/
 ┃ ┃ ┣ components/
 ┃ ┃ ┃ ┣ LoginForm.tsx
 ┃ ┃ ┃ ┣ StudentForm.tsx
 ┃ ┃ ┃ ┣ StudentList.tsx
 ┃ ┃ ┣ utils/
 ┃ ┃ ┃ ┗ crypto.ts
 ┣ server/
 ┃ ┣ src/
 ┃ ┃ ┣ routes/
 ┃ ┃ ┃ ┗ studentRoutes.ts
 ┃ ┃ ┣ controllers/
 ┃ ┃ ┃ ┗ studentController.ts
 ┃ ┃ ┣ models/
 ┃ ┃ ┃ ┗ Student.ts
 ┃ ┃ ┣ utils/
 ┃ ┃ ┃ ┗ crypto.ts
 ┃ ┃ ┣ app.ts
 ┃ ┃ ┣ server.ts
 ┣ README.md
```

---

# Encryption Flow

## Registration Flow

### Frontend
1. User fills registration form
2. Data encrypted using AES encryption
3. Encrypted data sent to backend

### Backend
4. Backend receives encrypted data
5. Backend encrypts data again
6. Double encrypted data stored in MongoDB

---

# Fetch Flow

### Backend
1. Backend fetches encrypted data
2. Backend decrypts one encryption layer
3. Sends partially encrypted data to frontend

### Frontend
4. Frontend decrypts final encryption layer
5. Original student data displayed in UI

---

# API Routes

## Create Student
```http
POST /api/register
```

## Get Students
```http
GET /api/students
```

## Update Student
```http
PUT /api/student/:id
```

## Delete Student
```http
DELETE /api/student/:id
```

---

# Setup Instructions

## Clone Repository

```bash
git clone <your-github-repository-url>
```

---

# Backend Setup

## Go to server folder

```bash
cd server
```

## Install dependencies

```bash
npm install
```

## Create .env file

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
BACKEND_SECRET_KEY=backend_secret_123
```

## Run backend

```bash
npm run dev
```

---

# Frontend Setup

## Go to client folder

```bash
cd client
```

## Install dependencies

```bash
npm install
```

## Run frontend

```bash
npm run dev
```

---

# MongoDB

MongoDB Atlas is used for database storage.

Stored data is encrypted and not visible in plain text.

Example stored data:

```json
{
  "encryptedData": "U2FsdGVkX1..."
}
```

---

# UI Features

- Animated login page
- Modern glassmorphism UI
- Responsive student cards
- Smooth hover effects
- Professional dashboard styling

---

# Future Improvements

- JWT Authentication
- Protected Routes
- Search & Filter
- Dark Mode
- Toast Notifications
- Framer Motion Animations

---

# Author

Ankush Pandit

