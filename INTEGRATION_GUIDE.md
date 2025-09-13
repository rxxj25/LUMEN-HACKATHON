# 🔗 Integration Guide - LUMEN Hackathon Project

This guide explains how to integrate different frontend and backend components into the main LUMEN Hackathon repository.

## 📁 Current Repository Structure

```
LUMEN-HACKATHON/                    # Root repository
├── src/                           # Main React frontend (Subscription Management)
├── public/                        # Static assets
├── package.json                   # Frontend dependencies
├── package-lock.json              # Dependency lock file
├── vite.config.js                 # Vite configuration
├── tailwind.config.js             # Tailwind CSS configuration
├── eslint.config.js               # ESLint configuration
├── postcss.config.js              # PostCSS configuration
├── index.html                     # Main HTML file
├── README.md                      # Project documentation
├── CONTRIBUTING.md                # Contribution guidelines
├── DEPLOYMENT.md                  # Deployment instructions
├── deploy.sh                      # Deployment script
└── .gitignore                     # Git ignore rules
```

## 🚀 Quick Start for New Team Members

### 1. Clone the Repository
```bash
git clone https://github.com/rxxj25/LUMEN-HACKATHON.git
cd LUMEN-HACKATHON
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Start Development Server
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## 🔧 Integration Strategies

### Option 1: Monorepo Structure (Recommended)
Keep all components in the same repository with organized folders:

```
LUMEN-HACKATHON/
├── frontend/                      # Main React app (current structure)
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── ...
├── backend/                       # Node.js/Express backend
│   ├── src/
│   ├── package.json
│   └── ...
├── mobile/                        # React Native app (if applicable)
│   ├── src/
│   ├── package.json
│   └── ...
├── docs/                          # Documentation
└── scripts/                       # Build and deployment scripts
```

### Option 2: Current Structure (Simple)
Keep the current flat structure and add backend components:

```
LUMEN-HACKATHON/
├── src/                          # Frontend React app
├── backend/                      # Backend API
├── api/                          # API documentation
├── shared/                       # Shared utilities/types
└── ... (current files)
```

## 🔌 Backend Integration

### Adding a Backend API

1. **Create backend directory**:
   ```bash
   mkdir backend
   cd backend
   ```

2. **Initialize Node.js project**:
   ```bash
   npm init -y
   ```

3. **Install backend dependencies**:
   ```bash
   npm install express cors dotenv mongoose
   npm install -D nodemon
   ```

4. **Update root package.json** to include backend scripts:
   ```json
   {
     "scripts": {
       "dev": "concurrently \"npm run dev:frontend\" \"npm run dev:backend\"",
       "dev:frontend": "vite",
       "dev:backend": "cd backend && npm run dev",
       "build": "vite build",
       "start": "cd backend && npm start"
     }
   }
   ```

### API Integration Points

The current frontend is ready for backend integration:

- **Authentication**: Mock auth in `src/contexts/AuthContext.jsx`
- **API Calls**: Ready to replace mock data in `src/data/indianBroadbandPlans.js`
- **State Management**: Context API ready for real API integration

## 📱 Mobile App Integration

### React Native Integration

1. **Create mobile directory**:
   ```bash
   npx react-native init LumenMobile --directory mobile
   ```

2. **Share components**:
   ```bash
   mkdir shared
   # Move reusable components to shared/
   ```

## 🔄 Development Workflow

### Branch Strategy
- `main`: Production-ready code
- `develop`: Integration branch
- `feature/frontend-feature`: Frontend features
- `feature/backend-feature`: Backend features
- `feature/mobile-feature`: Mobile features

### Working with Multiple Components

1. **Frontend Development**:
   ```bash
   git checkout -b feature/frontend-feature
   npm run dev
   ```

2. **Backend Development**:
   ```bash
   git checkout -b feature/backend-feature
   cd backend && npm run dev
   ```

3. **Full Stack Development**:
   ```bash
   npm run dev  # Runs both frontend and backend
   ```

## 🌐 API Communication

### Frontend to Backend Communication

The current frontend is set up to communicate with APIs:

```javascript
// Example API service (to be created)
// src/services/api.js
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001';

export const api = {
  // Authentication
  login: (credentials) => fetch(`${API_BASE_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials)
  }),
  
  // Plans
  getPlans: () => fetch(`${API_BASE_URL}/plans`),
  createPlan: (plan) => fetch(`${API_BASE_URL}/plans`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(plan)
  }),
  
  // Subscriptions
  getSubscriptions: (userId) => fetch(`${API_BASE_URL}/subscriptions/${userId}`),
  subscribe: (planId) => fetch(`${API_BASE_URL}/subscriptions`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ planId })
  })
};
```

## 🚀 Deployment Strategy

### Option 1: Separate Deployments
- Frontend: Vercel/Netlify
- Backend: Railway/Heroku
- Mobile: App Store/Play Store

### Option 2: Unified Deployment
- Use Docker containers
- Deploy to AWS/GCP/Azure
- Single domain with subdomains

## 📋 Integration Checklist

### For Frontend Developers
- [ ] Clone repository
- [ ] Install dependencies (`npm install`)
- [ ] Start development server (`npm run dev`)
- [ ] Understand component structure
- [ ] Review API integration points
- [ ] Test responsive design

### For Backend Developers
- [ ] Create backend directory structure
- [ ] Set up API endpoints
- [ ] Implement authentication
- [ ] Create database models
- [ ] Test API endpoints
- [ ] Update frontend API calls

### For Mobile Developers
- [ ] Set up React Native project
- [ ] Share components with web app
- [ ] Implement navigation
- [ ] Test on devices
- [ ] Integrate with backend API

## 🔧 Environment Configuration

### Frontend Environment Variables
```bash
# .env
REACT_APP_API_URL=http://localhost:3001
REACT_APP_ENV=development
```

### Backend Environment Variables
```bash
# backend/.env
PORT=3001
MONGODB_URI=mongodb://localhost:27017/lumen-hackathon
JWT_SECRET=your-secret-key
```

## 📞 Team Communication

### GitHub Workflow
1. Create feature branches
2. Make changes
3. Test thoroughly
4. Create pull requests
5. Code review
6. Merge to develop
7. Deploy to staging
8. Merge to main

### Communication Channels
- Use GitHub Issues for bugs and features
- Use GitHub Discussions for questions
- Tag team members in PRs and issues

## 🎯 Next Steps

1. **Set up backend API** following the integration guide
2. **Replace mock data** with real API calls
3. **Implement authentication** with JWT tokens
4. **Add database integration** (MongoDB/PostgreSQL)
5. **Set up deployment pipeline**
6. **Create mobile app** if needed

---

**Repository URL**: https://github.com/rxxj25/LUMEN-HACKATHON.git  
**Current Status**: ✅ Frontend ready for integration  
**Next Phase**: Backend API development
