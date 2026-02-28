require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swagger');

const procurementRoutes = require('./routes/procurementRoutes');
const salesRoutes = require('./routes/salesRoutes');
const userRoutes = require('./routes/userRoutes');

const app = express();
app.use(express.json());

mongoose.connect(process.env.DATABASE_URI)
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.error(err));

app.use('/procurement', procurementRoutes);
app.use('/sales', salesRoutes);
app.use('/users', userRoutes);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));