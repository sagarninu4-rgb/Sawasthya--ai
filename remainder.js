const mongoose = require('mongoose');

const reminderSchema = new mongoose.Schema({
    patient: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient', required: true },
    medicineName: { type: String, required: true },
    dosage: { type: String },
    time: { type: String, required: true }, // Format: "HH:mm"
    status: { type: String, enum: ['pending', 'taken', 'missed'], default: 'pending' },
    lastnotified: { type: Date }
});

module.exports = mongoose.model('Reminder', reminderSchema);