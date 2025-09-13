# 🌐 Sunstone Login App - Frontend Only

A modern, responsive login and dashboard application built with React, TypeScript, and Tailwind CSS. Features user authentication, role-based access control, and comprehensive dashboards - all running in the frontend without requiring a backend server.

## ✨ Features

- 🔐 **Frontend-Only Authentication** - No backend server required
- 👥 **Role-Based Access Control** - User and Admin dashboards
- 📱 **Responsive Design** - Works on all devices
- 🎨 **Modern UI** - Built with shadcn/ui components
- 📊 **Interactive Dashboards** - User analytics and admin management
- 🚀 **Demo Users** - Pre-configured accounts for testing
- 💾 **Local Storage** - Session persistence across browser refreshes

## 🚀 Quick Start

### Prerequisites

- **Node.js** (v16 or higher) - [Download here](https://nodejs.org/)
- **npm** (comes with Node.js)

### Installation

1. **Download the code**
   ```bash
   # If downloading from GitHub
   git clone <repository-url>
   cd sunstone-login-app
   
   # Or extract the ZIP file and navigate to the folder
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   - Go to `http://localhost:8080` (or the port shown in terminal)
   - The app will automatically open in your default browser

## 🎯 Demo Credentials

The app comes with pre-configured demo accounts:

### Regular Users
| Email | Password | Description |
|-------|----------|-------------|
| `demo@sunstone.com` | `password` | Main demo user |
| `john@example.com` | `password123` | Sample user |
| `jane@example.com` | `password123` | Sample user |

### Admin Users
| Email | Password | Description |
|-------|----------|-------------|
| `admin@sunstone.com` | `password` | Main admin user |
| `manager@sunstone.com` | `admin123` | Manager admin |

## 🎨 How to Use

### 1. **Login with Demo Account**
- Click "Sign In" in the navigation
- Use any of the demo credentials above
- You'll be redirected to the appropriate dashboard

### 2. **Create New Account**
- Click "Get Started" or "Sign up here"
- Fill out the registration form
- You'll be automatically logged in after registration

### 3. **Explore Dashboards**
- **User Dashboard**: Overview, Usage, Billing, Settings tabs
- **Admin Dashboard**: User management, Analytics, System settings

## 📁 Project Structure

```
src/
├── components/          # React components
│   ├── ui/             # shadcn/ui components
│   ├── HomePage.tsx    # Landing page
│   ├── LoginPage.tsx   # Login form
│   ├── SignUpPage.tsx  # Registration form
│   ├── Dashboard.tsx   # User dashboard
│   ├── AdminDashboard.tsx # Admin dashboard
│   └── ...
├── contexts/           # React contexts
│   └── AuthContext.tsx # Authentication context
├── services/           # API services
│   └── frontendAuth.ts # Frontend authentication
├── data/              # Demo data
│   └── demoUsers.ts   # Demo user accounts
└── ...
```

## 🛠️ Available Scripts

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linting
npm run lint
```

## 🔧 Configuration

### Environment Variables (Optional)
Create a `.env` file in the root directory for customization:

```env
# App Configuration
VITE_APP_NAME=Sunstone Login App
VITE_APP_VERSION=1.0.0
```

### Customization
- **Colors**: Edit `tailwind.config.ts` for theme customization
- **Components**: Modify components in `src/components/`
- **Demo Users**: Add/modify users in `src/data/demoUsers.ts`

## 🎯 Features Overview

### Authentication System
- ✅ Frontend-only authentication
- ✅ JWT-like token system
- ✅ Session persistence
- ✅ Automatic token expiration
- ✅ Role-based access control

### User Dashboard
- ✅ **Overview Tab**: Recent activity, quick actions
- ✅ **Usage Tab**: Data usage, speed history
- ✅ **Billing Tab**: Current plan, payment history
- ✅ **Settings Tab**: Account info, security settings

### Admin Dashboard
- ✅ **User Management**: View, activate/deactivate users
- ✅ **Analytics**: User statistics, system health
- ✅ **System Settings**: Configuration, maintenance tools

### UI/UX Features
- ✅ **Responsive Design**: Mobile-first approach
- ✅ **Loading States**: Smooth animations
- ✅ **Error Handling**: User-friendly messages
- ✅ **Toast Notifications**: Success/error feedback
- ✅ **Form Validation**: Real-time validation

## 🐛 Troubleshooting

### Common Issues

**1. Port already in use**
```bash
# If port 8080 is busy, Vite will automatically use the next available port
# Check the terminal output for the actual port number
```

**2. Dependencies not installing**
```bash
# Clear npm cache and reinstall
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

**3. Build errors**
```bash
# Make sure you're using Node.js v16 or higher
node --version

# Update npm to latest version
npm install -g npm@latest
```

**4. Styling issues**
```bash
# Make sure Tailwind CSS is properly configured
# Check if tailwind.config.ts exists and is properly configured
```

### Getting Help

If you encounter issues:
1. Check the browser console for error messages
2. Ensure Node.js version is v16 or higher
3. Try clearing browser cache and localStorage
4. Check the terminal for any error messages

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

The built files will be in the `dist/` directory, ready for deployment to any static hosting service like:
- Vercel
- Netlify
- GitHub Pages
- AWS S3
- Any web server

### Deploy to Vercel (Recommended)
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy with zero configuration

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📞 Support

For support or questions:
- Create an issue in the GitHub repository
- Check the troubleshooting section above
- Review the demo credentials and setup instructions

---

**Happy Coding! 🎉**

*Built with ❤️ using React, TypeScript, and Tailwind CSS*