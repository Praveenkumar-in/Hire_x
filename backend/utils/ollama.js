const axios = require("axios");
console.log("ollama run")
const getAtsFromAI = async (resumeText, jobRequirements = []) => {
  try {
    if (!resumeText || !jobRequirements.length) {
      return {
        atsScore: 0,
        matchedSkills: [],
        missingSkills: jobRequirements,
        feedback: "Insufficient data for ATS scoring",
      };
    }

    const prompt = `
You are an expert ATS (Applicant Tracking System).

Compare the resume skills with the job required skills.

Rules:
- Be strict but fair.
- Give clear improvement suggestions.
- Feedback must be at least 2-3 sentences.
- Mention missing skills.
- Mention strengths.
- Suggest what to improve.


Return ONLY valid JSON in this format:

{
  "atsScore": number (0-100),
  "matchedSkills": string[],
  "missingSkills": string[],
  "feedback": string
}

Resume:
${resumeText}

Job Required Skills:
${jobRequirements}
`;


    const response = await axios.post(
      "http://localhost:11434/api/generate",
      {
        model: "llama3",
        prompt,
        stream: false,
      }
    );

    const rawOutput = response.data.response;

    console.log("RAW AI OUTPUT:", rawOutput); // Debug

    // 🔥 SAFER JSON EXTRACTION
    const jsonMatch = rawOutput.match(/\{[\s\S]*\}/);

    if (!jsonMatch) {
      throw new Error("No valid JSON found in AI response");
    }

    const parsed = JSON.parse(jsonMatch[0]);

    return {
      atsScore: parsed.atsScore || 0,
      matchedSkills: parsed.matchedSkills || [],
      missingSkills: parsed.missingSkills || [],
      feedback: parsed.feedback || "No feedback generated",
    };

  } catch (error) {
    console.error("OLLAMA ATS ERROR:", error.message);

    return {
      atsScore: 0,
      matchedSkills: [],
      missingSkills: jobRequirements,
      feedback: "ATS evaluation failed",
    };
  }
};

module.exports = getAtsFromAI;
