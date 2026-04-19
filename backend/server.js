require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./src/config/db');

// Connect to database
connectDB();

const app = express();

// Body parser
app.use(express.json());

// Enable CORS
app.use(cors());

// Static folder for uploads
app.use('/uploads', express.static('uploads'));

// Mount routers
const intelligenceRouter = require('./src/routes/intelligenceRoutes');
const authRouter = require('./src/routes/authRoutes');

app.use('/api/intelligence', intelligenceRouter);
app.use('/api/auth', authRouter);

// Health check
app.get('/api/health', (req, res) => res.status(200).json({ status: 'ok', msg: 'Intelligence API running' }));

const PORT = process.env.PORT || 5000;

if (process.env.NODE_ENV !== 'test' && require.main === module) {
  app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`));
}

module.exports = app;

// Mock Automated OSINT Pull Worker
const Intelligence = require('./src/models/Intelligence');

setInterval(async () => {
  try {
    const randomEvent = {
        title: `Auto-Signal: ${['Thermal Spike', 'Satellite Anomaly', 'Comms Burst'][Math.floor(Math.random() * 3)]}`,
        sourceType: 'OSINT',
        classification: 'UNCLASSIFIED',
        description: 'Intelligence automatically fused via background signal mesh analysis.',
        location: {
            type: 'Point',
            coordinates: [70 + Math.random() * 15, 10 + Math.random() * 15] 
        }
    };
    await Intelligence.create(randomEvent);
  } catch (err) {
    console.error('Ingester Error:', err);
  }
}, 120000);
