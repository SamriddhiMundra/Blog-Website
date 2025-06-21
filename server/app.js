
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const path = require('path');
const postRoutes = require('./routes/postRoutes');
const AppError = require('./utils/appError');
const globalErrorHandler = require('./controller/errorController');

const app = express();


app.use(cors({
  origin: process.env.NODE_ENV === 'production' ? '*' : 'http://localhost:5173',
  credentials: true
}));


if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}


app.use(express.json());


app.use('/api/posts', postRoutes);

// 🧱 Serve frontend in production
if (process.env.NODE_ENV === 'production') {
  const __dirname = path.resolve();
  app.use(express.static(path.join(__dirname, '../client/dist')));

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/dist/index.html'));
  });
}


app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});


app.use(globalErrorHandler);

module.exports = app;
