# AI Resume Builder - Backend API

Production-ready backend API service for the AI Resume Builder application. Built with Node.js, Express, MongoDB, ImageKit, and Google Gemini AI.

## Features

- **Authentication**: JWT-based secure authentication (Register, Login, Get Profile).
- **Resume Management**: Complete CRUD operations for resume documents, templates, sections, and styling.
- **AI Enhancements**: Powered by Google Gemini AI:
  - Enhance professional summaries
  - Enhance job descriptions with action verbs and quantifiable achievements
  - Enhance project descriptions
  - AI resume parser & extraction from uploaded PDFs
- **Media Storage**: ImageKit integration for profile pictures and document assets.
- **CORS Support**: Configured for multiple frontend origins (local & production).

---

## Tech Stack

- **Runtime**: Node.js (ES Modules)
- **Framework**: Express 5
- **Database**: MongoDB with Mongoose
- **Authentication**: JSON Web Tokens (`jsonwebtoken`) & `bcrypt`
- **File Uploads**: `multer` & `@imagekit/nodejs`
- **AI Integration**: Google Gemini via `openai` SDK compatible endpoint

---

## Getting Started

### Prerequisites

- Node.js >= 18.x
- MongoDB connection string (e.g. MongoDB Atlas)
- ImageKit account (keys and URL endpoint)
- Google Gemini API key

### Installation

```bash
# Install dependencies
npm install

# Setup environment variables
cp .env.example .env
```

### Running Locally

```bash
# Start in development mode (with nodemon)
npm run server

# Start in production mode
npm start
```

---

## Environment Variables

Configure the following variables in your `.env` or in Render's environment settings:

| Variable | Description |
|---|---|
| `PORT` | Server listening port (default: 8000) |
| `CLIENT_URL` | Frontend URL for CORS configuration |
| `MONGO_URI` | MongoDB connection string URI |
| `JWT_SECRET` | Secret key for signing JSON Web Tokens |
| `IMAGEKIT_PUBLIC_KEY` | Public key from ImageKit dashboard |
| `IMAGEKIT_PRIVATE_KEY` | Private key from ImageKit dashboard |
| `IMAGEKIT_URL_ENDPOINT` | URL endpoint from ImageKit dashboard |
| `GEMINI_API_KEY` | Google Gemini API key |
| `OPENAI_BASE_URL` | AI endpoint base URL |
| `GEMINI_MODEL` | Gemini model name (e.g., `gemini-2.5-flash`) |

---

## Deployment on Render

1. Create a new **Web Service** on Render.
2. Connect this GitHub repository: `ai-resume-builder-backend`.
3. Configure the service settings:
   - **Environment**: Node
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
4. Under **Environment Variables**, add all required keys from `.env.example`.
5. Deploy the service!

---

## API Endpoints

### Health Check
- `GET /` - Root status check (`API running...`)

### Authentication (`/api/users`)
- `POST /api/users/register` - Register a new user
- `POST /api/users/login` - Authenticate user & receive JWT token
- `GET /api/users/profile` - Fetch current user profile (Protected)

### Resumes (`/api/resumes`)
- `POST /api/resumes` - Create a new resume (Protected)
- `GET /api/resumes` - Fetch all resumes for current user (Protected)
- `GET /api/resumes/:id` - Fetch single resume by ID (Protected)
- `PUT /api/resumes/:id` - Update resume (Protected)
- `DELETE /api/resumes/:id` - Delete resume (Protected)

### AI Services (`/api/ai`)
- `POST /api/ai/enhance-pro-sum` - Enhance professional summary (Protected)
- `POST /api/ai/enhance-job-desc` - Enhance job description (Protected)
- `POST /api/ai/enhance-project-desc` - Enhance project description (Protected)
- `POST /api/ai/upload-resume` - Upload & parse resume PDF with AI (Protected)

---

## License

ISC
