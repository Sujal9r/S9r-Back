const app = require('./app');
const connectDB = require('./config/database');
const PORT = process.env.PORT || 5000;
const dotenv = require('dotenv');
dotenv.config();

// Connect to MongoDB
connectDB();

app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
  console.log(`📧 Email functionality: ${process.env.EMAIL_USER ? 'Configured' : 'Not configured'}`);
  console.log(`🌐 Frontend URL: http://localhost:3000`);
  console.log(`🔗 API Base URL: http://localhost:${PORT}/api`);
});
