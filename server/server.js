// server.js
const dotenv = require('dotenv');
const app = require('./app');
const connectDB = require('./database/db');

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

// Start the server
const PORT = 8000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
