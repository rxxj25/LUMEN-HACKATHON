#!/bin/bash

# Subscription Management System - Deployment Script

echo "🚀 Building Subscription Management System..."

# Build the application
npm run build

if [ $? -eq 0 ]; then
    echo "✅ Build successful!"
    echo "📁 Built files are in the 'dist' directory"
    echo ""
    echo "🌐 To deploy:"
    echo "1. Upload the 'dist' folder contents to your web server"
    echo "2. Configure your server to serve index.html for all routes"
    echo "3. Enable HTTPS for PWA functionality"
    echo ""
    echo "📱 PWA Features:"
    echo "- Installable on mobile devices"
    echo "- Offline support"
    echo "- Native app-like experience"
    echo ""
    echo "🔗 Local preview: npm run preview"
else
    echo "❌ Build failed!"
    exit 1
fi
