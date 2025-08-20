# 🍎 Dankov Global

**Dankov Global** is a global food delivery service app that connects companies producing vegetables and fruits with customers worldwide.  
The project is built with **Angular (frontend)** and **Express + MongoDB/Mongoose (backend)**.

---

## 📌 Description

Dankov Global allows companies to register and showcase their fruit and vegetable products.  
Users can browse a catalog, register/login, like products, and manage their profile.

Target audience: **Companies producing vegetables and fruits**.

---

## 🚀 Tech Stack

- **Frontend:** Angular + SCSS
- **Backend:** Node.js + Express
- **Database:** MongoDB (with Mongoose ODM)
- **Authentication:** Custom JWT-based auth
- **Hosting:** _(not yet deployed)_

---

## ✨ Features

- 🔑 User Authentication (register/login/logout)
- 👤 Profile management (update personal details)
- 📖 Static pages for general information
- ❤️ Users can like products
- 🥦 Browse catalog with fruits and vegetables
- 🚫 No admin role yet (planned for future)

---

## 📡 API Endpoints

Base URL: `http://localhost:3000`

### Authentication

- `POST /register` → Register new user
- `POST /login` → Login user
- `POST /logout` → Logout current user

### User

- `PUT /update` → Update user profile

---

## 🛠️ Installation & Setup

### Prerequisites

- Node.js (v18+ recommended)
- npm or yarn
- MongoDB running locally or in the cloud

### 1. Clone the repository

```bash
git clone https://github.com/IvelinDankov/02-Global-Dankov.git
cd dankov-global
```
