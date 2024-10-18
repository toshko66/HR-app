const dotenv = require('dotenv');
const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const sequelize = require('./config/db');

dotenv.config();

const app = express();
app.use(cors({
    origin: 'http://localhost:5173', 
    credentials: true,              
  }));
  
app.use(express.json());

app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

app.get('/test', (req, res) => {
    console.log('Test route accessed');
    res.send('Test route is working');
});


