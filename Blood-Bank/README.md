# Blood Bank – Frontend (React)

Frontend for a MERN Blood Bank application built with Create React App + React Router. It includes a mock mode so you can run the UI without a backend.

## Features
- Authentication flow: login, register, logout (mocked by default)
- Role-ready guards (admin/hospital/donor) via ProtectedRoute
- Dashboard with live inventory stats (mock)
- Inventory management: add donation/consumption, stock cards
- Donors and hospitals lists (mock)
- Toast notifications and lightweight CSS styling
 - Modern landing page with hero, stats, how-it-works, and CTA (matches the provided mock)

## Quick start

1. Install dependencies
2. Start the dev server

```
npm install
npm start
```

Open http://localhost:3000

By default, the app runs in mock mode. Try logins like:
- admin@demo.com (role: admin)
- hospital@demo.com (role: hospital)
- donor@demo.com (role: donor)

## Configuration

Create a `.env` file in the project root to connect to your backend and/or disable mocks:

```
# Point to your API server
REACT_APP_API_URL=http://localhost:5000/api

# Turn off mock fallback (default is true)
REACT_APP_USE_MOCKS=false
```

When `REACT_APP_USE_MOCKS=true` (default), failed API calls will automatically fall back to local mock data so the UI stays usable.

## Project structure

```
src/
	components/      # Navbar, forms, protected route, toasts, etc.
	context/         # AuthContext
	layouts/         # Main and Auth layouts
	pages/           # Home, Login, Register, Dashboard, Inventory, Donors, Hospitals, Requests, Profile
	services/        # axios api + service modules
		mocks/         # mock data/services used in mock mode
	App.js           # Routes
	App.css          # Minimal styling

	Homepage styles live alongside other styles in `App.css` using classes prefixed with `bb-` (e.g., `bb-hero`, `bb-stats`, `bb-cta`).
	index.js         # Providers
```

## Scripts
- `npm start` – run dev server
- `npm run build` – production build
- `npm test` – CRA tests

## Next steps
- Wire API endpoints in `services/*` to your backend
- Add role-based pages/permissions per your backend auth model
- Expand Requests page for creating and approving requests
- Add pagination/filters and real-time updates (e.g., websockets) if needed

---

This project was bootstrapped with Create React App. See CRA docs if you need to customize tooling.
