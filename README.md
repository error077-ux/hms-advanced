# Hospital Management System (HMS) - Local

## Features

- Patient & Hospital Portals (role-based)
- JWT authentication
- SQLite local DB (auto-creates tables)
- Appointments, prescriptions, lab/radiology, billing, insurance uploads
- File storage for reports/docs
- Separate dashboards for all roles

## Getting Started

1. **Install backend dependencies**
   ```bash
   cd backend
   npm install
   ```

2. **Run backend**
   ```bash
   npm run dev
   ```

3. **Open frontend**
   - Open `frontend/index.html` in your browser.

4. **Default Ports**
   - Backend: `http://localhost:3001`
   - Frontend: open HTML files directly in browser or use a local server

## Notes

- Database file: `backend/hospital.db` (created automatically)
- File uploads: stored in `backend/uploads/`
- API endpoints: see `/backend/routes/`
- For more features, extend backend/routes and frontend pages.