import { OpenAI } from 'langchain/llms/openai';

export const analyzeEntry = async (prompt: any) => {
  const model = new OpenAI({
    temperature: 0,
    modelName: 'gpt-3.5-turbo',
    openAIApiKey: process.env.OPENAI_API_KEY,
  });
    const result = await model.call(prompt);
    console.log("Analysis Result:", result);
    return result;
};
