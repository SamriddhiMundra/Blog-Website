// app.js
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const postRoutes = require('./routes/postRoutes');
const AppError = require('./utils/appError');
const globalErrorHandler = require('./controller/errorController');

const app = express();

// ✅ CORS must be used here — before routes!
app.use(cors({
  origin: 'http://localhost:5173', // match your frontend port
  credentials: true
}));

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.json());

// Routes
app.use('/api/posts', postRoutes);

// Global route handler for invalid URLs
app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
