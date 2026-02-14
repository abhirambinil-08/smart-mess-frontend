# Smart Mess Feedback System – Frontend

This is the React frontend for the Smart Mess Feedback System.  
It allows users to submit feedback and admins to view analytics and manage mess configuration.

---

## Tech Stack

- React (Vite)
- React Router
- Chart.js
- react-chartjs-2
- Fetch API
- LocalStorage (JWT handling)

---

## Features

### Public Feedback Interface

- Institution selection
- Mess selection
- Meal type selection
- 1–5 rating system
- Optional comment (200 character limit)
- Anonymous submission
- Duplicate prevention message
- Points earned preview
- Meal time restriction display

### Admin Panel

- Secure login using email & password
- JWT stored in localStorage
- Dashboard with total feedback count
- Average ratings display
- Interactive charts (Chart.js)
- AI insights section
- Mess configuration panel
- QR code generation and download

---

## Run Locally

cd frontend

npm install

npm run dev


Frontend runs on:
http://localhost:5173
