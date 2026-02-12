
# CineLog API

This project is a Node.js API built to manage movie logs, using the Express framework and MongoDB. The application includes GitHub authentication and automated documentation with Swagger.

## 🚀 Technologies

* **Node.js**: JavaScript runtime environment.
* **Express**: Web framework for routing and middleware.
* **MongoDB**: NoSQL database for data storage.
* **Passport.js**: Authentication middleware configured with the GitHub strategy.
* **Swagger UI Express**: For visualizing and testing API documentation.
* **Jest & Supertest**: Tools for running automated tests.

## 📋 Prerequisites

Before starting, make sure you have installed:

* Node.js (version 18.0.0 or higher).
* A MongoDB account (or a local instance).
* GitHub OAuth App credentials (Client ID and Client Secret).

## 🔧 Setup

1. **Install dependencies:**
```bash
npm install

```


2. **Environment Variables:**
Create a `.env` file in the root directory and add the following keys:
```env
PORT=8080
MONGODB_URI=your_mongodb_connection_string
SESSION_SECRET=your_session_secret
GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret

```



## 🏃 Execution

* **Start the server:**
```bash
npm start

```


The server will run at: `http://localhost:8080`.
* **Generate Swagger Documentation:**
```bash
npm run swagger

```


* **Run Tests:**
```bash
npm test

```



## 📑 API Documentation

Once the server is running, you can explore the API endpoints through the Swagger interface at:
`http://localhost:8080/api-docs`.

## 🔐 Authentication

The API uses **GitHub OAuth**. When accessing protected routes, the user will be redirected to GitHub for authentication.