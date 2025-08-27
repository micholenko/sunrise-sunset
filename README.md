# Sunrise Sunset Application

An application that provides sunrise and sunset times for a given date and country. Deployed on Azure with automated CI/CD pipelines and basic tests.

## Deployments

- Azure Static Web Apps (FE App): [https://purple-sky-0cb669b03.1.azurestaticapps.net/](https://purple-sky-0cb669b03.1.azurestaticapps.net/)
- Azure App Service (BE proxy): [https://sunrise-sunset-backend.azurewebsites.net/](https://sunrise-sunset-backend.azurewebsites.net/)
- Azure Application Insights


## Architecture

- **Frontend**: React + TypeScript + Vite + HeroUI
- **Backend**: FastAPI + Python (Not strictly needed, acts as a proxy, made to try deployment to App Service)
- **API**: Uses sunrisesunset.io API

## Quick Start

### Prerequisites

- Node.js (v16 or higher)
- Python (v3.8 or higher)
- pip

### 1. Backend Setup

```bash
cd backend
pip install -r requirements.txt
python main.py
```

The backend will run on http://localhost:8000

### 2. Frontend Setup

```bash
cd frontend  
npm install
npm run dev
```

The frontend will run on http://localhost:5173

## Development

Run in development mode:
```bash
cd frontend
npm run dev
```

## Testing

### Frontend Tests
```bash
cd frontend
npm test        
npm run test:ui
```

### Backend Tests
```bash
cd backend
python -m pytest
```

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
- uvicorn (ASGI server)

