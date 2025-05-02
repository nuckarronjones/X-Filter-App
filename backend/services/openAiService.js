import { OpenAI } from "openai";
import dotenv from "dotenv";
dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function callOpenAI(author, content) {
  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "user",
        content: `
          Is the following post political? Return "True" if the author name or content suggests political affiliation; otherwise, return "False":
          Author: ${author} — Content: ${content}
        `,
      },
    ],
  });

  const result = response.choices[0].message.content.trim();

  console.log("Response from OpenAI: ", result);

  return result;
}

