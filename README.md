# 🛒 E-Commerce Application

A full-stack E-Commerce web application that allows users to browse products, add items to cart, and manage purchases.  
Built using modern JavaScript technologies.

---

## 🚀 Features

- 🛍 Product listing and details
- 🛒 Add to cart functionality
- 👤 User authentication (if implemented)
- 📦 Order management
- 🔐 Secure backend API
- 📁 Organized MVC structure

---

## 🛠 Tech Stack

- Node.js
- Express.js
- JavaScript
- MongoDB (if used)
- HTML / CSS (if frontend included)

---

## 📂 Project Structure

E-commerce/
│── controllers/
│── models/
│── routes/
│── middleware/
│── config/
│── client/ (if frontend exists)
│── server.js
│── package.json
│── .env


---

# 💻 How To Run Locally

Follow these steps to run this project on your local machine:

---

## 1️⃣ Clone the Repository

```bash
git clone https://github.com/siddhnt-8/E-commerce.git
2️⃣ Navigate Into the Project
cd E-commerce
3️⃣ Install Dependencies
Make sure you have Node.js installed.

npm install
4️⃣ Setup Environment Variables
Create a .env file in the root directory and add:

PORT=5000
MONGO_URI=your_database_connection_string
JWT_SECRET=your_secret_key
(Modify according to your project requirements)

5️⃣ Run the Application
Production mode:
npm start
Development mode (if nodemon configured):
npm run dev
🌐 Access the App
Open your browser and go to:

http://localhost:5000
