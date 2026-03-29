# Finance Paisa Deployment Guide

This guide deploys the app with:
- **Frontend (React/Vite)** on **Hostinger** (`financepaisa.org`)
- **Backend (Node/Express)** on **Render** (or Railway)
- **Database** on **MongoDB Atlas**

---

## 1) Backend deploy (Render)

### A. Create service
1. Push backend code to GitHub.
2. In Render: **New +** → **Web Service**.
3. Connect repo and select backend root.
4. Configure:
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
   - **Environment:** `Node`

### B. Environment variables
Set these in Render (from your `backend/.env`):
- `NODE_ENV=production`
- `MONGO_URI=...`
- `JWT_SECRET=...`
- `JWT_EXPIRES_IN=7d`
- `ADMIN_EMAIL=...`
- `EMAIL_HOST=...`
- `EMAIL_PORT=...`
- `EMAIL_USER=...`
- `EMAIL_PASS=...`
- `FRONTEND_URLS=https://financepaisa.org,https://www.financepaisa.org`

> Optional (if using Brevo API flow later):
- `BREVO_API_KEY=...`

### C. Verify backend
After deploy, open:
- `https://<your-render-service>.onrender.com/api/health`

You should get success JSON.

---

## 2) Optional custom API domain

Use `api.financepaisa.org` for cleaner API URLs.

1. In Render service settings, add custom domain: `api.financepaisa.org`.
2. In Hostinger DNS, add:
   - **Type:** CNAME
   - **Host:** `api`
   - **Value:** Render-provided hostname
3. Wait for DNS propagation and SSL issuance on Render.

---

## 3) Frontend production config

Edit `frontend/.env.production`:

- If custom API domain is set:
  - `VITE_API_ORIGIN=https://api.financepaisa.org`
- Otherwise:
  - `VITE_API_ORIGIN=https://<your-render-service>.onrender.com`

---

## 4) Build frontend

From `frontend/`:
- `npm run build`

Output is generated in `frontend/dist/`.

---

## 5) Upload frontend to Hostinger

1. Open Hostinger → **File Manager**.
2. Go to `public_html/`.
3. Upload the **contents of `frontend/dist/`** (not the dist folder itself).
4. Confirm these files exist in `public_html/`:
   - `index.html`
   - `.htaccess` (required for React Router deep links)
   - `assets/` folder

---

## 6) Domain + SSL (Hostinger)

1. Ensure `financepaisa.org` points to Hostinger hosting.
2. Ensure `www` record is configured.
3. Enable SSL certificate in Hostinger dashboard.
4. Force HTTPS redirection.

---

## 7) Production checklist

- [ ] `https://financepaisa.org` loads
- [ ] Route refresh works (e.g. `/services`, `/partner-with-us`)
- [ ] Contact form submits successfully
- [ ] Partner form submits successfully
- [ ] Login/Register/OTP flow works
- [ ] No CORS errors in browser console
- [ ] Backend health endpoint responds

---

## 8) Common fixes

### API not reachable
- Verify `VITE_API_ORIGIN` in `frontend/.env.production`
- Rebuild frontend and re-upload `dist/`

### CORS blocked
- Confirm Render env var:
  - `FRONTEND_URLS=https://financepaisa.org,https://www.financepaisa.org`
- Restart backend service

### React routes 404 on refresh
- Confirm `.htaccess` exists in Hostinger `public_html/`

### Forms not sending email
- Verify email env vars (`EMAIL_HOST`, `EMAIL_PORT`, `EMAIL_USER`, `EMAIL_PASS`)

---

## 9) Security recommendations

- Rotate any secret that was shared in chat/logs.
- Keep `.env` files out of Git.
- Use strong JWT secret and least-privilege DB user.

---

## 10) Quick release flow

1. Update code and envs
2. Deploy backend on Render
3. Update `frontend/.env.production` API origin
4. Run `npm run build` in frontend
5. Upload `dist/` contents to Hostinger `public_html/`
6. Smoke test all key flows
