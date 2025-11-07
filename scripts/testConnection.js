require('dotenv').config();
const mongoose = require('mongoose');

async function testConnection() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);

    console.log('MongoDB connection test successful!');
    console.log(`Connected to: ${mongoose.connection.host}`);
    console.log(`Database name: ${mongoose.connection.name}`);

    // Test creating a collection
    await mongoose.connection.db.createCollection('connection_test');
    console.log('Successfully created test collection');

    // Clean up test collection
    await mongoose.connection.db.dropCollection('connection_test');
    console.log('Successfully cleaned up test collection');

  } catch (error) {
    console.error('MongoDB connection test failed:', error);
  } finally {
    await mongoose.connection.close();
    console.log('Connection closed');
    process.exit(0);
  }
}

testConnection();
 