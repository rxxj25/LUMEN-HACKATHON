# 🌟 LUMEN Hackathon - Complete Integrated Web Application

A comprehensive full-stack subscription management system built for the LUMEN Hackathon, featuring a modern React frontend integrated with a Node.js backend API.

## 🚀 **Complete Application Features**

### 🎯 **Frontend (React + Vite)**
- **Subscription Management**: Complete CRUD operations for broadband plans
- **Role-based Authentication**: Admin and User dashboards
- **Payment Integration**: UPI payment processing
- **Responsive Design**: Mobile-first, PWA-ready interface
- **Real-time Analytics**: Charts and data visualization with Recharts
- **AI Recommendations**: Smart plan suggestions based on usage patterns

### 🔧 **Backend (Node.js + Express)**
- **RESTful API**: Complete CRUD endpoints for all resources
- **Authentication System**: JWT-based auth with role management
- **Database Integration**: MongoDB with Mongoose ODM
- **Memory Database**: Fallback in-memory storage for development
- **API Documentation**: Comprehensive endpoint documentation
- **Data Seeding**: Pre-populated with realistic Indian broadband plans

### 📊 **Integrated Features**
- **Real-time Data Sync**: Frontend-backend communication
- **User Management**: Complete user lifecycle management
- **Subscription Tracking**: Real-time usage monitoring
- **Payment Processing**: Secure transaction handling
- **Analytics Dashboard**: Comprehensive business insights

## 🏗️ **Project Structure**

```
LUMEN-HACKATHON/
├── src/                          # Frontend React Application
│   ├── components/               # React components
│   │   ├── admin/               # Admin-specific components
│   │   ├── user/                # User-specific components
│   │   ├── payment/             # Payment components
│   │   └── shared/              # Reusable components
│   ├── contexts/                # React Context providers
│   ├── pages/                   # Page components
│   ├── services/                # API service layer
│   └── utils/                   # Utility functions
├── backend/                     # Backend Node.js API
│   ├── src/
│   │   ├── controllers/         # API controllers
│   │   ├── models/              # Database models
│   │   ├── routes/              # API routes
│   │   ├── middleware/          # Custom middleware
│   │   ├── utils/               # Backend utilities
│   │   └── server.js            # Main server file
│   └── package.json             # Backend dependencies
├── public/                      # Static assets
├── package.json                 # Frontend dependencies
└── [Configuration files]        # Vite, Tailwind, ESLint configs
```

## 🚀 **Quick Start**

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- MongoDB (optional - uses memory DB by default)

### 1. Clone and Setup
```bash
git clone https://github.com/rxxj25/LUMEN-HACKATHON.git
cd LUMEN-HACKATHON
npm install
```

### 2. Start Complete Application
```bash
# Start both frontend and backend
npm run dev:fullstack

# Or start individually:
npm run dev              # Frontend only (http://localhost:5173)
npm run dev:backend      # Backend only (http://localhost:3001)
```

### 3. Access the Application
- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:3001
- **API Documentation**: http://localhost:3001/api-docs

## 🔑 **Demo Credentials**

### Admin Access
- **Email**: admin@lumen.com
- **Password**: admin123
- **Features**: Plan management, analytics, user oversight

### User Access
- **Email**: user@lumen.com
- **Password**: user123
- **Features**: Plan browsing, subscription management, usage tracking

## 📱 **Available Scripts**

### Frontend Scripts
```bash
npm run dev              # Start frontend development server
npm run build            # Build frontend for production
npm run preview          # Preview production build
npm run lint             # Run ESLint
```

### Backend Scripts
```bash
npm run dev:backend      # Start backend development server
npm run setup:backend    # Setup backend dependencies
```

### Full-Stack Scripts
```bash
npm run dev:fullstack    # Start both frontend and backend
npm run install:all      # Install all dependencies
```

## 🔌 **API Endpoints**

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration
- `POST /api/auth/logout` - User logout

### Plans Management
- `GET /api/plans` - Get all plans
- `POST /api/plans` - Create new plan (Admin)
- `PUT /api/plans/:id` - Update plan (Admin)
- `DELETE /api/plans/:id` - Delete plan (Admin)

### Subscriptions
- `GET /api/subscriptions` - Get user subscriptions
- `POST /api/subscriptions` - Create subscription
- `PUT /api/subscriptions/:id` - Update subscription
- `DELETE /api/subscriptions/:id` - Cancel subscription

### Users
- `GET /api/users` - Get all users (Admin)
- `GET /api/users/:id` - Get user profile
- `PUT /api/users/:id` - Update user profile

## 🎨 **Tech Stack**

### Frontend
- **React 18** - Modern React with hooks
- **Vite** - Fast build tool and dev server
- **React Router** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework
- **Recharts** - Data visualization library
- **Lucide React** - Beautiful icon library
- **Context API** - State management

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **Mongoose** - MongoDB object modeling
- **JWT** - JSON Web Token authentication
- **CORS** - Cross-origin resource sharing
- **Helmet** - Security middleware

### Database
- **MongoDB** - Primary database (optional)
- **Memory DB** - In-memory fallback for development

## 🌐 **Deployment**

### Frontend Deployment (Vercel/Netlify)
```bash
npm run build
# Deploy dist/ folder to your hosting platform
```

### Backend Deployment (Railway/Heroku)
```bash
cd backend
npm start
# Deploy backend folder to your hosting platform
```

### Environment Variables
```bash
# Backend (.env)
PORT=3001
MONGODB_URI=mongodb://localhost:27017/lumen-hackathon
JWT_SECRET=your-secret-key
NODE_ENV=production

# Frontend (.env)
REACT_APP_API_URL=https://your-backend-url.com
```

## 🤝 **Team Integration**

This repository is designed for seamless team collaboration:

### For Frontend Developers
- Work in the `src/` directory
- Use `npm run dev` for development
- Follow component structure guidelines

### For Backend Developers
- Work in the `backend/` directory
- Use `npm run dev:backend` for development
- Follow API endpoint conventions

### For Full-Stack Developers
- Use `npm run dev:fullstack` for complete development
- Test integration between frontend and backend
- Follow the established API contracts

## 📊 **Features Showcase**

### 🎯 **Admin Dashboard**
- Plan creation and management
- User analytics and insights
- Subscription monitoring
- Revenue tracking
- System configuration

### 👤 **User Experience**
- Plan comparison and selection
- Subscription management
- Usage tracking and alerts
- Payment processing
- AI-powered recommendations

### 📱 **Mobile Experience**
- Responsive design for all devices
- Touch-friendly interface
- Progressive Web App (PWA) support
- Offline functionality

## 🔒 **Security Features**

- JWT-based authentication
- Role-based access control
- Input validation and sanitization
- CORS protection
- Secure password hashing
- API rate limiting

## 📈 **Performance Features**

- Lazy loading components
- Optimized bundle size
- Efficient state management
- Database indexing
- Caching strategies
- CDN-ready assets

## 🚀 **Future Enhancements**

- [ ] Real-time notifications
- [ ] Advanced analytics
- [ ] Mobile app development
- [ ] Payment gateway integration
- [ ] Multi-language support
- [ ] Advanced reporting

## 📞 **Support**

For questions or issues:
- Create an issue on GitHub
- Check the documentation in `/docs`
- Review the API documentation
- Contact the development team

---

**Repository**: https://github.com/rxxj25/LUMEN-HACKATHON.git  
**Status**: ✅ Complete Full-Stack Application  
**Ready for**: Development, Testing, and Deployment