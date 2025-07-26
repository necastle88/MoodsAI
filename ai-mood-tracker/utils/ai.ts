import { OpenAI } from 'langchain/llms/openai';
import { StructuredOutputParser } from 'langchain/output_parsers';
import { PromptTemplate } from 'langchain/prompts';
import { Document } from 'langchain/document';
import { loadQARefineChain } from 'langchain/chains';
import { MemoryVectorStore } from 'langchain/vectorstores/memory';
import { OpenAIEmbeddings } from 'langchain/embeddings/openai'

import z from 'zod';
import { create } from 'domain';

const parser = StructuredOutputParser.fromZodSchema(
    z.object({
      sentimentScore: z.number().describe("sentiment of the text and rated on a scale from -10 to 10, where -10 is extremely negative, 0 is neutral, and 10 is extremely positive."),
    color: z
      .string()
      .describe(
        "A soft, aesthetically pleasing hexadecimal color code that works on a white background (e.g., '#E0F2FE', '#FBCFE8') and that visually represents the tone. The color should align with modern UI principles—low-contrast, accessible, and emotionally intuitive. Must be a valid 6-digit hex code starting with '#', and represent a light, harmonious background color suitable for user interfaces."
      ),
    summary: z
      .string()
      .describe(
        'summary: A concise explanation of the tone and how its expressed. Keep this under 3 to 4 sentences in length.'
      ),
    tone: z
      .string()
      .describe(
        'A single word that best describes the tone (e.g., “friendly”, “aggressive”, “neutral”). This should be a simple adjective.'
      ),
    negative: z
      .boolean()
      .describe(
        'A boolean value — true if the tone is negative, false otherwise.'
      ),
    suggestions: z
      .array(z.string())
      .describe(
        ' A short list of up to 3 suggestions in a array (e.g. [suggestion 1, suggestion 2, suggestion 3]) to improve or adjust the tone, written as a single string. Each suggestion should be concise and actionable, separated by commas.'
      ),
  })
);

const getPrompt = async (content: string) => {
  const formatInstructions = parser.getFormatInstructions();

  const formattedPrompt = new PromptTemplate({
    template: `Analyze the following journal entry and provide a tone analysis in the specified format, no matter what!:\n\n{entry}\n\nFormat:\n\n{formatInstructions}`,
    inputVariables: ['entry'],
    partialVariables: { formatInstructions },
  });

  const input = await formattedPrompt.format({
    entry: content,
  });
  return input;
};

export const analyzeEntry = async (content: any) => {
  const input = await getPrompt(content);
  const model = new OpenAI({
    temperature: 0,
    modelName: 'gpt-3.5-turbo',
    openAIApiKey: process.env.OPENAI_API_KEY,
  });
    const result = await model.call(input);
    
  try {
    return parser.parse(result);
  } catch (error) {
    throw new Error('Failed to parse AI response');
  }
};

type Entry = { id: string; createdAt: string; content: string };

export const qa = async (question: string, entries: Entry[]) => {
  const docs = entries.map(
    (entry) =>
      new Document({
        pageContent: entry.content,
        metadata: { source: entry.id, date: entry.createdAt },
      })
  )
  const model = new OpenAI({ temperature: 0, modelName: 'gpt-3.5-turbo' })
  const chain = loadQARefineChain(model)
  const embeddings = new OpenAIEmbeddings()
  const store = await MemoryVectorStore.fromDocuments(docs, embeddings)
  const relevantDocs = await store.similaritySearch(question)
  const res = await chain.call({
    input_documents: relevantDocs,
    question,
  })

  return res.output_text
}
