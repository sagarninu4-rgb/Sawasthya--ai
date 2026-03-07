const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema({
    patient: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient', required: true },
    fileName: { type: String, required: true },
    fileUrl: { type: String, required: true }, // Local path or Cloudinary URL
    analysisDate: { type: Date, default: Date.now },
    summary: { type: String }, // AI generated summary
    detectedAbnormalities: [{ type: String }],
    aiRecommendation: { type: String },
    status: { type: String, enum: ['Normal', 'Needs Attention', 'Critical'], default: 'Normal' }
});

module.exports = mongoose.model('Report', reportSchema);