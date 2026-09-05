# ai-resume-frontend

Modern, responsive frontend application for the AI Resume Builder platform. Built with React, Vite, Tailwind CSS, and Lucide icons.

## Features

- **Intuitive Resume Builder**: Step-by-step form to manage personal info, education, work experience, projects, skills, and certifications.
- **Multiple Professional Templates**:
  - Classic Template
  - Modern Template
  - Minimal / Technical Template
  - Executive Template
- **Dynamic Customization**: Live color picker, accent color customization, and instant real-time preview.
- **AI-Powered Assistance**:
  - Enhance professional summaries
  - Polish job descriptions with quantified impact
  - Refine project bullet points
  - PDF resume parsing
- **Dark / Light Mode**: Theme toggle with persistent preference.
- **Export & Print**: One-click PDF download / browser print.
- **Authentication Flow**: Login, Registration, protected routes with JWT.

---

## Tech Stack

- **Framework**: React 19 + Vite
- **Styling**: Tailwind CSS
- **Routing**: React Router DOM
- **Icons**: Lucide React
- **HTTP Client**: Axios
- **Notifications**: React Hot Toast

---

## Getting Started

### Prerequisites

- Node.js >= 18.x
- Backend API running (see [ai-resume-builder-backend](https://github.com/Shah-Hussain-Dev/ai-resume-builder-backend))

### Installation

```bash
# Install dependencies
npm install

# Setup environment variables
cp .env.example .env
```

### Running Locally

```bash
npm run dev
```

The app will start at `http://localhost:5173`.

### Production Build

```bash
npm run build
```

---

## Environment Variables

| Variable | Description | Default |
|---|---|---|
| `VITE_BASE_URL` | Base URL of the backend API service | `http://localhost:8000` |

---

## Deployment (Netlify / Vercel)

### Netlify:
- **Build command**: `npm run build`
- **Publish directory**: `dist`
- **Environment variables**: Add `VITE_BASE_URL` with your deployed backend URL (e.g. `https://your-backend.onrender.com`).
- Direct URL refreshes are handled by `public/_redirects`.

---

## License

ISC
