// index.js
const express    = require('express');
const cors       = require('cors');
const dotenv     = require('dotenv');
const connector  = require('./connection');
const userRoutes = require('./routers/user_router');

dotenv.config();

connector();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use('/api', userRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});
