import mongoose from 'mongoose';

if (!process.env.MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable');
}

const MONGODB_URI = process.env.MONGODB_URI;
let isConnected = false;

const options = {
  connectTimeoutMS: 10000, // 10 seconds
  socketTimeoutMS: 45000, // 45 seconds
  serverSelectionTimeoutMS: 15000, // 15 seconds
};

// For development environment, we want to reuse the connection
// across hot reloads using a global variable
interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

declare global {
  var mongoose: MongooseCache;
}

// Initialize the global variable if it doesn't exist
if (!global.mongoose) {
  global.mongoose = {
    conn: null,
    promise: null,
  };
}

async function connectDB() {
  // In development, use the cached connection if available
  if (process.env.NODE_ENV === 'development') {
    if (global.mongoose.conn) {
      console.log('Using existing database connection in development');
      return global.mongoose.conn;
    }

    if (!global.mongoose.promise) {
      console.log('Creating new database connection in development');
      global.mongoose.promise = mongoose.connect(MONGODB_URI, options);
    }

    try {
      const conn = await global.mongoose.promise;
      global.mongoose.conn = conn;
      isConnected = true;
      console.log('MongoDB connected successfully in development');
      return conn;
    } catch (error) {
      global.mongoose.promise = null;
      console.error('Error connecting to MongoDB in development:', error);
      isConnected = false;
      throw error;
    }
  } else {
    // In production, create a new connection for each request
    if (isConnected) {
      console.log('Using existing database connection in production');
      return;
    }

    try {
      console.log('Creating new database connection in production');
      mongoose.set('strictQuery', false);
      await mongoose.connect(MONGODB_URI, options);
      isConnected = true;
      console.log('MongoDB connected successfully in production');
    } catch (error) {
      console.error('Error connecting to MongoDB in production:', error);
      isConnected = false;
      throw error;
    }
  }
}

// Handle connection errors after initial connection
mongoose.connection.on('error', (err) => {
  console.error('MongoDB connection error:', err);
  isConnected = false;
  if (process.env.NODE_ENV === 'development') {
    global.mongoose = { conn: null, promise: null };
  }
});

mongoose.connection.on('disconnected', () => {
  console.log('MongoDB disconnected');
  isConnected = false;
  if (process.env.NODE_ENV === 'development') {
    global.mongoose = { conn: null, promise: null };
  }
});

// Handle process termination
process.on('SIGINT', async () => {
  try {
    await mongoose.connection.close();
    console.log('MongoDB connection closed through app termination');
    if (process.env.NODE_ENV === 'development') {
      global.mongoose = { conn: null, promise: null };
    }
    process.exit(0);
  } catch (err) {
    console.error('Error during MongoDB disconnection:', err);
    process.exit(1);
  }
});

export default connectDB;
