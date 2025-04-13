# Branbu Web Application

## Overview
Branbu is a professional web platform connecting brands with creators for meaningful collaborations. The platform features a modern, responsive design with real-time messaging capabilities and comprehensive dashboard interfaces for both brands and creators.

## Project Structure
```
branbu-webapp/
├── frontend/          # React frontend application
├── backend/          # Node.js backend API
└── docs/            # Project documentation
```

## Tech Stack
- Frontend: React.js with modern CSS
- Backend: Node.js
- Database: PostgreSQL
- Authentication: JWT
- Real-time: WebSocket

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- PostgreSQL (v13 or higher)

### Installation

1. Clone the repository:
```bash
git clone [repository-url]
cd branbu-webapp
```

2. Install frontend dependencies:
```bash
cd frontend
npm install
```

3. Install backend dependencies:
```bash
cd ../backend
npm install
```

4. Set up environment variables:
```bash
cp .env.example .env
# Edit .env with your configuration
```

5. Start the development servers:

Frontend:
```bash
cd frontend
npm start
```

Backend:
```bash
cd backend
npm run dev
```

## Development

### Branch Strategy
- `main`: Production-ready code
- `develop`: Development branch
- Feature branches: `feature/feature-name`
- Bugfix branches: `bugfix/bug-name`

### Code Style
- ESLint and Prettier are configured for code consistency
- Follow the existing component structure
- Use CSS variables for theming

## Deployment

See [DEPLOYMENT.md](./docs/DEPLOYMENT.md) for detailed deployment instructions.

## Documentation

- [API Documentation](./docs/API.md)
- [Frontend Architecture](./docs/FRONTEND.md)
- [Backend Architecture](./docs/BACKEND.md)
- [Database Schema](./docs/DATABASE.md)

## License

This project is proprietary and confidential.

## Support

For support, please contact [support@branbu.com] 