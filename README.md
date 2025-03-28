# User Profile API (Express.js + MongoDB + JWT)

## 📌 Overview
This is a RESTful API that allows users to register, log in, retrieve, and update their profiles. It uses **JWT authentication** to secure routes and ensures users can only access their own profiles.

## 🛠 Tech Stack
- **Backend:** Express.js  
- **Database:** MongoDB (Mongoose ODM)  
- **Authentication:** JWT (JSON Web Token)  
- **Environment Variables:** dotenv  

## 🚀 Features
- User registration with **hashed password**  
- JWT-based authentication  
- Secure profile retrieval and updates  
- MongoDB storage  
- Error handling  

---

## 📂 Project Setup  

### 1️⃣ Clone the repository  
```bash
git clone <repository-url>
cd <project-folder>
```

### 2️⃣ Install dependencies 
```bash
npm install
```

### 3️⃣ Create a .env file 
Inside the project root, create a .env file and add the following:
```bash
DB_URL=mongodb+srv://your-database-url
JWT_SECRET=your-secret-key
PORT=3000
```

###  4️⃣ Start the server
```bash
npm start
```

By default, the server runs on http://localhost:3000/

## 🔥 API Endpoints
User Registration
Endpoint: POST /users/signup
### Request Body:
```bash
{
  "name": "John Doe",
  "email": "johndoe@example.com",
  "password": "securepassword"
}

```
### Response
```bash
{
  "response": { "id": "userId", "name": "John Doe", "email": "johndoe@example.com" },
  "token": "jwt_token"
}

```

