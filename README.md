# SecureLocker — Bank-style Locker Rental Platform

A full-stack web app where **owners** list lockers (size, price, city, address) and
**renters** browse and book them — like renting a bank locker.

- **Frontend:** React (Vite) + Tailwind CSS
- **Backend:** Node.js + Express, JWT authentication
- **Database:** a simple JSON file (`backend/data/db.json`) — no separate database
  server to install. Easy to swap for MongoDB/Postgres later if you outgrow it.

## Project structure

```
locker-rental-app/
├── backend/        Express API (auth, lockers, bookings)
└── frontend/        React + Tailwind UI
```

## 1. Run the backend

```bash
cd backend
npm install
cp .env.example .env      # then optionally edit JWT_SECRET
npm run dev                # starts on http://localhost:5000
```

## 2. Run the frontend

In a **second terminal**:

```bash
cd frontend
npm install
cp .env.example .env       # default already points to http://localhost:5000/api
npm run dev                 # starts on http://localhost:5173
```

Open **http://localhost:5173** in your browser.

## How it works

- **Sign up** as either:
  - **Renter** — browse lockers and book one.
  - **Owner** — list lockers and manage bookings on them.
- Owners add lockers from **My Lockers**: title, size (small/medium/large), price
  per month, city, address, optional description.
- Renters search by city/size/budget on **Browse Lockers**, then click **Book Now**,
  pick a start date and duration, and confirm. The locker is marked "Booked" and
  disappears from public search until the booking is cancelled.
- Either side can cancel a booking, which frees the locker up again.

## Notes

- Data is stored in `backend/data/db.json`. Delete that file (or its contents) to
  reset the app to a clean state.
- Passwords are hashed with bcrypt; sessions use JWTs stored in the browser's
  localStorage.
- This is a learning/demo project — for production use you'd want a real
  database, input validation hardening, email verification, and HTTPS.
