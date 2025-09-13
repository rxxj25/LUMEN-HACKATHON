# 🚀 Quick Setup Instructions

Follow these simple steps to get the Sunstone Login App running on your machine.

## 📋 Prerequisites

Before you start, make sure you have:
- **Node.js** (version 16 or higher) - [Download here](https://nodejs.org/)
- **npm** (comes with Node.js)

## ⚡ Quick Start (3 Steps)

### Step 1: Download & Extract
1. Download the ZIP file from GitHub
2. Extract it to a folder on your computer
3. Open terminal/command prompt in that folder

### Step 2: Install Dependencies
```bash
npm install
```

### Step 3: Start the App
```bash
npm run dev
```

That's it! 🎉 The app will open in your browser automatically.

## 🔧 Troubleshooting

### If `npm install` fails:
```bash
# Clear cache and try again
npm cache clean --force
npm install
```

### If the app doesn't start:
```bash
# Check Node.js version (should be 16+)
node --version

# If version is too old, update Node.js from nodejs.org
```

### If you see import errors:
```bash
# Delete node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

## 🎯 Test the App

Once running, you can test with these demo accounts:

**Regular User:**
- Email: `demo@sunstone.com`
- Password: `password`

**Admin User:**
- Email: `admin@sunstone.com`
- Password: `password`

## 📱 What You'll See

1. **Homepage** - Landing page with demo credentials
2. **Login Page** - Sign in with demo accounts
3. **Sign Up Page** - Create new accounts
4. **User Dashboard** - Full dashboard with tabs
5. **Admin Dashboard** - User management (admin only)

## 🆘 Need Help?

- Check the main README.md for detailed documentation
- Look at the browser console for any error messages
- Make sure you're using Node.js version 16 or higher

---

**Happy coding! 🚀**
