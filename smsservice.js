const twilio = require('twilio');
const client = twilio(process.env.TWILIO_SID, process.env.TWILIO_TOKEN);

exports.sendSMS = async (to, message) => {
    try {
        if (!to) return;
        await client.messages.create({
            body: message,
            from: process.env.TWILIO_PHONE,
            to: to
        });
    } catch (error) {
        console.error("SMS Error:", error.message);
    }
};