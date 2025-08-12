# 🔧 Auto Service Management System

A full-featured **auto service** web application built with:

- 🔙 **Back-end:** Django (Python)  
- 🌐 **Front-end:** React.js + Tailwind CSS  
- 🔐 **Authentication:** JWT (JSON Web Tokens)  

This application allows **customers** to create service bookings, and **workers** to manage those bookings by accepting them, specifying required parts, setting prices, and determining the repair completion date.

---

## 📘 Features

### 👤 Authentication
- JWT-based login for secure session management.
- Role-based access (customers vs. workers).

### 🧾 Bookings
- Customers can create service bookings (e.g., maintenance, repairs, inspections).
- Workers can view available bookings and **accept** them.
- Once accepted, workers can set:
  - Required parts cost
  - Estimated completion date
- Bookings are marked **completed** after these details are set.

---

## 🧠 Technologies & Architecture

### 🐍 Back-End – Django
- Robust and complete framework for rapid development.
- Follows the **MTV (Model-Template-View)** architecture.
- Uses Django’s **built-in ORM**:
  - Automatically maps Python models to SQL tables
  - Simplifies queries and data persistence

#### Key Features:
- Auto-generated tables and migrations
- Built-in data validation
- Middleware for JWT authentication
- REST APIs with `django-rest-framework`

### 📦 REST API
- Built using `Django REST Framework`
- JWT-protected routes
- Endpoints for:
  - Login / Register
  - Create / view / update bookings
  - Filter by booking status (new, accepted, completed)

### 🔐 Authentication – JWT
- Upon login, the client receives a JWT token
- Token stored in `localStorage` in React
- Token sent with every authorized request

---

## 💻 Front-End – React + Tailwind CSS
- Modern UI built with React.js
- Styled with **Tailwind CSS**:
  - Responsive and consistent design
  - Eliminates redundant CSS
- Navigation with `React Router`
- Communicates with backend via REST API
- JWT token handled locally with `PrivateRoute` protection

---

## 🔗 Key API Routes

| Role     | Function                      | Endpoint                     |
|----------|-------------------------------|------------------------------|
| Client   | Login / Register               | `/api/token/`                |
| Client   | Create booking                 | `/api/bookings/`             |
| Worker   | View new bookings              | `/api/bookings/?status=new`  |
| Worker   | Accept booking & set details   | `/api/bookings/<id>/`        |

---

## 🛠️ Run the Project Locally

### Clone the repository
```bash
git clone https://github.com/username/repo-name.git
cd repo-name



Server:
python/python3 manage.py runserver


Client:
cd bookfront
npm install
npm start
