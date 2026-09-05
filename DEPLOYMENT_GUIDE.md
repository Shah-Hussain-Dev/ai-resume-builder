# 🚀 Deployment Guide: Render (Backend) & Netlify (Frontend)

This guide provides step-by-step instructions to deploy your MERN / Node + Vite React stack.
- **Backend**: Deployed on [Render](https://render.com) (Node.js Web Service)
- **Frontend**: Deployed on [Netlify](https://netlify.com) (Vite React SPA)

---

## 🛠️ Step 1: Pre-Deployment Code Adjustments

Before pushing to GitHub, ensure your codebase is configured for cloud deployment.

### 1.1 Update Backend CORS (`server/server.js`)
Currently, CORS in `server/server.js` hardcodes `http://localhost:5173`. Update it to allow your Netlify URL dynamically via environment variables:

```javascript
// server/server.js
import cors from "cors";

const allowedOrigins = [
  "http://localhost:5173",
  process.env.CLIENT_URL // Your Netlify URL (e.g., https://your-app.netlify.app)
].filter(Boolean);

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(null, true); // Or callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
}));
```

### 1.2 Add Netlify Routing Fix (`client/public/_redirects`)
Because React uses client-side routing (`react-router-dom`), direct navigation or refreshing sub-routes on Netlify will return a **404 Not Found** error unless configured.

Create a file named `_redirects` inside `client/public/`:
```text
/*  /index.html  200
```

### 1.3 Configure Frontend API Base URL
Ensure your Axios or fetch client reads the backend URL from `import.meta.env.VITE_API_URL`:

```javascript
// Example in client configuration
import axios from 'axios';

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8000',
  withCredentials: true,
});

export default API;
```

---

## 🗄️ Step 2: Configure MongoDB Atlas

Since your backend will be running on Render (with dynamic IP addresses):
1. Log into **MongoDB Atlas**.
2. Go to **Network Access** under Security.
3. Click **Add IP Address**.
4. Select **Allow Access From Anywhere** (`0.0.0.0/0`) and save.

---

## 🖥️ Step 3: Deploy Backend to Render

1. Sign in to [Render](https://dashboard.render.com/).
2. Click **New +** -> **Web Service**.
3. Connect your GitHub repository.
4. Fill in the deployment settings:

| Setting | Value |
| :--- | :--- |
| **Name** | `ai-resume-backend` (or your choice) |
| **Region** | Choose closest to your users |
| **Branch** | `main` (or `master`) |
| **Root Directory** | `server` |
| **Runtime** | `Node` |
| **Build Command** | `npm install` |
| **Start Command** | `node server.js` |
| **Instance Type** | `Free` |

5. Scroll down to **Environment Variables** and add:

| Key | Value / Example |
| :--- | :--- |
| `PORT` | `8000` |
| `MONGO_URI` | `mongodb+sandbox...` (Your MongoDB Connection String) |
| `JWT_SECRET` | Your secret key |
| `OPENAI_API_KEY` | `sk-...` |
| `IMAGEKIT_PUBLIC_KEY` | `public_...` |
| `IMAGEKIT_PRIVATE_KEY` | `private_...` |
| `IMAGEKIT_URL_ENDPOINT` | `https://ik.imagekit.io/...` |
| `CLIENT_URL` | `https://your-app-name.netlify.app` *(add after Netlify deployment)* |

6. Click **Create Web Service**.
7. Wait for the build to finish. Copy your backend URL (e.g., `https://ai-resume-backend.onrender.com`).

---

## 🌐 Step 4: Deploy Frontend to Netlify

1. Sign in to [Netlify](https://app.netlify.com/).
2. Click **Add new site** -> **Import an existing project**.
3. Select **GitHub** and authorize access to your repository.
4. Fill in the deployment settings:

| Setting | Value |
| :--- | :--- |
| **Base directory** | `client` |
| **Build command** | `npm run build` |
| **Publish directory** | `client/dist` |

5. Under **Environment variables**, click **Add a variable**:
   - **Key**: `VITE_API_URL`
   - **Value**: `https://ai-resume-backend.onrender.com` (Your Render Backend URL)

6. Click **Deploy [site name]**.
7. Netlify will build and generate a URL (e.g., `https://ai-resume-builder-xyz.netlify.app`).

---

## 🔄 Step 5: Final Cross-Configuration

1. Copy your final **Netlify App URL** (e.g., `https://ai-resume-builder-xyz.netlify.app`).
2. Go back to your **Render Dashboard** -> Web Service -> **Environment**.
3. Set `CLIENT_URL` = `https://ai-resume-builder-xyz.netlify.app`.
4. Render will automatically redeploy the backend with the new CORS origin.

---

## ⚡ Troubleshooting & Notes

- **Render Free Tier Cold Starts**: Render's free tier spins down after 15 minutes of inactivity. The first request after spin-down might take ~30-50 seconds.
- **Environment Variables in Vite**: Frontend environment variables MUST start with `VITE_` (e.g., `VITE_API_URL`), otherwise Vite will not expose them to client code.
- **404 on Netlify Refresh**: Ensure `client/public/_redirects` exists with `/* /index.html 200`.
