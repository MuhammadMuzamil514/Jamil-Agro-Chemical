# Jamil Agro Chemicals - MERN Stack

Production-ready MERN architecture with React (Vite) frontend and Node.js/Express backend.

## Project Structure

- `frontend/` Vite + React app with Tailwind CSS, React Router, lazy loading, SEO, API service layer, and admin UI.
- `backend/` Express API using MVC pattern, MongoDB (Mongoose), JWT authentication, security middleware, and product CRUD.

## Features

- Public pages: Home, About, Products, Contact
- Admin pages: Login and Dashboard (Add/Edit/Delete products)
- API routes:
  - `GET /api/products`
  - `POST /api/products` (admin)
  - `PUT /api/products/:id` (admin)
  - `DELETE /api/products/:id` (admin)
  - `POST /api/auth/login`
- Security: Helmet, CORS, rate limiting, JWT auth, bcrypt password hashing
- Observability: Morgan request logging + centralized error middleware
- Database: Product + User models with helpful indexes

## Setup

1. Install frontend dependencies:
   - `cd frontend`
   - `npm install`
2. Install backend dependencies:
   - `cd ../backend`
   - `npm install`
3. Create environment files:
   - `frontend/.env` from `frontend/.env.example`
   - `backend/.env` from `backend/.env.example`
4. Run backend:
   - `cd backend`
   - `npm run dev`
5. Run frontend:
   - `cd frontend`
   - `npm run dev`

## MongoDB Atlas Setup

1. Create cluster and database user in Atlas.
2. Whitelist your IP in Atlas Network Access.
3. Copy connection string into `backend/.env` as `MONGO_URI`.

## Deployment Readiness

### Frontend (Vercel/Netlify)

- Build command: `npm run build`
- Output directory: `dist`
- Environment variable:
  - `VITE_API_URL=https://api.jamilagrochemicals.com/api`

### Backend (Render/Railway/Azure App Service)

- Start command: `npm start`
- Environment variables:
  - `NODE_ENV=production`
  - `PORT=5000` (or platform provided)
  - `MONGO_URI=...`
  - `JWT_SECRET=...`
  - `CORS_ORIGIN=https://www.jamilagrochemicals.com`
  - `ADMIN_EMAIL=...`
  - `ADMIN_PASSWORD=...`

### Domain Mapping

- Frontend domain: `www.jamilagrochemicals.com`
- Backend domain: `api.jamilagrochemicals.com`
- Point DNS records to hosting providers.
- Ensure backend CORS includes the frontend domain.

## Production Notes

- Replace default admin credentials immediately.
- Use strong JWT secret and secure environment variable storage.
- Add monitoring (Sentry/Datadog) and CI/CD checks before launch.
