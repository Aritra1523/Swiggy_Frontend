# 🍔 Swiggy Clone

A full-stack food delivery web application inspired by Swiggy, built with **Next.js, TypeScript, Tailwind CSS, Redux Toolkit, TanStack Query, Axios, and Socket.IO**.

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

### 👨‍💼 Admin

* Restaurant application management
* Approve/reject restaurants
* Manage approved restaurants

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
Next.js
   ↓
Components
   ↓
Custom Hooks
   ↓
Redux / TanStack Query
   ↓
Axios
   ↓
Node.js + Express API
   ↓
MongoDB
```

Real-time communication is handled using **Socket.IO**.

## ⚙️ Installation

```bash
git clone https://github.com/Aritra1523/Swiggy_Frontend.git

cd Swiggy_Frontend

npm install

npm run dev
```

Application runs at:

```text
http://localhost:3000
```

## 🔐 Environment Variables

Create a `.env.local` file:

```env
NEXT_PUBLIC_API_URL=http://localhost:4000
NEXT_PUBLIC_SOCKET_URL=http://localhost:4000
```

## 🔗 Backend

[Swiggy Backend](https://github.com/NILL-DATTA/Swiggy_Node_Js)

## 👨‍💻 Author

**Aritra Das**

GitHub: https://github.com/Aritra1523

> This project is created for learning and portfolio purposes and is not affiliated with Swiggy.
