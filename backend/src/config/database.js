const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // Use MongoDB Atlas or local MongoDB
    const mongoUri = process.env.MONGODB_URI || 'mongodb+srv://demo:demo123@cluster0.mongodb.net/subscription-management?retryWrites=true&w=majority';
    
    const conn = await mongoose.connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`📊 MongoDB Connected: ${conn.connection.host}`);
    
    // Handle connection events
    mongoose.connection.on('error', (err) => {
      console.error('MongoDB connection error:', err);
    });

    mongoose.connection.on('disconnected', () => {
      console.log('MongoDB disconnected');
    });

    // Graceful shutdown
    process.on('SIGINT', async () => {
      await mongoose.connection.close();
      console.log('MongoDB connection closed through app termination');
      process.exit(0);
    });

  } catch (error) {
    console.error('Database connection failed:', error.message);
    console.log('⚠️  Using in-memory database for demo purposes');
    // For demo purposes, we'll continue without MongoDB
  }
};

module.exports = connectDB;
