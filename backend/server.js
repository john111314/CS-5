const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

//Route imports
const userRoutes = require('./routes/userRoutes');
const adminRoutes = require('./routes/adminRoutes');
const travelAgentRoutes = require('./routes/travelAgentRoutes');
const customerRoutes = require('./routes/customerRoutes');

const app = express();

app.use(cors());
app.options('*', cors()); // Allow all preflight requests
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Routes
app.use('/api/users', userRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/travelAgent', travelAgentRoutes);
app.use('/api/customer', customerRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
