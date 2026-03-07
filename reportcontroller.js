const Report = require('../models/Report');
const { analyzeReportWithAI } = require('../services/aiService');

exports.uploadAndAnalyzeReport = async (req, res) => {
    try {
        if (!req.file) return res.status(400).json({ error: "Please upload a report file." });

        // 1. Send file to AI Service (OCR + Medical Analysis)
        const filePath = req.file.path;
        const aiAnalysis = await analyzeReportWithAI(filePath);

        // 2. Save Analysis to Database
        const newReport = new Report({
            patient: req.user.id, // From authMiddleware
            fileName: req.file.originalname,
            fileUrl: filePath,
            summary: aiAnalysis.summary,
            detectedAbnormalities: aiAnalysis.abnormalities,
            aiRecommendation: aiAnalysis.recommendation,
            status: aiAnalysis.healthStatus
        });

        await newReport.save();

        res.status(201).json({
            message: "Report analyzed successfully",
            report: newReport
        });
    } catch (error) {
        res.status(500).json({ error: "AI Analysis failed: " + error.message });
    }
};