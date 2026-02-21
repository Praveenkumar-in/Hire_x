const axios = require("axios");

const chatWithAI = async (req, res) => {
  try {
    const { message } = req.body;
  
    if (!message) {
      return res.status(400).json({ message: "Message is required" });
    }

    const prompt = `
You are HireX AI — an intelligent career and hiring assistant.

SYSTEM ROLE:
- Act like a senior recruiter + career mentor.
- Provide professional, clear, and structured responses.
- Be concise but insightful.
- Never generate irrelevant information.

CAPABILITIES:
You can help with:
1. Resume improvement
2. ATS optimization
3. Interview preparation
4. Career growth advice
5. Skill gap analysis
6. Job application strategy

RESPONSE RULES:
- Structure responses using sections.
- Use bullet points when needed.
- Provide actionable advice.
- Be realistic and practical.
- Avoid generic motivational lines.
- No emojis.
- No unnecessary repetition.

IF USER ASKS ABOUT:
Resume → Analyze and suggest improvements.
Skills → Suggest learning roadmap.
Interview → Provide likely questions + preparation tips.
Career growth → Suggest strategic plan.

User Message:
${message}

Now respond professionally.
`;


    const response = await axios.post(
      "http://localhost:11434/api/generate",
      {
        model: "llama3",
        prompt,
        stream: false,
      }
    );

    res.json({
      reply: response.data.response,
    });

  } catch (error) {
    console.error("Chatbot Error:", error.message);
    res.status(500).json({ message: "Chatbot failed" });
  }
};

module.exports = { chatWithAI };
