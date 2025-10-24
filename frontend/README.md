# HMS Frontend

## Structure

- `index.html`: Entry page for portal selection
- `login.html`, `register.html`: Auth
- `*_dashboard.html`: Per-role dashboards (patient, doctor, lab, radiology, admin)
- `js/`: Modular JS for API, auth, UI, and each role
- `css/style.css`: Custom styles (uses Bootstrap)

## Usage

1. Start backend (`npm run dev` in backend/)
2. Open `frontend/index.html` in browser (use VSCode Live Server or Python `http.server` for CORS support if needed)
3. Register/login and use the system

## Extending

- Add new dashboard HTML and corresponding JS for new roles/features
- Use `api.js`/`auth.js`/`ui.js` for consistent logic
- Adjust API endpoints as backend evolves
