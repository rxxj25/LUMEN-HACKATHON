# 🤝 Contributing to LUMEN Hackathon Project

Welcome to the LUMEN Hackathon project! This guide will help you get started with contributing to our subscription management system.

## 🚀 Quick Start for New Contributors

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

## 🔧 Development Workflow

### Branch Strategy
- **main**: Production-ready code
- **develop**: Integration branch for features
- **feature/feature-name**: Individual feature branches
- **bugfix/bug-name**: Bug fix branches

### Making Changes

1. **Create a new branch**:
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes** and test them thoroughly

3. **Commit your changes**:
   ```bash
   git add .
   git commit -m "Add: descriptive commit message"
   ```

4. **Push to your branch**:
   ```bash
   git push origin feature/your-feature-name
   ```

5. **Create a Pull Request** on GitHub

### Commit Message Convention
Use clear, descriptive commit messages:
- `Add: new feature description`
- `Fix: bug description`
- `Update: existing feature description`
- `Refactor: code improvement description`
- `Docs: documentation update`

## 📁 Project Structure

```
src/
├── components/          # React components
│   ├── admin/          # Admin-specific components
│   ├── user/           # User-specific components
│   ├── payment/        # Payment-related components
│   └── shared/         # Reusable components
├── contexts/           # React Context providers
├── pages/              # Page components
├── utils/              # Utility functions
├── data/               # Mock data and constants
└── styles/             # CSS and styling files
```

## 🎯 Current Features & Areas for Contribution

### ✅ Completed Features
- User authentication and role management
- Admin dashboard with plan management
- User dashboard with subscription browsing
- Payment integration (UPI)
- Responsive design

### 🔄 Areas for Contribution
- [ ] Backend API integration
- [ ] Real-time notifications
- [ ] Advanced analytics
- [ ] Mobile app development
- [ ] Testing suite
- [ ] Performance optimization
- [ ] Security enhancements

## 🧪 Testing

Before submitting your code:
1. Test all functionality manually
2. Ensure responsive design works on mobile
3. Check for console errors
4. Verify all user flows work correctly

## 📋 Pull Request Guidelines

### Before Submitting
- [ ] Code follows the project's style guidelines
- [ ] All functionality has been tested
- [ ] No console errors
- [ ] Responsive design maintained
- [ ] Commit messages are clear and descriptive

### Pull Request Template
```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
- [ ] Manual testing completed
- [ ] Responsive design verified
- [ ] No console errors

## Screenshots (if applicable)
Add screenshots to help explain your changes

## Additional Notes
Any additional information for reviewers
```

## 🐛 Bug Reports

When reporting bugs, please include:
- Steps to reproduce
- Expected behavior
- Actual behavior
- Browser/device information
- Screenshots (if applicable)

## 💡 Feature Requests

For new features:
- Describe the feature clearly
- Explain the use case
- Consider the impact on existing functionality
- Provide mockups or wireframes if possible

## 📞 Getting Help

- Create an issue for questions or discussions
- Tag relevant team members in issues
- Use the GitHub Discussions for general questions

## 🎉 Recognition

Contributors will be recognized in the project README and release notes.

---

Happy coding! 🚀
