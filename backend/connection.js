// connection.js
const mongoose = require('mongoose');

module.exports = async function connectDB() {
  try {
    await mongoose.connect('mongodb://localhost:27017/skill-swap');
    console.log('🔗 MongoDB connected successfully');
  } catch (err) {
    console.error('❌ MongoDB connection error:', err);
    process.exit(1);
  }
};
