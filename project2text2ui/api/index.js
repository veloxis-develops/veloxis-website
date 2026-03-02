const express = require('express');
const cors = require('cors');
const { OpenAI } = require('openai');
require('dotenv').config();

const app = express();
app.use(cors()); // This allows your frontend to talk to this server
app.use(express.json());

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

app.post('/api/generate', async (req, res) => {
  const { prompt } = req.body;

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: "You are a UI generator. Return only clean HTML with Tailwind CSS classes." },
        { role: "user", content: prompt }
      ],
    });

    const generatedCode = completion.choices[0].message.content;

    // Send back the data in the format your App.tsx expects
    res.json({
      code: generatedCode,
      title: "Generated UI",
      category: "Component"
    });
  } catch (error) {
    res.status(500).json({ error: "AI generation failed" });
  }
});

app.listen(5000, () => console.log('Backend running on http://localhost:5000'));