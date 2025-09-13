# 📱 Subscription Management System - Web App

A modern, responsive React.js web application for a Subscription Management System that handles broadband plans (Fibernet, Broadband Copper) with role-based access control for end-users and administrators.

## 🌟 Features

### ✨ Progressive Web App (PWA)
- **Installable**: Can be installed on mobile devices and desktop
- **Offline Support**: Basic offline functionality with service worker
- **Responsive Design**: Works perfectly on all devices
- **Native-like Experience**: Feels like a native app when installed

## Features

### Admin Features
- **Plans Management**: CRUD operations for subscription plans
- **Analytics Dashboard**: Charts and insights into plan performance
- **Plan Types**: Support for Fibernet and Broadband Copper plans
- **Bulk Operations**: Enable/disable multiple plans
- **Export Functionality**: Export plans data to CSV

### User Features
- **Plan Browsing**: View and compare available plans
- **Subscription Management**: Subscribe, upgrade, downgrade, cancel, renew
- **Usage Tracking**: Real-time data usage with progress bars
- **AI Recommendations**: Smart plan recommendations based on usage
- **Subscription History**: Timeline of subscription activities

### Shared Features
- **Role-based Authentication**: Admin and User roles
- **Responsive Design**: Mobile-first, touch-friendly interface
- **Real-time Notifications**: Toast notifications for actions
- **Loading States**: Skeleton loaders and spinners
- **Form Validation**: Client-side validation with error handling

## Tech Stack

- **React 18** with Vite
- **React Router** for navigation
- **Tailwind CSS** for styling
- **Recharts** for data visualization
- **Lucide React** for icons
- **Context API** for state management

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:5173`

### Demo Credentials

The application uses mock authentication. You can login with:
- **Email**: Any valid email format
- **Password**: Any password
- **Role**: Select Admin or User

## Project Structure

```
src/
├── components/
│   ├── admin/           # Admin-specific components
│   │   ├── PlanCard.jsx
│   │   ├── PlanForm.jsx
│   │   └── PlansManagement.jsx
│   ├── user/            # User-specific components
│   │   ├── CurrentSubscription.jsx
│   │   └── RecommendationCard.jsx
│   └── shared/          # Reusable components
│       ├── Navbar.jsx
│       ├── LoadingSpinner.jsx
│       ├── NotificationToast.jsx
│       ├── ConfirmationModal.jsx
│       └── ProtectedRoute.jsx
├── contexts/            # React Context providers
│   ├── AuthContext.js
│   └── SubscriptionContext.js
├── pages/               # Page components
│   ├── admin/
│   │   ├── AdminDashboard.jsx
│   │   └── PlansManagement.jsx
│   ├── user/
│   │   ├── UserDashboard.jsx
│   │   ├── PlanBrowser.jsx
│   │   └── CurrentSubscription.jsx
│   └── Login.jsx
├── utils/               # Utility functions
│   ├── constants.js
│   └── helpers.js
└── styles/              # Global styles
    └── components/
```

## Key Components

### Authentication
- Role-based access control (Admin/User)
- Protected routes
- Persistent login state

### State Management
- Context API for global state
- Separate contexts for auth and subscriptions
- Mock API responses with realistic data

### UI/UX Features
- Responsive design with Tailwind CSS
- Loading states and error handling
- Toast notifications
- Confirmation modals
- Form validation

### Data Visualization
- Bar charts for popular plans
- Pie charts for subscription status
- Line charts for trends
- Progress bars for usage tracking

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 🔗 Integration with Team Components

This repository is set up as the main integration point for the LUMEN Hackathon project. See [INTEGRATION_GUIDE.md](./INTEGRATION_GUIDE.md) for detailed instructions on how to integrate frontend, backend, and mobile components.

### Quick Integration Commands

```bash
# Clone and setup
git clone https://github.com/rxxj25/LUMEN-HACKATHON.git
cd LUMEN-HACKATHON
npm install
npm run dev

# For backend integration
mkdir backend
cd backend
npm init -y
npm install express cors dotenv

# For mobile integration  
npx react-native init LumenMobile --directory mobile
```

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/your-feature`)
3. Make your changes
4. Test thoroughly
5. Submit a pull request
6. Follow the integration guidelines in [CONTRIBUTING.md](./CONTRIBUTING.md)

## License

This project is licensed under the MIT License.