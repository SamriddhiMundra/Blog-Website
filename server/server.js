
const dotenv = require('dotenv');
const app = require('./app');
const connectDB = require('./database/db');


dotenv.config();


connectDB();


const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
