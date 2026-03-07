const Patient = require('../models/Patient');
const jwt = require('jsonwebtoken');
const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
const emailService = require('../services/emailService');

exports.googleLogin = async (req, res) => {
    const { idToken } = req.body;
    try {
        const ticket = await client.verifyIdToken({
            idToken,
            audience: process.env.GOOGLE_CLIENT_ID
        });
        const { name, email, sub: googleId } = ticket.getPayload();

        let patient = await Patient.findOne({ email });

        if (!patient) {
            const patientId = `PAT-${Math.floor(100000 + Math.random() * 900000)}`;
            patient = new Patient({ name, email, googleId, patientId });
            await patient.save();
            
            // Send Patient ID via Email
            await emailService.sendWelcomeEmail(email, patientId);
        }

        const token = jwt.sign({ id: patient._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
        res.status(200).json({ message: "Login successful", patientId: patient.patientId, token });
    } catch (error) {
        res.status(401).json({ error: "Invalid Google Token" });
    }
};

exports.patientLogin = async (req, res) => {
    const { email, patientId } = req.body;
    const patient = await Patient.findOne({ email, patientId });
    
    if (!patient) return res.status(401).json({ error: "Invalid credentials" });

    const token = jwt.sign({ id: patient._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.json({ token, patientId: patient.patientId });
};