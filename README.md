# User Profile API (Express.js + MongoDB + JWT)

## Overview
This is a RESTful API that allows users to register, log in, retrieve, and update their profiles. It uses **JWT authentication** to secure routes and ensures users can only access their own profiles.

## Tech Stack
- **Backend:** Express.Js  
- **Database:** MongoDB (Mongoose ODM)  
- **Authentication:** JWT (JSON Web Token)  
- **Environment Variables:** dotenv  

## Features
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
DB_URL=mongodb+srv://your-database-url (by default it will be- mongodb://localhost:27017)
JWT_SECRET=your-secret-key
PORT=3000
```

###  4️⃣ Start the server
```bash
npm start
```

By default, the server runs on http://localhost:3000/

## Postman Documentation
To make API testing easier, I have used the Postman for the testing. And I have included the detailed instruction how one can also use the same for the testing purpose.

### How to Use Postman for API Testing?

#### Go to postman and Set Up Environment Variables

Go to Postman → Create a new environment.
Add variables:
base_url = http://localhost:3000 
jwt_token = <your-auth-token> (after logging in)

Test API Endpoints by selecting the request type (Get, Post, Put(delete))
### User Registration
Endpoint: POST /users/register
URL: http://localhost:3000/users/register
#### Request Body:
```bash
{
  "name": "John Doe",
  "email": "johndoe@example.com",
  "address": "Bhopal",
  "password": "securepassword"
}

```
#### Response
```bash
{
  "response": { "id": "userId", "name": "John Doe", "address": "Bhopal",  "email": "johndoe@example.com" },
  "token": "jwt_token"
}

```

### User Login
Endpoint: POST /users/login
URL: http://localhost:3000/users/login
#### Request Body:
```bash
{
  
  "email": "johndoe@example.com",
  "password": "securepassword"

}

```
#### Response
```bash
{
  "token": "jwt_token"
}
```

### Get Profile (Protected)
Endpoint: GET /users/profile
URL: http://localhost:3000/users/profile
#### Request Body:
Headers:
```bash
Authorization: Bearer <jwt_token>

```
#### Response
```bash
{
   "user": {
        "_id": "67e64655ed532f866d7eeb62",
        "name": "ABCD",
        "email": "shraddha@hillvalley.edu12",
        "address": "Bhopal, Indore highway",
       
    }
}
```

### Update Profile (Protected)
Endpoint: PUT /users/profile
URL: http://localhost:3000/users/profile
#### Request Body:
Headers:
```bash
Authorization: Bearer <jwt_token>
```

#### Request Body:
```bash
  
 {
  "name": "Updated Name",
  "bio": "This is my updated bio"
}
```

#### Response
```bash
{
  "message": "Profile updated successfully"
}
```

## Important Notes

Ensure MongoDB is running and the DB_URL is correctly set in .env.
JWT_SECRET must be a strong, secure key.
