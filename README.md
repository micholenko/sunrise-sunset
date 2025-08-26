# Sunrise Sunset Full Stack Application

A full-stack application that provides sunrise and sunset times for any location worldwide, with automatic timezone conversion.

## Architecture

- **Frontend**: React + TypeScript + Vite + HeroUI
- **Backend**: FastAPI + Python (acts as a proxy with timezone conversion)
- **API**: Uses sunrise-sunset.org API through the backend proxy

## Project Structure

```
├── frontend/           # React frontend application
│   ├── src/
│   ├── public/
│   └── package.json
├── backend/            # FastAPI backend
│   ├── main.py
│   ├── start.py
│   └── requirements.txt
└── README.md
```

## Features

- 🌅 Get sunrise and sunset times for any country
- 🕐 Automatic timezone conversion to local time
- 🎨 Modern UI with HeroUI components
- 📱 Responsive design
- 📊 Application Insights integration
- ⚡ Fast API proxy with caching

## Quick Start

### Prerequisites

- Node.js (v16 or higher)
- Python (v3.8 or higher)
- pip

### 1. Backend Setup

```bash
cd backend
pip install -r requirements.txt
python start.py
```

The backend will run on http://localhost:8000

### 2. Frontend Setup

```bash
cd frontend  
npm install
npm run dev
```

The frontend will run on http://localhost:5173

### 3. Using the Application

1. Open http://localhost:5173 in your browser
2. Select a date using the date picker
3. Search and select a country from the autocomplete dropdown
4. Click "Show" to get sunrise/sunset times in the local timezone

## Development

### Backend Development

The backend is a FastAPI application that:
- Proxies requests to sunrise-sunset.org API
- Automatically detects timezone from coordinates
- Converts all times from UTC to local timezone
- Provides CORS support for frontend integration

Run in development mode:
```bash
cd backend
python start.py
```

### Frontend Development

The frontend is a React application built with:
- TypeScript for type safety
- Vite for fast development and building
- HeroUI for modern components
- TanStack Query for API state management

Run in development mode:
```bash
cd frontend
npm run dev
```

## API Documentation

Once the backend is running, visit http://localhost:8000/docs for interactive API documentation.

## Building for Production

### Backend
```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --host 0.0.0.0 --port 8000
```

### Frontend
```bash
cd frontend
npm run build
```

## Technologies Used

### Frontend
- React 18
- TypeScript
- Vite
- HeroUI
- TanStack Query
- Tailwind CSS

### Backend
- FastAPI
- httpx (async HTTP client)
- pytz (timezone support)
- timezonefinder (coordinate-based timezone detection)
- uvicorn (ASGI server)

## Deployments

- GitHub Pages: [https://micholenko.github.io/sunrise-sunset/](https://micholenko.github.io/sunrise-sunset/)
- Azure Static Web Apps: [https://purple-sky-0cb669b03.1.azurestaticapps.net/](https://purple-sky-0cb669b03.1.azurestaticapps.net/)