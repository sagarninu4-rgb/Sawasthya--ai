const axios = require('axios');

exports.getNearbyHospitals = async (req, res) => {
    const { lat, lng } = req.query; // Expecting user location from frontend
    try {
        // Redirect to Google Maps search or use Google Places API
        const mapsUrl = `https://www.google.com/maps/search/hospitals+near+me/@${lat},${lng},15z`;
        res.json({ searchUrl: mapsUrl });
    } catch (error) {
        res.status(500).json({ error: "Could not fetch maps data" });
    }
};