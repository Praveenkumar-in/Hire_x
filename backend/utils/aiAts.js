const axios = require("axios");

const getAtsFromAI = async (resumeText, jobDescription) => {
  try {
    const response = await axios.post(
      "https://router.huggingface.co/hf-inference/models/sentence-transformers/all-MiniLM-L6-v2",
      {
        inputs: {
          source_sentence: resumeText.slice(0, 1500),
          sentences: [jobDescription.slice(0, 800)],
        },
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.HF_API_KEY}`,
          "Content-Type": "application/json",
        },
        timeout: 120000, // 2 minutes
      }
    );

    const score = response.data?.[0] ?? 0;

    return {
      atsScore: Math.round(score * 100),
      matchedSkills: [],
      missingSkills: [],
      feedback:
        score > 0.6
          ? "Good match"
          : score > 0.35
          ? "Average match"
          : "Low match",
    };
  } catch (error) {
    console.error("⚠️ ATS ERROR:", error.code || error.message);

    // ✅ NEVER CRASH APPLICATION
    return {
      atsScore: 0,
      matchedSkills: [],
      missingSkills: [],
      feedback: "ATS service temporarily unavailable",
    };
  }
};

module.exports = getAtsFromAI;
