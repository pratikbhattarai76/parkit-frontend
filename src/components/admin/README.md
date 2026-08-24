# Intern 9 - Admin Panel & Testing Module

This module implements the complete Admin Panel as assigned to **Intern 9 (Riwaj Tiwari)** for the **Parkit Parking Management Platform**.

## Features Implemented

### 1. APIs Integration (`src/services/adminService.js`)
- `GET /admin/stats` — Fetch administrative overview statistics.
- `GET /admin/users` — Fetch all registered users.
- `DELETE /admin/users/:id` — Delete a registered user account.
- `GET /admin/listings` — Fetch all parking space listings.
- `DELETE /admin/listings/:id` — Delete a parking space listing.

### 2. Routes (`src/routes/AppRoutes.jsx` & `src/routes/AdminRoute.jsx`)
- `/admin` — Main Admin Dashboard.
- `/admin/users` — User management interface.
- `/admin/listings` — Listing management interface.
- Includes `AdminRoute` layout guard for securing administrative access.

### 3. Components (`src/components/admin/`)
- `AdminDashboard.jsx` — Aggregated dashboard with statistics cards, user list, and listing list.
- `AdminHeader.jsx` — Reusable header with status indicator.
- `AdminStatsCard.jsx` — Metric cards for users, listings, reservations, and system health.
- `UserManagementTable.jsx` — Interactive user table supporting search & user deletion.
- `ListingManagementTable.jsx` — Interactive listings table supporting search & listing deletion.

### 4. Testing (`src/tests/admin.test.jsx`)
- Unit tests covering admin statistics formatting, user deletion filters, and listing deletion operations.
