require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const cron = require('node-cron');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from frontend
app.use(express.static(path.join(__dirname, 'frontend')));

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/swasthya_ai')
    .then(() => console.log('✓ MongoDB Connected'))
    .catch(err => console.error('✗ MongoDB Connection Error:', err));

// Import routes (if they exist)
try {
    const reportRoutes = require('./reportroutes');
    app.use('/api/reports', reportRoutes);
} catch (err) {
    console.warn('⚠ reportroutes not found, skipping');
}

// API Routes for Authentication
app.post('/api/auth/register', async (req, res) => {
    try {
        res.json({ message: 'Registration endpoint ready' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.post('/api/auth/login', async (req, res) => {
    try {
        res.json({ message: 'Login endpoint ready' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// API Routes for Hospitals
app.get('/api/hospitals/nearby', async (req, res) => {
    try {
        const { lat, lng } = req.query;
        res.json({ message: 'Hospitals endpoint ready', coordinates: { lat, lng } });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// API Routes for Appointments
app.post('/api/appointments', async (req, res) => {
    try {
        res.json({ message: 'Appointment created' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Scheduled Reminder Job
cron.schedule('* * * * *', async () => {
    try {
        const now = new Date();
        const currentTime = now.getHours().toString().padStart(2, '0') + ":" + 
                            now.getMinutes().toString().padStart(2, '0');
        
        console.log(`[${currentTime}] Checking reminders...`);
        
        // Add reminder processing logic here
    } catch (error) {
        console.error('Cron job error:', error);
    }
});

// Serve frontend index.html for all unmatched routes
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'frontend', 'index.html'));
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
});

// Start Server
app.listen(PORT, () => {
    console.log(`
    ╔════════════════════════════════════════╗
    ║   Swasthya AI Backend Running          ║
    ║   🚀 http://localhost:${PORT}           ║
    ╚════════════════════════════════════════╝
    `);
    console.log('✓ Frontend served from /frontend');
    console.log('✓ API available at /api/*');
});