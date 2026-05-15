# React + Node Student CRUD with Field-Wise 2-Level Encryption

## Project Overview

This project is a secure full-stack student management system built using:

- React + TypeScript (Frontend)
- Node.js + Express + TypeScript (Backend)
- MongoDB Atlas (Database)

The application implements CRUD operations with custom field-wise 2-level AES encryption for enhanced data security and secure authentication.

---

# Features

## Authentication UI
- Animated modern login UI
- Email validation
- Password validation
- Login using registered student credentials
- Default demo login support
- Logout functionality

---

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

---

## CRUD Operations

- Create student
- Read student list
- Update student
- Delete student

---

## Security

- Field-wise AES encryption
- Frontend encryption for every field separately
- Backend second-level encryption for every field
- Secure encrypted MongoDB storage
- Login authentication using encrypted credentials
- Default demo login support

---

# Tech Stack

## Frontend
- React.js
- TypeScript
- Axios
- CryptoJS
- Vite
- CSS3

---

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
2. Each field is encrypted separately using AES encryption
3. Encrypted fields are sent to backend

### Backend
4. Backend receives encrypted fields
5. Backend applies second AES encryption on every field
6. Double encrypted fields are stored in MongoDB

---

## Fetch Flow

### Backend
1. Backend fetches encrypted fields
2. Backend decrypts one encryption layer
3. Partially encrypted fields are sent to frontend

### Frontend
4. Frontend decrypts final encryption layer
5. Original student data is displayed in UI

---

## Login Flow

1. User enters email and password
2. Backend decrypts stored encrypted credentials
3. Credentials are validated securely
4. Login access is granted on successful match

---

# Default Demo Login

```txt
Email: admin@test.com
Password: admin123
```

---

# API Routes

## Login

```http
POST /api/login
```

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
git clone https://github.com/Ankush7058/Task-react-node-typescript.git
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

Example stored encrypted fields:

```json
{
  "fullName": "U2FsdGVkX1...",
  "email": "U2FsdGVkX1...",
  "phoneNumber": "U2FsdGVkX1...",
  "password": "U2FsdGVkX1..."
}
```

---

# UI Features

- Animated authentication UI
- Modern glassmorphism design
- Responsive student cards
- Smooth hover effects
- Professional dashboard styling
- Real login using registered student credentials
- Default demo login support
- Logout functionality

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

---

# Screenshots

## Login Page

<img width="1361" height="808" alt="image" src="https://github.com/user-attachments/assets/4a419234-9ba1-4aad-983d-b0942100ac5d" />

---

## Student Registration Dashboard

<img width="1657" height="756" alt="image" src="https://github.com/user-attachments/assets/4ef188c6-ed1f-4c7f-adac-45d7fc45cde8" />

<img width="1392" height="445" alt="image" src="https://github.com/user-attachments/assets/d8947777-c13e-4f30-81b4-a01a5a116271" />

---

## MongoDB Encrypted Data

<img width="1917" height="863" alt="image" src="https://github.com/user-attachments/assets/50687070-224b-4551-a892-53095a9154a8" />

---

# Demo Credentials

```txt
Email: admin@test.com
Password: admin123
```
