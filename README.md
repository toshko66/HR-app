


# Setting up PostgreSQL Database and relevent table Table

### 1. Using pgAdmin4
Step 1: Open pgAdmin4
Step 2: Create a New Database
In the left panel, right-click on Servers and then PostgreSQL 14 (or whichever version you have installed).
Expand the server and right-click on Databases.
Select Create -> Database.
Give your database a name. DB_NAME: web
Step 3: Create a New Table
In the dialog, name your table (e.g., users).
Step 4: Running SQL Queries
To manually create a table via an SQL query, click on the Query Tool (icon is a lightning bolt or in the Tools dropdown).
Paste the following SQL query:
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    user_type VARCHAR(20) NOT NULL,
    reset_token VARCHAR(255),
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);
Click Execute (F5) to run the query.

Create users of type Employee and Company to test thge functionality.




# Backend

This backend API is built using Node.js, Express, bcryptjs for password hashing, and JWT tokens for authentication. It handles user registration, login, token refreshing, and logout for both employee and company users.

## Features

- **Employee Registration:** Allows employees to register with their details.
- **Company Registration:** Allows companies to register with their details.
- **Employee and Company Login:** Secure login for both employees and companies.
- **Token Refresh:** Allows refreshing of expired JWT access tokens.
- **Logout:** Clears access and refresh tokens for logout.

## Tech Stack

- **Node.js:** Backend framework.
- **Express:** Web framework for Node.js.
- **bcryptjs:** For hashing and comparing passwords.
- **JWT (JSON Web Token):** User authentication and token management.
- **Sequelize:** ORM used to manage the PostgreSQL database.

## API Endpoints

### 1. User Registration

#### Register Employee
**Endpoint:** `POST /register/employee`  
**Description:** Registers a new employee.  
**Request Body:**

```json
{
  "first_name": "John",
  "last_name": "Doe",
  "email": "john@example.com",
  "password": "password123"
}
```
Response:
Success: 201 Created
```json
{
  "message": "Employee registered successfully",
  "user": {
    "first_name": "John",
    "last_name": "Doe",
    "email": "john@example.com",
    "user_type": "employee"
  }
}
````
Failure:
400 Bad Request: Missing required fields.
409 Conflict: Email already exists.


### Register Company
**Endpoint:** `POST /register/company`  
**Description:** Registers a new company.  
**Request Body:**
```json
{
  "first_name": "Jane",
  "last_name": "Smith",
  "email": "jane@example.com",
  "password": "password123"
}
```
Response:
Success: 201 Created
```json
{
  "message": "Company registered successfully",
  "user": {
    "first_name": "Jane",
    "last_name": "Smith",
    "email": "jane@example.com",
    "user_type": "company"
  }
}
````
Failure:
400 Bad Request: Missing required fields.
409 Conflict: Email already exists.


### 2. User Login

####Login Employee
**Endpoint:** POST /login/employee
**Description:** Logs in an employee and returns tokens.
**Request Body:**
````json
{
  "email": "john@example.com",
  "password": "password123"
}
````
**Response:**
**Success:** 200 OK
```json
{
  "message": "Login successful",
  "payload": {
    "id": 1,
    "first_name": "John",
    "user_type": "employee"
  }
}
```
**Access and refresh tokens will be set as HttpOnly cookies.**
Failure:
401 Unauthorized: Invalid credentials.

#### Login Company

**Endpoint:** POST /login/company
**Description:** Logs in a company and returns tokens.
**Request Body:**
```json
{
  "email": "jane@example.com",
  "password": "password123"
}
```
**Response:***
Success: 200 OK
```json
{
  "message": "Login successful",
  "payload": {
    "id": 1,
    "first_name": "Jane",
    "user_type": "company"
  }
}
```
***Access and refresh tokens will be set as HttpOnly cookies.***
Failure:
401 Unauthorized: Invalid credentials.

#### 3. Token Management

### Refresh Token
**Endpoint:** POST /token
**Description:** Refreshes the access token using the refresh token.
***Request Body:***
```json
{
  "refreshToken": "your-refresh-token"
}
```

**Response:**
Success: 200 OK
```json
{
  "message": "Token refreshed"
}
```` 
A new access token will be set as an HttpOnly cookie.
Failure:
403 Forbidden: Invalid or missing refresh token.

####  4. User Logout
### Logout
**Endpoint:** POST /logout
**Description:** Logs out a user by clearing the tokens.
Respons:
Success: 200 OK
```json
{
  "message": "Logout successful"
}
```
Access and refresh tokens will be cleared.

#### Models

###User Model
The User model represents both employees and companies. It uses Sequelize for interaction with the database.

#### Authentication Flow

1. Registration: When a user (employee or company) registers, their password is hashed using bcryptjs and stored in the database.
2. Login: On login, the user's password is compared with the stored hash. If the credentials are valid, a JWT access token and refresh token are generated and stored as HttpOnly cookies.
3.Token Refresh: When the access token expires, the refresh token is used to generate a new access token.
4.Logout: On logout, the access and refresh tokens are cleared.

#### Security
1.Password Hashing: Passwords are hashed using bcryptjs before storing them in the database.
2.JWT Tokens: JWT tokens (access and refresh) are used for authentication. Access tokens expire after 15 minutes, while refresh tokens expire after 1 hour.
3.HttpOnly Cookies: Tokens are stored in HttpOnly cookies to prevent access from JavaScript and mitigate XSS attacks.

Environment Variables
NODE_ENV: Defines the environment (development/production).
JWT_SECRET: Secret key for signing JWT tokens.
JWT_REFRESH_SECRET: Secret key for signing refresh tokens.
DATABASE_URL: URL for connecting to the database.

####Running the Project
Before running the project make sure you folllowed the steps for the DataBase setup

1.Clone the repository.
2.Navigate to project directory(differenet setup for Front/Backend)
2.Install dependencies:
Web-It/Frontend:
```bash
npm install
```
Run the server:
```bash
npm run dev
```
Web-It/Backend:
```bash
npm install
```
Run the server:
```bash
node server.js
```

# Frontend

## Tech Stack
React: JavaScript library for building user interfaces.
Redux: State management library used to handle user authentication and other global state.
React Router: Used for navigating between different pages in the application.
TailwindCSS: Used for styling with utility classes

## Project Structure
bash
/src
  /assets           # Images
  /components       # Reusable larger components like forms, etc.
  /elements         # Reusable smaller components like buttons, etc.
  /errors           # Error pages
  /features         # Redux toolkit logic 
  /hooks            # Custom utility hooks 
  /pages            # Different route pages (e.g., Login, Register, Dashboard)
  /services         # API service logic (e.g., login, register API calls)
  /app              # Redux store configuration and main app entry
  App.jsx           # Main app component containing routes
  main.js           # App entry point
  store.js          #Redux toolkit global state store
  

