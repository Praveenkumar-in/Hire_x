const { GoogleGenerativeAI } = require('@google/generative-ai');

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function getAtsFromAI(resumeText, jobDescription) {
  const model = genAI.getGenerativeModel({
    model: 'gpt-4.1', // ✅ ONLY THIS
  });

  const prompt = `
You are an Applicant Tracking System (ATS).

Job Description:
${jobDescription}

Candidate Resume:
${resumeText}

Return ONLY valid JSON:
{
  "atsScore": number (0-100),
  "matchedSkills": [string],
  "missingSkills": [string],
  "feedback": string
}
`;

  const result = await model.generateContent(prompt);
  const responseText = result.response.text();

  return JSON.parse(responseText);
}

module.exports = getAtsFromAI;
