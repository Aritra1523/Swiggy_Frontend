# 🍔 Swiggy Clone

A full-stack food delivery web application inspired by Swiggy, built with **Next.js, TypeScript, Tailwind CSS, Redux Toolkit, TanStack Query, Zustand, Axios, and Socket.IO**.

## 🚀 Features

### 👤 User

* User registration & login
* OTP verification
* Browse restaurants and food
* Search restaurants/food
* Add/remove items from cart
* Place orders
* Order history & status

### 🏪 Restaurant Owner

* Restaurant onboarding
* Manage restaurant details
* Add, edit & delete food items
* Manage food availability
* View and manage orders
* Real-time new order notifications

### 👨‍💼 Admin Panel

* Admin dashboard
* View pending restaurant applications
* Approve/reject restaurants
* Manage approved restaurants
* Manage restaurant-related data

## 🛠️ Tech Stack

**Frontend**

* Next.js
* React
* TypeScript
* Tailwind CSS

**State Management**

* Redux Toolkit
* TanStack Query
* Zustand

**Other**

* Axios
* React Hook Form
* Yup
* Socket.IO
* Framer Motion
* SweetAlert2

## 🏗️ Architecture

```text
User / Owner Frontend
        ↓
Next.js + React
        ↓
Redux / TanStack Query / Zustand
        ↓
Axios
        ↓
Node.js + Express Backend
        ↓
MongoDB
```

Real-time order notifications are handled using **Socket.IO**.

## ⚙️ Installation

```bash
git clone https://github.com/Aritra1523/Swiggy_Frontend.git
cd Swiggy_Frontend
npm install
npm run dev
```

Frontend runs at:

```text
http://localhost:3000
```

## 👨‍💼 Admin Panel

The project has a separate **Admin Panel** built with Next.js, TypeScript, Zustand, Axios, Yup and Tailwind CSS.

**Admin Panel:**
https://github.com/Aritra1523/Swiggy_Admin

## 🔗 Backend

The backend is built with **Node.js, Express.js, MongoDB and JWT authentication**.

**Backend:**
https://github.com/NILL-DATTA/Swiggy_Node_Js

## 👨‍💻 Author

**Aritra Das**

GitHub: https://github.com/Aritra1523

> This project is created for learning and portfolio purposes and is not affiliated with Swiggy.
