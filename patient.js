const mongoose = require('mongoose');

const patientSchema = new mongoose.Schema({
    patientId: { type: String, unique: true, required: true },
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    phone: { type: String },
    googleId: { type: String },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Patient', patientSchema);