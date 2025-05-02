import { callOpenAI } from '../services/openAiService.js';

export async function identifyPoliticalPost(req, res) {
  const { author, content } = req.body;

  //Logging enabled by default for now
  console.log("Checking if post is political ", req.body);

  if (!author && !content) {
    return res.status(400).json({ message: "Missing author and content", isPolitical: false });
  }

  try {
    const response = await callOpenAI(author, content);

    const isPolitical = _toBoolean(response);
    
    //Logging enabled by default for now
    console.log("isPolitical? ", isPolitical);

    res.status(200).json({ message: "OK", isPolitical: isPolitical });
  } catch (error) {
    console.error("Error calling OpenAI:", error);
    res.status(500).json({ message: "Failed to analyze post", isPolitical: false });
  }
}

const _toBoolean = (isPolitical) => {
  return String(isPolitical).toLowerCase() === 'true';
};
