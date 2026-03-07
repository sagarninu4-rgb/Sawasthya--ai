// Using a local dataset for reliability, but structure allows easy OpenAI swap
const diseaseData = {
    fever: {
        medicines: ["Paracetamol", "Ibuprofen"," Acetaminophen","diclofenac","naproxen","aspirin","mefenamic acid","ketoprofen","indomethacin","celecoxib","meloxicam","etoricoxib","lornoxicam","tenoxicam","piroxicam","nimesulide","flurbiprofen","sulindac","tolmetin","diflunisal","oxaprozin","nabumetone","ketorolac"],
        prevention: ["Drink fluids", "Take rest", "Cool compress","Avoid overheating", "Use a fan", "Wear light clothing", "Take fever-reducing medications", "Monitor temperature regularly", "Stay in a cool environment", "Avoid strenuous activities","Eat light meals", "Use a damp cloth on the forehead", "Take lukewarm baths", "Avoid alcohol and caffeine", "Stay hydrated with electrolyte solutions", "Use a humidifier", "Avoid smoking and secondhand smoke", "Get plenty of sleep", "Consult a doctor if symptoms worsen"],
        consultDoctor: "If fever lasts more than 3 days or exceeds 103°F"
    },
    // Add other common diseases here
};

exports.getSuggestion = async (disease) => {
    const query = disease.toLowerCase();
    return diseaseData[query] || { message: "Symptoms not recognized. Please consult a doctor immediately." };
};